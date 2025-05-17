
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SaveSignatureDialog from "./SaveSignatureDialog";

interface SignatureSaveButtonProps {
  signatureContent: string;
}

const SignatureSaveButton = ({ signatureContent }: SignatureSaveButtonProps) => {
  const { user } = useAuth();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setSaveDialogOpen(true)}
        className="gap-2 bg-brand-purple hover:bg-opacity-90"
      >
        <Save className="h-4 w-4" />
        Save Signature
      </Button>

      <SaveSignatureDialog 
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        signatureContent={signatureContent}
      />
    </>
  );
};

export default SignatureSaveButton;
