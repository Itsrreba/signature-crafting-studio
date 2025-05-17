import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import SignatureRenderer from "./SignatureRenderer";
import AuthDialog from "./AuthDialog";
import PaymentDialog from "./PaymentDialog";
import { generateSignatureHTML } from "../utils/signatureHelper";

interface SignaturePreviewProps {
  signatureData: any;
  layout: string;
  template: string;
  currentStep?: number;
}

const SignaturePreview = ({ signatureData, layout, template, currentStep = 1 }: SignaturePreviewProps) => {
  const { user } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const handleCopyHTML = () => {
    // Check if user is authenticated
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }
    
    // Check if user is on step 3 or has a paid plan
    if (currentStep < 3 && !user.plan) {
      setPaymentDialogOpen(true);
      return;
    }
    
    // Generate HTML based on the signature layout
    const html = generateSignatureHTML(signatureData, layout);
    navigator.clipboard.writeText(html);
    
    toast({
      title: "HTML Copied",
      description: "Your signature HTML has been copied to clipboard.",
    });
  };

  const handleDownloadHTML = () => {
    // Check if user is authenticated
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }
    
    // Check if user is on step 3 or has a paid plan
    if (currentStep < 3 && !user.plan) {
      setPaymentDialogOpen(true);
      return;
    }
    
    // Generate HTML for download
    const html = generateSignatureHTML(signatureData, layout);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `signature-${layout}.html`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "HTML Downloaded",
      description: "Your signature HTML has been downloaded.",
    });
  };

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-white rounded-md border min-h-[200px] flex items-center justify-center mb-4">
          <div className="max-w-full">
            <SignatureRenderer signatureData={signatureData} layout={layout} />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleCopyHTML}
          >
            Copy HTML
          </Button>
          
          <Button 
            variant="default" 
            className="w-full" 
            onClick={handleDownloadHTML}
          >
            <Download className="mr-2 h-4 w-4" /> Download HTML
          </Button>
          
          {(!user) && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Sign in to download your signature
            </p>
          )}
        </div>
      </CardContent>

      {/* Dialogs */}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        title="Authentication Required"
        description="Please sign in or create an account to access this feature."
        action="signup"
      />
      
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
      />
    </Card>
  );
};

export default SignaturePreview;
