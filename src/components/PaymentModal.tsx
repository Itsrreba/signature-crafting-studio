
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Banknote } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: "individual" | "team";
}

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const planDetails = {
    individual: {
      name: "Individual Plan",
      price: "$2",
      description: "One-time payment for single user access"
    },
    team: {
      name: "Team Plan",
      price: "$10",
      description: "One-time payment for multiple user access"
    }
  };

  const handlePaymentSelection = (method: string) => {
    // In a real implementation, this would redirect to the selected payment provider
    toast({
      title: `Processing ${method} payment`,
      description: `Preparing ${planDetails[plan].name} purchase. You'll receive access instructions via email shortly.`,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Thank you for your purchase!",
        description: "We've sent instructions to your email on how to access your new plan.",
      });
    }, 2000);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            {planDetails[plan].name} - {planDetails[plan].price}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">{planDetails[plan].description}</p>
          <div className="space-y-4">
            <Button
              onClick={() => handlePaymentSelection("PayPal")}
              variant="outline"
              className="w-full justify-start"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Pay with PayPal
            </Button>
            <Button
              onClick={() => handlePaymentSelection("Wise")}
              variant="outline"
              className="w-full justify-start"
            >
              <Banknote className="mr-2 h-4 w-4" />
              Pay with Wise
            </Button>
            <Button
              onClick={() => handlePaymentSelection("BankTransfer")}
              variant="outline"
              className="w-full justify-start"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Pay with Bank Transfer
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
