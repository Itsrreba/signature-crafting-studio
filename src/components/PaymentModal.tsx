
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign } from "lucide-react";

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
    alert(`Redirecting to ${method} for ${planDetails[plan].name} payment...`);
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
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with PayPal
            </Button>
            <Button
              onClick={() => handlePaymentSelection("Wise")}
              variant="outline"
              className="w-full justify-start"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with Wise
            </Button>
            <Button
              onClick={() => handlePaymentSelection("BankTransfer")}
              variant="outline"
              className="w-full justify-start"
            >
              <CreditCard className="mr-2 h-4 w-4" />
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
