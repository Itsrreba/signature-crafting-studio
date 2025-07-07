
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthDialog from "./AuthDialog";
import PaymentDialog from "./PaymentDialog";

interface SaveSignatureButtonProps {
  signatureData: any;
  layout: string;
}

const SaveSignatureButton: React.FC<SaveSignatureButtonProps> = ({ signatureData, layout }) => {
  const { user, saveSignature, isSavingSignature, savedSignatures } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [signatureName, setSignatureName] = useState("");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  // Check if user can save signatures
  const canSaveSignatures = () => {
    if (!user) return false;
    return user.plan === "individual" || user.plan === "team";
  };

  const getSignatureLimit = () => {
    if (user?.plan === "individual") return 1;
    if (user?.plan === "team") return 10;
    return 0;
  };

  const handleSaveClick = () => {
    console.log("Save signature clicked", { user: user?.email, plan: user?.plan });
    
    if (!user) {
      console.log("User not authenticated, showing auth dialog");
      setAuthDialogOpen(true);
      return;
    }

    if (!canSaveSignatures()) {
      console.log("User needs paid plan, showing payment dialog");
      setPaymentDialogOpen(true);
      return;
    }

    const signatureLimit = getSignatureLimit();
    if (savedSignatures.length >= signatureLimit) {
      const message = user.plan === "individual" 
        ? "Your Individual plan allows saving 1 signature. Upgrade to Team plan for more."
        : "Your Team plan allows saving up to 10 signatures.";
      
      console.log("Signature limit reached:", { limit: signatureLimit, current: savedSignatures.length });
      toast({
        title: "Signature limit reached",
        description: message,
        variant: "destructive",
      });
      return;
    }

    console.log("Opening save dialog");
    setSignatureName(`Signature ${savedSignatures.length + 1}`);
    setIsDialogOpen(true);
  };

  const handleSaveConfirm = async () => {
    if (!signatureName.trim()) return;
    
    console.log("Saving signature:", signatureName);
    const success = await saveSignature(signatureName, signatureData, layout);
    if (success) {
      console.log("Signature saved successfully");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full mt-2" 
        onClick={handleSaveClick}
      >
        <Save className="mr-2 h-4 w-4" /> Save Signature
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Signature</DialogTitle>
            <DialogDescription>
              Give your signature a name to save it to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                className="col-span-3"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveConfirm}
              disabled={isSavingSignature || !signatureName.trim()}
            >
              {isSavingSignature ? "Saving..." : "Save Signature"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Authentication Dialog */}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        title="Authentication Required"
        description="Please sign in or create an account to save signatures."
        action="signup"
      />
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
      />
    </>
  );
};

export default SaveSignatureButton;
