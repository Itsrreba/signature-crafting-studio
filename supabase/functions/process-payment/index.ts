
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// This function will handle payment processing for both PayPal and Wise
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client for user authentication and database updates
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }
    
    const user = userData?.user;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Get payment data from request
    const { paymentMethod, plan, redirectUrl } = await req.json();
    
    if (!paymentMethod || !plan) {
      throw new Error("Missing required payment information");
    }

    // In a real implementation, here you would:
    // 1. For PayPal: Create a PayPal order and return approval URL
    // 2. For Wise: Create a Wise quote and return payment URL

    // For demo purposes, we're simulating successful payment initiation
    let paymentUrl = "";
    
    if (paymentMethod === "paypal") {
      // In a real implementation, you would use PayPal SDK to create an order
      // This is just a placeholder for the demo
      paymentUrl = `https://www.sandbox.paypal.com/checkoutnow?token=demo_${plan}_${Date.now()}`;
    } else if (paymentMethod === "wise") {
      // In a real implementation, you would use Wise API to create a transfer
      // This is just a placeholder for the demo
      paymentUrl = `https://sandbox.wise.com/transfer/demo_${plan}_${Date.now()}`;
    } else {
      throw new Error("Unsupported payment method");
    }

    // Create a payment record in database
    const { error: dbError } = await supabaseClient.from("payments").insert({
      user_id: user.id,
      payment_method: paymentMethod,
      plan: plan,
      amount: plan === "individual" ? 2 : 10,
      status: "pending",
      created_at: new Date().toISOString()
    });

    if (dbError) {
      console.error("Database error:", dbError);
      // Continue with the payment process even if DB record creation fails
    }

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
