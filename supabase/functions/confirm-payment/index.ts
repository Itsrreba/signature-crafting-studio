
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// This function will handle payment confirmation for both PayPal and Wise
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

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

    const { paymentId, paymentMethod, plan } = await req.json();

    // In a real implementation:
    // 1. For PayPal: You'd verify the payment status using PayPal API
    // 2. For Wise: You'd check the transfer status using Wise API
    
    // For demo purposes, we'll assume payment is successful
    
    // Update the payment record in database
    const { error: dbError } = await supabaseClient.from("payments").update({
      status: "completed",
      updated_at: new Date().toISOString()
    }).eq("user_id", user.id).eq("status", "pending");

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to update payment record: ${dbError.message}`);
    }

    // Update user's plan
    const { error: userUpdateError } = await supabaseClient.from("profiles").update({
      plan: plan
    }).eq("id", user.id);

    if (userUpdateError) {
      console.error("User update error:", userUpdateError);
      throw new Error(`Failed to update user plan: ${userUpdateError.message}`);
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: "Payment confirmed successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
