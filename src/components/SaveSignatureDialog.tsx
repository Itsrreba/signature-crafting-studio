
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import PaymentDialog from "@/components/PaymentDialog";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || "", supabaseKey || "");

interface SaveSignatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signatureContent: string;
}

const SaveSignatureDialog = ({ open, onOpenChange, signatureContent }: SaveSignatureDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signatureName, setSignatureName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save signatures.",
      });
      onOpenChange(false);
      navigate("/login");
      return;
    }
    
    if (!user.plan) {
      // Show payment dialog if they don't have a plan
      setShowPaymentDialog(true);
      return;
    }
    
    if (!signatureName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your signature.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user has reached their signature limit
    try {
      // Get count of existing signatures
      const { count, error } = await supabase
        .from('signatures')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      if (user.plan === "individual" && count! >= 1) {
        setShowPaymentDialog(true);
        return;
      }
      
      if (user.plan === "team" && count! >= 10) {
        toast({
          title: "Signature limit reached",
          description: "You've reached the maximum number of signatures allowed under your Team plan (10).",
          variant: "destructive",
        });
        return;
      }
      
      // Proceed with saving
      setIsSaving(true);
      
      const { error: saveError } = await supabase
        .from('signatures')
        .insert({
          user_id: user.id,
          name: signatureName,
          content: signatureContent,
        });
      
      if (saveError) throw saveError;
      
      toast({
        title: "Signature saved",
        description: "Your email signature has been saved successfully.",
      });
      
      onOpenChange(false);
      navigate("/signatures");
    } catch (error) {
      console.error('Error saving signature:', error);
      toast({
        title: "Failed to save signature",
        description: "There was a problem saving your signature. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Save Email Signature</DialogTitle>
            <DialogDescription>
              Give your signature a name so you can easily find it later.
            </DialogDescription>
          </DialogHeader>
          
          {!user?.plan && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div className="text-sm text-amber-700">
                You need a subscription plan to save signatures.
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => {
                  onOpenChange(false);
                  setShowPaymentDialog(true);
                }}>
                  View pricing options
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="signature-name" className="text-right">
                Name
              </Label>
              <Input
                id="signature-name"
                className="col-span-3"
                placeholder="My Professional Signature"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving || !signatureName.trim()}
              className="bg-brand-purple hover:bg-opacity-90"
            >
              {isSaving ? "Saving..." : "Save Signature"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <PaymentDialog 
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
      />
    </>
  );
};

export default SaveSignatureDialog;
