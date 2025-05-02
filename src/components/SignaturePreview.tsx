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
  layout: string;
}

const SignaturePreview = ({ signatureData, template, layout }: SignaturePreviewProps) => {
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

  // MODERN TEMPLATE LAYOUTS
  const renderModernStandard = () => (
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

  const renderModernCentered = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px", textAlign: "center" }}>
      {signatureData.logoUrl && (
        <div style={{ marginBottom: "12px" }}>
          <img 
            src={signatureData.logoUrl} 
            alt={`${signatureData.companyName} Logo`} 
            style={{ maxWidth: "120px", maxHeight: "80px" }} 
          />
        </div>
      )}
      <div style={{ 
        fontSize: "18px", 
        fontWeight: "bold", 
        color: signatureData.primaryColor || "#9b87f5" 
      }}>
        {signatureData.fullName}
      </div>
      <div style={{ fontSize: "14px", color: "#333", marginBottom: "8px" }}>
        {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
      </div>
      <div style={{ 
        margin: "10px auto", 
        borderTop: `2px solid ${signatureData.primaryColor || "#9b87f5"}`, 
        width: "60%"
      }}></div>
      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        {signatureData.email && (
          <div>
            <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.email}</a>
          </div>
        )}
        {signatureData.phone && (
          <div>
            <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.phone}</a>
          </div>
        )}
        {signatureData.website && (
          <div>
            <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.website.replace(/^https?:\/\//, "")}</a>
          </div>
        )}
        {signatureData.address && <div>{signatureData.address}</div>}
      </div>
    </div>
  );

  const renderModernCompact = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {signatureData.logoUrl && (
          <img 
            src={signatureData.logoUrl} 
            alt={`${signatureData.companyName} Logo`} 
            style={{ maxWidth: "60px", maxHeight: "60px", marginRight: "10px" }} 
          />
        )}
        <div>
          <div style={{ 
            fontSize: "16px", 
            fontWeight: "bold", 
            color: signatureData.primaryColor || "#9b87f5" 
          }}>
            {signatureData.fullName}
          </div>
          <div style={{ fontSize: "13px", color: "#333" }}>
            {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "8px", borderTop: `1px solid ${signatureData.primaryColor || "#9b87f5"}` }}></div>
      <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
        <span>
          {signatureData.email && (
            <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none", marginRight: "10px" }}>{signatureData.email}</a>
          )}
          {signatureData.phone && (
            <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none", marginRight: "10px" }}>{signatureData.phone}</a>
          )}
          {signatureData.website && (
            <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none", marginRight: "10px" }}>{signatureData.website.replace(/^https?:\/\//, "")}</a>
          )}
        </span>
        {signatureData.address && <div style={{ marginTop: "5px" }}>{signatureData.address}</div>}
      </div>
    </div>
  );

  const renderModernStacked = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px" }}>
      <div style={{ textAlign: "left" }}>
        <div style={{ 
          fontSize: "20px", 
          fontWeight: "bold", 
          color: signatureData.primaryColor || "#9b87f5",
          borderLeft: `4px solid ${signatureData.primaryColor || "#9b87f5"}`,
          paddingLeft: "10px"
        }}>
          {signatureData.fullName}
        </div>
        <div style={{ fontSize: "14px", color: "#333", marginTop: "5px" }}>
          {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
        </div>
      </div>
      
      <div style={{ display: "flex", marginTop: "15px" }}>
        {signatureData.logoUrl && (
          <img 
            src={signatureData.logoUrl} 
            alt={`${signatureData.companyName} Logo`} 
            style={{ maxWidth: "80px", maxHeight: "60px", marginRight: "15px" }} 
          />
        )}
        <div style={{ fontSize: "13px", color: "#666" }}>
          {signatureData.email && <div>Email: <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.email}</a></div>}
          {signatureData.phone && <div>Phone: <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.phone}</a></div>}
          {signatureData.website && <div>Web: <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>{signatureData.website.replace(/^https?:\/\//, "")}</a></div>}
          {signatureData.address && <div style={{ marginTop: "3px" }}>{signatureData.address}</div>}
        </div>
      </div>
    </div>
  );

  const renderModernCards = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px", textAlign: "center" }}>
      <div style={{ 
        fontSize: "18px", 
        fontWeight: "bold", 
        color: signatureData.primaryColor || "#9b87f5",
        marginBottom: "10px"
      }}>
        {signatureData.fullName}
      </div>
      
      <div style={{ fontSize: "14px", color: "#333", marginBottom: "12px" }}>
        {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
      </div>
      
      {signatureData.logoUrl && (
        <div style={{ marginBottom: "15px" }}>
          <img 
            src={signatureData.logoUrl} 
            alt={`${signatureData.companyName} Logo`} 
            style={{ maxWidth: "120px", maxHeight: "80px" }} 
          />
        </div>
      )}
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
        {signatureData.email && (
          <div style={{ 
            padding: "6px 12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            border: `1px solid ${signatureData.primaryColor || "#9b87f5"}`,
          }}>
            <a href={`mailto:${signatureData.email}`} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "12px"
            }}>
              {signatureData.email}
            </a>
          </div>
        )}
        
        {signatureData.phone && (
          <div style={{ 
            padding: "6px 12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            border: `1px solid ${signatureData.primaryColor || "#9b87f5"}`,
          }}>
            <a href={`tel:${signatureData.phone}`} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "12px"
            }}>
              {signatureData.phone}
            </a>
          </div>
        )}
        
        {signatureData.website && (
          <div style={{ 
            padding: "6px 12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            border: `1px solid ${signatureData.primaryColor || "#9b87f5"}`,
          }}>
            <a href={signatureData.website} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "12px"
            }} target="_blank" rel="noopener noreferrer">
              {signatureData.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>
      
      {signatureData.address && (
        <div style={{ fontSize: "12px", color: "#666", marginTop: "12px" }}>
          {signatureData.address}
        </div>
      )}
    </div>
  );
  
  const renderModernIconList = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "450px", textAlign: "center" }}>
      {signatureData.logoUrl && (
        <div style={{ marginBottom: "12px" }}>
          <img 
            src={signatureData.logoUrl} 
            alt={`${signatureData.companyName} Logo`} 
            style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", margin: "0 auto" }} 
          />
        </div>
      )}
      
      <div style={{ 
        fontSize: "18px", 
        fontWeight: "bold", 
        color: signatureData.primaryColor || "#9b87f5",
        marginBottom: "5px" 
      }}>
        {signatureData.fullName}
      </div>
      
      <div style={{ fontSize: "14px", color: "#333", marginBottom: "15px" }}>
        {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        {signatureData.email && (
          <a href={`mailto:${signatureData.email}`} style={{ 
            display: "flex",
            alignItems: "center", 
            color: signatureData.primaryColor || "#9b87f5", 
            textDecoration: "none",
            fontSize: "13px"
          }}>
            <span style={{ 
              width: "8px", 
              height: "8px", 
              borderRadius: "50%", 
              backgroundColor: signatureData.primaryColor || "#9b87f5",
              display: "inline-block",
              marginRight: "8px"
            }}></span>
            {signatureData.email}
          </a>
        )}
        
        {signatureData.phone && (
          <a href={`tel:${signatureData.phone}`} style={{ 
            display: "flex",
            alignItems: "center",
            color: signatureData.primaryColor || "#9b87f5", 
            textDecoration: "none",
            fontSize: "13px"
          }}>
            <span style={{ 
              width: "8px", 
              height: "8px", 
              borderRadius: "50%", 
              backgroundColor: signatureData.primaryColor || "#9b87f5",
              display: "inline-block",
              marginRight: "8px"
            }}></span>
            {signatureData.phone}
          </a>
        )}
        
        {signatureData.website && (
          <a href={signatureData.website} style={{ 
            display: "flex",
            alignItems: "center",
            color: signatureData.primaryColor || "#9b87f5", 
            textDecoration: "none",
            fontSize: "13px"
          }} target="_blank" rel="noopener noreferrer">
            <span style={{ 
              width: "8px", 
              height: "8px", 
              borderRadius: "50%", 
              backgroundColor: signatureData.primaryColor || "#9b87f5",
              display: "inline-block",
              marginRight: "8px"
            }}></span>
            {signatureData.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>
      
      {signatureData.address && (
        <div style={{ fontSize: "12px", color: "#666", marginTop: "12px" }}>
          {signatureData.address}
        </div>
      )}
    </div>
  );
  
  const renderModernTwoColumns = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "550px" }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "center", paddingBottom: "15px" }} colSpan={2}>
              {signatureData.logoUrl && (
                <img 
                  src={signatureData.logoUrl} 
                  alt={`${signatureData.companyName} Logo`} 
                  style={{ maxWidth: "120px", maxHeight: "80px" }} 
                />
              )}
            </td>
          </tr>
          <tr>
            <td style={{ width: "50%", verticalAlign: "top", paddingRight: "15px", borderRight: `1px solid ${signatureData.primaryColor || "#9b87f5"}` }}>
              <div style={{ 
                fontSize: "16px", 
                fontWeight: "bold", 
                color: signatureData.primaryColor || "#9b87f5"
              }}>
                {signatureData.fullName}
              </div>
              <div style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
                {signatureData.jobTitle}
              </div>
              <div style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
                {signatureData.companyName}
              </div>
            </td>
            <td style={{ width: "50%", verticalAlign: "top", paddingLeft: "15px" }}>
              <div style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
                {signatureData.email && (
                  <div style={{ marginBottom: "5px" }}>
                    <a href={`mailto:${signatureData.email}`} style={{ 
                      color: signatureData.primaryColor || "#9b87f5", 
                      textDecoration: "none" 
                    }}>
                      {signatureData.email}
                    </a>
                  </div>
                )}
                {signatureData.phone && (
                  <div style={{ marginBottom: "5px" }}>
                    <a href={`tel:${signatureData.phone}`} style={{ 
                      color: signatureData.primaryColor || "#9b87f5", 
                      textDecoration: "none" 
                    }}>
                      {signatureData.phone}
                    </a>
                  </div>
                )}
                {signatureData.website && (
                  <div style={{ marginBottom: "5px" }}>
                    <a href={signatureData.website} style={{ 
                      color: signatureData.primaryColor || "#9b87f5", 
                      textDecoration: "none" 
                    }} target="_blank" rel="noopener noreferrer">
                      {signatureData.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {signatureData.address && (
                  <div>{signatureData.address}</div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // CLASSIC TEMPLATE LAYOUTS
  const renderClassicStandard = () => (
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

  const renderClassicCompact = () => (
    <div style={{ fontFamily: "Times New Roman, serif", maxWidth: "500px" }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "middle", paddingRight: "15px", width: "1%" }}>
              {signatureData.logoUrl && (
                <img 
                  src={signatureData.logoUrl} 
                  alt={`${signatureData.companyName} Logo`} 
                  style={{ maxWidth: "80px", maxHeight: "60px" }} 
                />
              )}
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: signatureData.primaryColor || "#9b87f5" }}>
                {signatureData.fullName}, <span style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "normal" }}>{signatureData.jobTitle}</span>
              </div>
              <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                {signatureData.companyName}
              </div>
              <div style={{ fontSize: "12px" }}>
                {signatureData.phone && (
                  <span style={{ marginRight: "10px" }}>
                    <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                      {signatureData.phone}
                    </a>
                  </span>
                )}
                {signatureData.email && (
                  <span>
                    <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                      {signatureData.email}
                    </a>
                  </span>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ fontSize: "12px", borderTop: "1px solid #ccc", paddingTop: "5px", marginTop: "5px" }}>
        {signatureData.website && (
          <div>
            <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
              {signatureData.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
        {signatureData.address && <div>{signatureData.address}</div>}
      </div>
    </div>
  );

  // MINIMAL TEMPLATE LAYOUTS
  const renderMinimalStandard = () => (
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

  const renderMinimalCompact = () => (
    <div style={{ fontFamily: "Helvetica, sans-serif", maxWidth: "400px" }}>
      <table cellPadding="0" cellSpacing="0" width="100%">
        <tbody>
          <tr>
            <td style={{ paddingRight: "15px", borderRight: `2px solid ${signatureData.primaryColor || "#9b87f5"}`}}>
              <div style={{ fontSize: "16px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                {signatureData.fullName}
              </div>
              <div style={{ fontSize: "12px", color: "#666", whiteSpace: "nowrap" }}>
                {signatureData.jobTitle}
              </div>
            </td>
            <td style={{ paddingLeft: "15px", fontSize: "12px", color: "#888" }}>
              {signatureData.email && (
                <div>
                  <a href={`mailto:${signatureData.email}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                    {signatureData.email}
                  </a>
                </div>
              )}
              {signatureData.phone && (
                <div>
                  <a href={`tel:${signatureData.phone}`} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                    {signatureData.phone}
                  </a>
                </div>
              )}
              {signatureData.website && (
                <div>
                  <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none" }}>
                    {signatureData.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const getTemplateComponent = () => {
    // Select based on both the template and layout
    if (template === "modern") {
      switch(layout) {
        case "centered": 
          return renderModernCentered();
        case "compact": 
          return renderModernCompact();
        case "stacked": 
          return renderModernStacked();
        case "modern-cards":
          return renderModernCards();
        case "icon-list":
          return renderModernIconList();
        case "two-columns":
          return renderModernTwoColumns();
        case "standard":
        default:
          return renderModernStandard();
      }
    } else if (template === "classic") {
      switch(layout) {
        case "compact": 
          return renderClassicCompact();
        case "modern-cards":
        case "icon-list":
        case "two-columns":
        case "centered":
        case "stacked":  
        case "standard":
        default:
          return renderClassicStandard();
      }
    } else if (template === "minimal") {
      switch(layout) {
        case "compact":
          return renderMinimalCompact();
        case "modern-cards":
        case "icon-list":
        case "two-columns":
        case "centered":
        case "stacked":
        case "standard":
        default:
          return renderMinimalStandard();
      }
    }
    
    // Default fallback
    return renderModernStandard();
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
