
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plan: "individual" | "team";
};

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const { user, updateUserPlan } = useAuth();
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!user) {
      toast({
        description: "Please sign in or create an account to continue.",
      });
      onClose();
      navigate("/login");
      return;
    }

    // Process payment (simulated)
    updateUserPlan(plan);
    onClose();
    
    // Navigate to homepage
    navigate("/");
    
    toast({
      title: "Payment successful!",
      description: `You now have access to the ${plan === "individual" ? "Single User" : "Team"} plan.`,
    });
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
              <Button onClick={handlePayment} className="w-full">
                Pay ${plan === "individual" ? "2" : "10"} with PayPal
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="wise" className="space-y-4 py-4">
            <p className="text-sm">
              Click the button below to complete your payment with Wise.
            </p>
            <div className="text-center">
              <Button onClick={handlePayment} className="w-full">
                Pay ${plan === "individual" ? "2" : "10"} with Wise
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
