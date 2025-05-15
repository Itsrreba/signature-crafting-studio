import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SignaturePreviewProps {
  signatureData: any;
  layout: string;
  template: string;
  currentStep?: number;
}

const SignaturePreview = ({ signatureData, layout, template, currentStep = 1 }: SignaturePreviewProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCopyHTML = () => {
    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to access your signature HTML.",
      });
      navigate("/login");
      return;
    }
    
    // Check if user is on step 3 or has a paid plan
    if (currentStep < 3 && !user.plan) {
      toast({
        title: "Access Restricted",
        description: "Please complete all steps to access your signature HTML.",
      });
      return;
    }
    
    // Copy HTML logic
    toast({
      title: "HTML Copied",
      description: "Your signature HTML has been copied to clipboard.",
    });
  };

  const handleDownloadHTML = () => {
    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to download your signature HTML.",
      });
      navigate("/login");
      return;
    }
    
    // Check if user is on step 3 or has a paid plan
    if (currentStep < 3 && !user.plan) {
      toast({
        title: "Access Restricted",
        description: "Please complete all steps to download your signature HTML.",
      });
      return;
    }
    
    // Download HTML logic
    toast({
      title: "HTML Downloaded",
      description: "Your signature HTML has been downloaded.",
    });
  };

  const getSignatureContent = () => {
    // Return signature content based on the selected layout
    switch (layout) {
      case "standard":
        return (
          <div className="flex items-start gap-4" style={{ fontFamily: signatureData.font }}>
            {signatureData.logoUrl && (
              <img src={signatureData.logoUrl} alt="Company Logo" className="w-20 h-auto object-contain" />
            )}
            <div>
              <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
              <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
              <div className="h-px my-2 bg-gray-200" />
              <div className="text-sm text-gray-700 space-y-1">
                {signatureData.phone && <p>{signatureData.phone}</p>}
                {signatureData.email && <p>{signatureData.email}</p>}
                {signatureData.website && <p>{signatureData.website}</p>}
                {signatureData.address && <p>{signatureData.address}</p>}
              </div>
            </div>
          </div>
        );
        
      case "centered":
        return (
          <div className="text-center space-y-2" style={{ fontFamily: signatureData.font }}>
            {signatureData.logoUrl && (
              <div className="flex justify-center mb-2">
                <img src={signatureData.logoUrl} alt="Company Logo" className="h-16 w-auto object-contain" />
              </div>
            )}
            <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
            <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
            <div className="h-px mx-auto my-2 bg-gray-200 w-16" />
            <div className="text-sm text-gray-700">
              {signatureData.phone && <p>{signatureData.phone}</p>}
              {signatureData.email && <p>{signatureData.email}</p>}
              {signatureData.website && <p>{signatureData.website}</p>}
              {signatureData.address && <p>{signatureData.address}</p>}
            </div>
          </div>
        );
      
      case "compact":
        return (
          <div style={{ fontFamily: signatureData.font }}>
            <div className="flex items-center gap-3">
              {signatureData.logoUrl && (
                <img src={signatureData.logoUrl} alt="Company Logo" className="w-12 h-auto object-contain" />
              )}
              <div>
                <h3 style={{ color: signatureData.primaryColor }} className="font-semibold">{signatureData.fullName}</h3>
                <p className="text-xs text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
              </div>
            </div>
            <div className="h-px my-2 bg-gray-200" />
            <div className="text-xs text-gray-700 flex flex-wrap gap-x-4 gap-y-1">
              {signatureData.phone && <span>{signatureData.phone}</span>}
              {signatureData.email && <span>{signatureData.email}</span>}
              {signatureData.website && <span>{signatureData.website}</span>}
              {signatureData.address && <span>{signatureData.address}</span>}
            </div>
          </div>
        );
      
      case "stacked":
        return (
          <div className="space-y-3" style={{ fontFamily: signatureData.font }}>
            <h3 
              style={{ color: signatureData.primaryColor, borderLeft: `4px solid ${signatureData.primaryColor}` }} 
              className="font-semibold text-lg pl-2"
            >
              {signatureData.fullName}
            </h3>
            <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
            <div className="flex items-start gap-3">
              {signatureData.logoUrl && (
                <img src={signatureData.logoUrl} alt="Company Logo" className="w-16 h-auto object-contain" />
              )}
              <div className="text-sm text-gray-700 space-y-1">
                {signatureData.phone && <p>{signatureData.phone}</p>}
                {signatureData.email && <p>{signatureData.email}</p>}
                {signatureData.website && <p>{signatureData.website}</p>}
                {signatureData.address && <p>{signatureData.address}</p>}
              </div>
            </div>
          </div>
        );
        
      // Add other layout cases here...
      
      default:
        return (
          <div className="flex items-start gap-4" style={{ fontFamily: signatureData.font }}>
            {signatureData.logoUrl && (
              <img src={signatureData.logoUrl} alt="Company Logo" className="w-20 h-auto object-contain" />
            )}
            <div>
              <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
              <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
              <div className="h-px my-2 bg-gray-200" />
              <div className="text-sm text-gray-700 space-y-1">
                {signatureData.phone && <p>{signatureData.phone}</p>}
                {signatureData.email && <p>{signatureData.email}</p>}
                {signatureData.website && <p>{signatureData.website}</p>}
                {signatureData.address && <p>{signatureData.address}</p>}
              </div>
            </div>
          </div>
        );
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
            {getSignatureContent()}
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
    </Card>
  );
};

export default SignaturePreview;
