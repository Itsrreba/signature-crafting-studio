
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Process payment function called with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    // Create Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError) {
      console.error("Authentication error:", authError);
      throw new Error(`Authentication error: ${authError.message}`);
    }
    
    const user = userData?.user;
    if (!user) {
      throw new Error("User not authenticated");
    }

    console.log("User authenticated:", user.email);

    // Get payment data from request
    const { paymentMethod, plan, redirectUrl } = await req.json();
    
    console.log("Payment request:", { paymentMethod, plan, redirectUrl });
    
    if (!paymentMethod || !plan) {
      throw new Error("Missing required payment information");
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe secret key not configured");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Determine price based on plan
    const amount = plan === "individual" ? 200 : 1000; // $2 or $10 in cents
    
    // Check if customer exists in Stripe
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
          payment_method: paymentMethod
        }
      });
      customerId = customer.id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `SignatureCraft ${plan === "individual" ? "Single User" : "Team"} Plan`,
              description: `One-time payment for ${plan} plan access`
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
      metadata: {
        user_id: user.id,
        plan: plan,
        payment_method: paymentMethod
      }
    });

    console.log("Created Stripe checkout session:", session.id);

    // Create Supabase client with service role for database operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Create a payment record in database
    const { error: dbError } = await supabaseService.from("payments").insert({
      user_id: user.id,
      payment_method: paymentMethod,
      plan: plan,
      amount: amount,
      status: "pending",
      stripe_session_id: session.id,
      created_at: new Date().toISOString()
    });

    if (dbError) {
      console.error("Database error:", dbError);
      // Continue with payment process even if DB record creation fails
    } else {
      console.log("Payment record created successfully");
    }

    console.log("Payment processing successful, returning URL");

    return new Response(JSON.stringify({ 
      success: true, 
      paymentUrl: session.url,
      sessionId: session.id,
      message: `Stripe payment initiated for ${plan} plan`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
