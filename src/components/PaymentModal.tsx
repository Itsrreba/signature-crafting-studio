
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plan: "individual" | "team";
};

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const { user, updateUserPlan } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Default mock values for development - these will be used if the .env variables aren't available
  const DEMO_SUPABASE_URL = "https://demo.supabase.co";
  const DEMO_SUPABASE_ANON_KEY = "demo-anon-key";

  // Initialize Supabase client with fallback values if environment variables are not available
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEMO_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEMO_SUPABASE_ANON_KEY;

  // Initialize Supabase client with guaranteed values
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handlePayment = async (paymentMethod: string) => {
    if (!user) {
      toast({
        description: "Please sign in or create an account to continue.",
      });
      onClose();
      navigate("/login");
      return;
    }

    try {
      setIsProcessing(true);

      // Get the current URL for redirect purposes
      const redirectUrl = window.location.origin;

      // For demo purposes, we're simulating a successful payment without calling the edge function
      // In a production environment, you would call the actual edge function
      if (supabaseUrl === DEMO_SUPABASE_URL) {
        // Simulate successful payment after a short delay
        setTimeout(() => {
          // Update local user state
          updateUserPlan(plan);
          
          // Close modal and navigate to homepage
          onClose();
          navigate("/");
          
          toast({
            title: "Payment successful!",
            description: `You now have access to the ${plan === "individual" ? "Single User" : "Team"} plan.`,
          });
        }, 1500);
      } else {
        // Call our process-payment Edge Function when using real Supabase
        const { data, error } = await supabase.functions.invoke("process-payment", {
          body: { paymentMethod, plan, redirectUrl },
        });

        if (error) {
          throw error;
        }

        if (!data.success) {
          throw new Error(data.error || "Failed to process payment");
        }

        // For a real implementation, redirect to the payment provider
        if (data.paymentUrl) {
          // Open payment URL in a new window
          window.open(data.paymentUrl, "_blank");
          
          toast({
            title: "Payment initiated",
            description: `Please complete your payment with ${paymentMethod === "paypal" ? "PayPal" : "Wise"}.`,
          });
          
          // For demo purposes, we're simulating a successful payment
          // In a real app, you'd confirm payment via webhook or after redirect back
          const { data: confirmData, error: confirmError } = await supabase.functions.invoke("confirm-payment", {
            body: { paymentId: "demo", paymentMethod, plan },
          });

          if (confirmError || !confirmData?.success) {
            throw new Error("Failed to confirm payment");
          }

          // Update local user state
          updateUserPlan(plan);
          
          // Close modal and navigate to homepage
          onClose();
          navigate("/");
          
          toast({
            title: "Payment successful!",
            description: `You now have access to the ${plan === "individual" ? "Single User" : "Team"} plan.`,
          });
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred during payment processing",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete your purchase</DialogTitle>
          <DialogDescription>
            Select your preferred payment method below.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="paypal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="wise">Wise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paypal" className="space-y-4 py-4">
            <p className="text-sm">
              Click the button below to complete your payment with PayPal.
            </p>
            <div className="text-center">
              <Button 
                onClick={() => handlePayment("paypal")} 
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay $${plan === "individual" ? "2" : "10"} with PayPal`}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="wise" className="space-y-4 py-4">
            <p className="text-sm">
              Click the button below to complete your payment with Wise.
            </p>
            <div className="text-center">
              <Button 
                onClick={() => handlePayment("wise")} 
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay $${plan === "individual" ? "2" : "10"} with Wise`}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
