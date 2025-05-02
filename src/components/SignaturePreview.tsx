
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

interface SignatureData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logoUrl: string;
  primaryColor: string;
}

interface SignaturePreviewProps {
  signatureData: SignatureData;
  template: string;
}

const SignaturePreview = ({ signatureData, template }: SignaturePreviewProps) => {
  const { toast } = useToast();
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handleCopyToClipboard = () => {
    if (previewRef.current) {
      const range = document.createRange();
      range.selectNode(previewRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      try {
        document.execCommand("copy");
        toast({
          title: "Signature copied!",
          description: "Your email signature has been copied to clipboard",
        });
      } catch (err) {
        toast({
          title: "Copying failed",
          description: "Please try again or copy manually",
          variant: "destructive",
        });
      }
      window.getSelection()?.removeAllRanges();
    }
  };

  const renderModernTemplate = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", paddingRight: "15px" }}>
              {signatureData.logoUrl && (
                <img 
                  src={signatureData.logoUrl} 
                  alt={`${signatureData.companyName} Logo`} 
                  style={{ maxWidth: "100px", maxHeight: "100px" }} 
                />
              )}
            </td>
            <td>
              <div style={{ 
                fontSize: "18px", 
                fontWeight: "bold", 
                color: signatureData.primaryColor || "#9b87f5" 
              }}>
                {signatureData.fullName}
              </div>
              <div style={{ fontSize: "14px", color: "#333" }}>
                {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
              </div>
              <div style={{ marginTop: "10px", borderTop: `2px solid ${signatureData.primaryColor || "#9b87f5"}` }}></div>
              <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                {signatureData.email && <div>Email: <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.email}</a></div>}
                {signatureData.phone && <div>Phone: <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.phone}</a></div>}
                {signatureData.website && <div>Website: <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.website.replace(/^https?:\/\//, "")}</a></div>}
                {signatureData.address && <div>Address: {signatureData.address}</div>}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderClassicTemplate = () => (
    <div style={{ fontFamily: "Times New Roman, serif", maxWidth: "500px" }}>
      <div style={{ textAlign: "center" }}>
        {signatureData.logoUrl && (
          <img 
            src={signatureData.logoUrl} 
            alt={`${signatureData.companyName} Logo`} 
            style={{ maxWidth: "120px", maxHeight: "80px", marginBottom: "10px" }} 
          />
        )}
        <div style={{ fontSize: "18px", fontWeight: "bold", color: signatureData.primaryColor || "#9b87f5" }}>
          {signatureData.fullName}
        </div>
        <div style={{ fontSize: "14px", fontStyle: "italic", marginBottom: "5px" }}>
          {signatureData.jobTitle} {signatureData.companyName ? `at ${signatureData.companyName}` : ""}
        </div>
        <div style={{ fontSize: "12px", marginTop: "10px" }}>
          <div style={{ marginBottom: "5px" }}>
            {signatureData.email && (
              <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none", marginRight: "10px" }}>
                {signatureData.email}
              </a>
            )}
            {signatureData.phone && (
              <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                {signatureData.phone}
              </a>
            )}
          </div>
          {signatureData.website && (
            <div style={{ marginBottom: "5px" }}>
              <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                {signatureData.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {signatureData.address && <div>{signatureData.address}</div>}
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div style={{ fontFamily: "Helvetica, sans-serif", maxWidth: "400px" }}>
      <div style={{ borderLeft: `3px solid ${signatureData.primaryColor || "#9b87f5"}`, paddingLeft: "10px" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          {signatureData.fullName}
        </div>
        <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
          {signatureData.jobTitle} {signatureData.companyName ? `· ${signatureData.companyName}` : ""}
        </div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {signatureData.email && (
            <span style={{ marginRight: "8px" }}>
              <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                {signatureData.email}
              </a>
            </span>
          )}
          {signatureData.phone && (
            <span>
              <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                {signatureData.phone}
              </a>
            </span>
          )}
          {signatureData.website && (
            <div style={{ marginTop: "3px" }}>
              <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                {signatureData.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {signatureData.address && <div style={{ marginTop: "3px" }}>{signatureData.address}</div>}
        </div>
      </div>
    </div>
  );

  const getTemplateComponent = () => {
    switch (template) {
      case "modern":
        return renderModernTemplate();
      case "classic":
        return renderClassicTemplate();
      case "minimal":
        return renderMinimalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Signature Preview</h3>
        <Button onClick={handleCopyToClipboard} variant="outline" size="sm" className="flex items-center gap-1">
          <Copy className="h-4 w-4" /> Copy
        </Button>
      </div>
      
      <div className="p-6 border rounded-md bg-white min-h-[200px] email-signature-preview">
        <div ref={previewRef}>
          {getTemplateComponent()}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Click "Copy" to copy the signature to your clipboard, then paste it into your email client's signature settings.</p>
      </div>
    </div>
  );
};

export default SignaturePreview;
