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
            <a href={signatureData.website} style={{ color: signatureData.primaryColor || "#9b87f5", textDecoration: "none", marginRight: "10px" }}>{signatureData.website.replace(/^https?:\/\//, "")}</a>
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

  // NEW LAYOUTS
  const renderModernBordered = () => (
    <div style={{ 
      fontFamily: "Arial, sans-serif", 
      maxWidth: "500px", 
      padding: "15px",
      border: `2px solid ${signatureData.primaryColor || "#9b87f5"}`,
      borderRadius: "4px"
    }}>
      <div style={{ textAlign: "center" }}>
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
          color: signatureData.primaryColor || "#9b87f5",
          marginBottom: "5px" 
        }}>
          {signatureData.fullName}
        </div>
        
        <div style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
          {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "10px" }}>
          {signatureData.email && (
            <a href={`mailto:${signatureData.email}`} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "13px"
            }}>
              {signatureData.email}
            </a>
          )}
          
          {signatureData.phone && (
            <a href={`tel:${signatureData.phone}`} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "13px"
            }}>
              {signatureData.phone}
            </a>
          )}
          
          {signatureData.website && (
            <a href={signatureData.website} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "13px"
            }} target="_blank" rel="noopener noreferrer">
              {signatureData.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
        
        {signatureData.address && (
          <div style={{ fontSize: "12px", color: "#666" }}>
            {signatureData.address}
          </div>
        )}
      </div>
    </div>
  );
  
  const renderModernMinimalist = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "450px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ 
          width: "3px", 
          height: "60px", 
          backgroundColor: signatureData.primaryColor || "#9b87f5",
          marginRight: "15px"
        }}></div>
        <div>
          <div style={{ 
            fontSize: "16px", 
            fontWeight: "bold", 
            marginBottom: "3px" 
          }}>
            {signatureData.fullName}
          </div>
          <div style={{ fontSize: "13px", color: "#333", marginBottom: "8px" }}>
            {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {signatureData.email && (
              <span style={{ marginRight: "10px" }}>
                <a href={`mailto:${signatureData.email}`} style={{ 
                  color: signatureData.primaryColor || "#9b87f5", 
                  textDecoration: "none" 
                }}>
                  {signatureData.email}
                </a>
              </span>
            )}
            {signatureData.phone && (
              <span>
                <a href={`tel:${signatureData.phone}`} style={{ 
                  color: signatureData.primaryColor || "#9b87f5", 
                  textDecoration: "none" 
                }}>
                  {signatureData.phone}
                </a>
              </span>
            )}
            {signatureData.website && (
              <div>
                <a href={signatureData.website} style={{ 
                  color: signatureData.primaryColor || "#9b87f5", 
                  textDecoration: "none" 
                }} target="_blank" rel="noopener noreferrer">
                  {signatureData.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderModernBubbles = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px", textAlign: "center" }}>
      <div style={{ marginBottom: "15px" }}>
        {signatureData.logoUrl ? (
          <img 
            src={signatureData.logoUrl} 
            alt={`${signatureData.companyName} Logo`} 
            style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              objectFit: "cover",
              border: `2px solid ${signatureData.primaryColor || "#9b87f5"}` 
            }} 
          />
        ) : (
          <div style={{ 
            width: "80px", 
            height: "80px", 
            borderRadius: "50%", 
            backgroundColor: signatureData.primaryColor || "#9b87f5",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: "bold",
            margin: "0 auto"
          }}>
            {signatureData.fullName ? signatureData.fullName.charAt(0) : "?"}
          </div>
        )}
      </div>
      
      <div style={{ 
        fontSize: "18px", 
        fontWeight: "bold", 
        color: signatureData.primaryColor || "#9b87f5",
        marginBottom: "5px" 
      }}>
        {signatureData.fullName}
      </div>
      
      <div style={{ fontSize: "14px", color: "#333", marginBottom: "12px" }}>
        {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {signatureData.email && (
          <a href={`mailto:${signatureData.email}`} style={{ 
            display: "inline-block",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            lineHeight: "40px",
            color: signatureData.primaryColor || "#9b87f5",
            textDecoration: "none",
            fontSize: "12px",
            fontWeight: "bold"
          }} title={signatureData.email}>
            @
          </a>
        )}
        
        {signatureData.phone && (
          <a href={`tel:${signatureData.phone}`} style={{ 
            display: "inline-block",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            lineHeight: "40px",
            color: signatureData.primaryColor || "#9b87f5",
            textDecoration: "none",
            fontSize: "16px"
          }} title={signatureData.phone}>
            ☎
          </a>
        )}
        
        {signatureData.website && (
          <a href={signatureData.website} style={{ 
            display: "inline-block",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            lineHeight: "40px",
            color: signatureData.primaryColor || "#9b87f5",
            textDecoration: "none",
            fontSize: "16px"
          }} target="_blank" rel="noopener noreferrer" title={signatureData.website.replace(/^https?:\/\//, "")}>
            🌐
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

  const renderModernBanner = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
      <div style={{ 
        backgroundColor: signatureData.primaryColor || "#9b87f5", 
        padding: "12px", 
        color: "white", 
        textAlign: "center",
        borderRadius: "4px 4px 0 0"
      }}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          {signatureData.fullName}
        </div>
        <div style={{ fontSize: "14px" }}>
          {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
        </div>
      </div>
      
      <div style={{ 
        padding: "15px", 
        borderLeft: `1px solid ${signatureData.primaryColor || "#9b87f5"}`,
        borderRight: `1px solid ${signatureData.primaryColor || "#9b87f5"}`,
        borderBottom: `1px solid ${signatureData.primaryColor || "#9b87f5"}`,
        borderRadius: "0 0 4px 4px",
        display: "flex",
        alignItems: "center"
      }}>
        {signatureData.logoUrl && (
          <div style={{ marginRight: "15px" }}>
            <img 
              src={signatureData.logoUrl} 
              alt={`${signatureData.companyName} Logo`} 
              style={{ maxWidth: "80px", maxHeight: "60px" }} 
            />
          </div>
        )}
        
        <div style={{ fontSize: "13px", color: "#666" }}>
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
      </div>
    </div>
  );

  const renderModernGradient = () => (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
      <div style={{ 
        background: `linear-gradient(135deg, ${signatureData.primaryColor || "#9b87f5"}40, ${signatureData.primaryColor || "#9b87f5"}10)`,
        padding: "20px",
        borderRadius: "6px",
        color: "#333"
      }}>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          {signatureData.logoUrl && (
            <img 
              src={signatureData.logoUrl} 
              alt={`${signatureData.companyName} Logo`} 
              style={{ maxWidth: "100px", maxHeight: "70px" }} 
            />
          )}
        </div>
        
        <div style={{ 
          fontSize: "18px", 
          fontWeight: "bold", 
          color: signatureData.primaryColor || "#9b87f5",
          textAlign: "center",
          marginBottom: "5px" 
        }}>
          {signatureData.fullName}
        </div>
        
        <div style={{ fontSize: "14px", textAlign: "center", marginBottom: "12px" }}>
          {signatureData.jobTitle} {signatureData.companyName ? `| ${signatureData.companyName}` : ""}
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          {signatureData.email && (
            <a href={`mailto:${signatureData.email}`} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "13px"
            }}>
              {signatureData.email}
            </a>
          )}
          
          {signatureData.phone && (
            <a href={`tel:${signatureData.phone}`} style={{ 
              color: signatureData.primaryColor || "#9b87f5", 
              textDecoration: "none",
              fontSize: "13px"
            }}>
              {signatureData.phone}
            </a>
          )}
        </div>
        
        {(signatureData.website || signatureData.address) && (
          <div style={{ textAlign: "center", marginTop: "8px", fontSize: "12px" }}>
            {signatureData.website && (
              <div>
                <a href={signatureData.website} style={{ 
                  color: signatureData.primaryColor || "#9b87f5", 
                  textDecoration: "none" 
                }} target="_blank" rel="noopener noreferrer">
                  {signatureData.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            
            {signatureData.address && (
              <div style={{ marginTop: "3px" }}>
                {signatureData.address}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
  
  // CREATIVE AND PROFESSIONAL TEMPLATE BASE LAYOUTS
  const renderCreativeStandard = () => (
    <div style={{ fontFamily: "Georgia, serif", maxWidth: "500px" }}>
      <div style={{ 
        borderLeft: `4px solid ${signatureData.primaryColor || "#9b87f5"}`, 
        paddingLeft: "15px",
        position: "relative"
      }}>
        {signatureData.fullName && (
          <div style={{ 
            fontFamily: "Georgia, serif",
            fontSize: "24px", 
            fontWeight: "normal", 
            color: signatureData.primaryColor || "#9b87f5",
            letterSpacing: "1px"
          }}>
            {signatureData.fullName}
          </div>
        )}
        
        {signatureData.jobTitle && (
          <div style={{ 
            fontSize: "15px", 
            fontStyle: "italic", 
            marginBottom: "10px",
            color: "#555"
          }}>
            {signatureData.jobTitle}
            {signatureData.companyName && ` at ${signatureData.companyName}`}
          </div>
        )}
        
        <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
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
          
          {signatureData.website && (
            <div style={{ marginBottom: "5px" }}>
              <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ 
                color: signatureData.primaryColor || "#9b87f5",
                textDecoration: "none"
              }}>
                {signatureData.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          
          {signatureData.address && (
            <div>{signatureData.address}</div>
          )}
        </div>
        
        {signatureData.logoUrl && (
          <div style={{ 
            position: "absolute", 
            top: "0", 
            right: "0", 
            maxWidth: "80px", 
            maxHeight: "80px"
          }}>
            <img 
              src={signatureData.logoUrl} 
              alt={`${signatureData.companyName} Logo`} 
              style={{ maxWidth: "100%", maxHeight: "100%" }} 
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderProfessionalStandard = () => (
    <div style={{ fontFamily: "Verdana, Geneva, sans-serif", maxWidth: "500px" }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", width: "150px", paddingRight: "15px" }}>
              {signatureData.logoUrl && (
                <img 
                  src={signatureData.logoUrl} 
                  alt={`${signatureData.companyName} Logo`} 
                  style={{ maxWidth: "120px", marginBottom: "10px" }} 
                />
              )}
              
              <div style={{ 
                fontSize: "16px", 
                fontWeight: "bold", 
                color: "#333"
              }}>
                {signatureData.fullName}
              </div>
              
              <div style={{ 
                fontSize: "12px", 
                color: signatureData.primaryColor || "#9b87f5",
                fontWeight: "bold",
                marginTop: "3px",
                marginBottom: "10px"
              }}>
                {signatureData.jobTitle}
              </div>
              
              {signatureData.companyName && (
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {signatureData.companyName}
                </div>
              )}
            </td>
            
            <td style={{ 
              verticalAlign: "top", 
              borderLeft: `2px solid ${signatureData.primaryColor || "#9b87f5"}`, 
              paddingLeft: "15px" 
            }}>
              <table cellPadding="5" cellSpacing="0">
                <tbody>
                  {signatureData.phone && (
                    <tr>
                      <td style={{ color: signatureData.primaryColor || "#9b87f5", fontSize: "12px", fontWeight: "bold" }}>Phone</td>
                      <td style={{ fontSize: "12px" }}>
                        <a href={`tel:${signatureData.phone}`} style={{ color: "#555", textDecoration: "none" }}>
                          {signatureData.phone}
                        </a>
                      </td>
                    </tr>
                  )}
                  
                  {signatureData.email && (
                    <tr>
                      <td style={{ color: signatureData.primaryColor || "#9b87f5", fontSize: "12px", fontWeight: "bold" }}>Email</td>
                      <td style={{ fontSize: "12px" }}>
                        <a href={`mailto:${signatureData.email}`} style={{ color: "#555", textDecoration: "none" }}>
                          {signatureData.email}
                        </a>
                      </td>
                    </tr>
                  )}
                  
                  {signatureData.website && (
                    <tr>
                      <td style={{ color: signatureData.primaryColor || "#9b87f5", fontSize: "12px", fontWeight: "bold" }}>Web</td>
                      <td style={{ fontSize: "12px" }}>
                        <a href={signatureData.website} target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "none" }}>
                          {signatureData.website.replace(/^https?:\/\//, "")}
                        </a>
                      </td>
                    </tr>
                  )}
                  
                  {signatureData.address && (
                    <tr>
                      <td style={{ color: signatureData.primaryColor || "#9b87f5", fontSize: "12px", fontWeight: "bold" }}>Address</td>
                      <td style={{ fontSize: "12px", color: "#555" }}>{signatureData.address}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const getTemplateComponent = () => {
    // Extended selection based on both template and layout
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
        case "bordered":
          return renderModernBordered();
        case "minimalist":
          return renderModernMinimalist();
        case "bubbles":
          return renderModernBubbles();
        case "banner":
          return renderModernBanner();
        case "gradient":
          return renderModernGradient();
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
    } else if (template === "creative") {
      // For now, all creative layouts will use the same base design
      return renderCreativeStandard();
    } else if (template === "professional") {
      // For now, all professional layouts will use the same base design
      return renderProfessionalStandard();
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
