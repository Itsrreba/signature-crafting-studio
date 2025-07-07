
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import SignatureRenderer from "./SignatureRenderer";
import AuthDialog from "./AuthDialog";
import PaymentDialog from "./PaymentDialog";
import SaveSignatureButton from "./SaveSignatureButton";
import SavedSignaturesList from "./SavedSignaturesList";
import { generateSignatureHTML } from "../utils/signatureHtml";

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

  // Check if user can access premium features
  const canAccessPremiumFeatures = () => {
    if (!user) return false;
    return user.plan === "individual" || user.plan === "team";
  };

  const handleCopyHTML = () => {
    console.log("Copy HTML clicked", { user: user?.email, plan: user?.plan });
    
    // Check if user is authenticated
    if (!user) {
      console.log("User not authenticated, showing auth dialog");
      setAuthDialogOpen(true);
      return;
    }
    
    // Check if user has a paid plan
    if (!canAccessPremiumFeatures()) {
      console.log("User needs paid plan, showing payment dialog");
      setPaymentDialogOpen(true);
      return;
    }
    
    // Generate and copy HTML
    try {
      const html = generateSignatureHTML(signatureData, layout);
      navigator.clipboard.writeText(html);
      
      console.log("HTML copied successfully");
      toast({
        title: "HTML Copied",
        description: "Your signature HTML has been copied to clipboard.",
      });
    } catch (error) {
      console.error("Error copying HTML:", error);
      toast({
        title: "Copy Failed",
        description: "Failed to copy HTML to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadHTML = () => {
    console.log("Download HTML clicked", { user: user?.email, plan: user?.plan });
    
    // Check if user is authenticated
    if (!user) {
      console.log("User not authenticated, showing auth dialog");
      setAuthDialogOpen(true);
      return;
    }
    
    // Check if user has a paid plan
    if (!canAccessPremiumFeatures()) {
      console.log("User needs paid plan, showing payment dialog");
      setPaymentDialogOpen(true);
      return;
    }
    
    // Generate and download HTML
    try {
      const html = generateSignatureHTML(signatureData, layout);
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `signature-${layout}-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log("HTML downloaded successfully");
      toast({
        title: "HTML Downloaded",
        description: "Your signature HTML has been downloaded.",
      });
    } catch (error) {
      console.error("Error downloading HTML:", error);
      toast({
        title: "Download Failed",
        description: "Failed to download HTML file.",
        variant: "destructive",
      });
    }
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
          
          {user && <SaveSignatureButton signatureData={signatureData} layout={layout} />}
          
          {!user && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Sign in and upgrade to download your signature
            </p>
          )}
          
          {user && !canAccessPremiumFeatures() && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Upgrade to Individual or Team plan to access HTML features
            </p>
          )}
        </div>
        
        <SavedSignaturesList />
      </CardContent>

      {/* Authentication Dialog */}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        title="Authentication Required"
        description="Please sign in or create an account to access HTML download and copy features."
        action="signup"
      />
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
      />
    </Card>
  );
};

export default SignaturePreview;
