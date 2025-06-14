
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plan: "individual" | "team";
};

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const { user, updateUserPlan } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

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
      
      console.log(`Processing ${paymentMethod} payment for ${plan} plan`);
      
      // Call the process-payment edge function
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          paymentMethod,
          plan,
          redirectUrl: window.location.origin
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success && data?.paymentUrl) {
        // Redirect to payment provider
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data?.error || 'Payment initialization failed');
      }
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred during payment processing",
        variant: "destructive",
      });
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
