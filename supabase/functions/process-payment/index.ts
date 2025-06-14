
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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

    // For demo purposes, we're creating mock payment URLs
    // In production, you would integrate with actual PayPal and Wise APIs
    let paymentUrl = "";
    
    if (paymentMethod === "paypal") {
      // Mock PayPal checkout URL - replace with actual PayPal SDK integration
      paymentUrl = `https://www.sandbox.paypal.com/checkoutnow?token=demo_${plan}_${Date.now()}`;
      console.log("Created PayPal payment URL:", paymentUrl);
    } else if (paymentMethod === "wise") {
      // Mock Wise payment URL - replace with actual Wise API integration
      paymentUrl = `https://sandbox.wise.com/transfer/demo_${plan}_${Date.now()}`;
      console.log("Created Wise payment URL:", paymentUrl);
    } else {
      throw new Error("Unsupported payment method");
    }

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
      amount: plan === "individual" ? 2 : 10,
      status: "pending",
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
      paymentUrl,
      message: `${paymentMethod.toUpperCase()} payment initiated for ${plan} plan`
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
