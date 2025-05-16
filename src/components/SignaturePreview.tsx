
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
        description: "Please complete all steps and purchase a plan to access your signature HTML.",
      });
      return;
    }
    
    // Generate HTML based on the signature layout
    const html = generateSignatureHTML();
    navigator.clipboard.writeText(html);
    
    toast({
      title: "HTML Copied",
      description: "Your signature HTML has been copied to clipboard.",
    });
  };

  const generateSignatureHTML = () => {
    // Generate HTML based on the selected layout
    // This is a simple example - you would want to create more elaborate HTML
    const baseStyles = `font-family: ${signatureData.font}; color: #333;`;
    let html = '';
    
    switch (layout) {
      case "standard":
        html = `<table style="${baseStyles}" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align: top; padding-right: 15px;">
              ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px;" />` : ''}
            </td>
            <td>
              <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
              <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
              <div style="height: 1px; background-color: #eee; margin: 8px 0;"></div>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
            </td>
          </tr>
        </table>`;
        break;
      case "centered":
        html = `<div style="${baseStyles} text-align: center;">
          ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 120px;" /></div>` : ''}
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <div style="height: 1px; background-color: #eee; width: 50%; margin: 8px auto;"></div>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
        </div>`;
        break;
      case "compact":
        html = `<div style="${baseStyles}">
          <div style="display: flex; align-items: center; gap: 10px;">
            ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 60px;" />` : ''}
            <div>
              <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 16px;">${signatureData.fullName}</h3>
              <p style="margin: 0; font-size: 12px;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
            </div>
          </div>
          <div style="height: 1px; background-color: #eee; margin: 8px 0;"></div>
          <div style="font-size: 12px;">
            <span style="margin-right: 15px;">${signatureData.phone || ''}</span>
            <span style="margin-right: 15px;">${signatureData.email || ''}</span>
            <span style="margin-right: 15px;">${signatureData.website || ''}</span>
            <span>${signatureData.address || ''}</span>
          </div>
        </div>`;
        break;
      case "stacked":
        html = `<div style="${baseStyles}">
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px; border-left: 4px solid ${signatureData.primaryColor}; padding-left: 10px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <div style="display: flex; align-items: flex-start; gap: 15px; margin-top: 10px;">
            ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 80px;" />` : ''}
            <div style="font-size: 14px;">
              <p style="margin: 3px 0;">${signatureData.phone || ''}</p>
              <p style="margin: 3px 0;">${signatureData.email || ''}</p>
              <p style="margin: 3px 0;">${signatureData.website || ''}</p>
              <p style="margin: 3px 0;">${signatureData.address || ''}</p>
            </div>
          </div>
        </div>`;
        break;
      case "icon-list":
        html = `<div style="${baseStyles} text-align: center;">
          ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px; border-radius: 50%;" /></div>` : ''}
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <div style="margin-top: 10px; text-align: left;">
            ${signatureData.phone ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.phone}</p>` : ''}
            ${signatureData.email ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.email}</p>` : ''}
            ${signatureData.website ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.website}</p>` : ''}
            ${signatureData.address ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.address}</p>` : ''}
          </div>
        </div>`;
        break;
      case "two-columns":
        html = `<table style="${baseStyles}" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width: 50%; padding-right: 15px; vertical-align: top;">
              <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
              <p style="margin: 5px 0;">${signatureData.jobTitle}</p>
              ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px; margin-top: 10px;" />` : ''}
            </td>
            <td style="width: 50%; vertical-align: top; border-left: 1px solid #eee; padding-left: 15px;">
              <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.companyName}</h3>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
              <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
            </td>
          </tr>
        </table>`;
        break;
      case "bordered":
        html = `<div style="${baseStyles} text-align: center; border: 2px solid ${signatureData.primaryColor}; padding: 15px; border-radius: 5px;">
          ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px;" /></div>` : ''}
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px; font-size: 14px;">
            ${signatureData.phone ? `<span>${signatureData.phone}</span>` : ''}
            ${signatureData.email ? `<span>${signatureData.email}</span>` : ''}
            ${signatureData.website ? `<span>${signatureData.website}</span>` : ''}
          </div>
          ${signatureData.address ? `<p style="margin: 5px 0; font-size: 14px;">${signatureData.address}</p>` : ''}
        </div>`;
        break;
      case "minimalist":
        html = `<div style="${baseStyles} display: flex; align-items: center;">
          <div style="width: 3px; height: 80px; background-color: ${signatureData.primaryColor}; margin-right: 15px;"></div>
          <div>
            <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
            <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''} ${signatureData.email ? `| ${signatureData.email}` : ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''} ${signatureData.address ? `| ${signatureData.address}` : ''}</p>
          </div>
        </div>`;
        break;
      case "bubbles":
        html = `<div style="${baseStyles} text-align: center;">
          ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px; border-radius: 50%;" /></div>` : ''}
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
            ${signatureData.phone ? `<div style="background-color: ${signatureData.primaryColor}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px;" title="${signatureData.phone}">P</div>` : ''}
            ${signatureData.email ? `<div style="background-color: ${signatureData.primaryColor}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px;" title="${signatureData.email}">E</div>` : ''}
            ${signatureData.website ? `<div style="background-color: ${signatureData.primaryColor}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px;" title="${signatureData.website}">W</div>` : ''}
          </div>
        </div>`;
        break;
      case "banner":
        html = `<div style="${baseStyles}">
          <div style="background-color: ${signatureData.primaryColor}; color: white; padding: 10px; text-align: center; margin-bottom: 10px;">
            <h3 style="margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          </div>
          <div style="padding: 10px;">
            <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
            ${signatureData.logoUrl ? `<div style="margin-top: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px;" /></div>` : ''}
          </div>
        </div>`;
        break;
      case "gradient":
        html = `<div style="${baseStyles} background: linear-gradient(135deg, ${signatureData.primaryColor}20, white); padding: 15px; border-radius: 5px;">
          <div style="text-align: center;">
            <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
            <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          </div>
          <div style="height: 1px; background-color: ${signatureData.primaryColor}50; margin: 10px 0;"></div>
          <div style="text-align: center; font-size: 14px;">
            <p style="margin: 5px 0;">${signatureData.phone || ''}</p>
            <p style="margin: 5px 0;">${signatureData.email || ''}</p>
            <p style="margin: 5px 0;">${signatureData.website || ''}</p>
            <p style="margin: 5px 0;">${signatureData.address || ''}</p>
          </div>
          ${signatureData.logoUrl ? `<div style="text-align: center; margin-top: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 80px;" /></div>` : ''}
        </div>`;
        break;
      default:
        html = `<div style="${baseStyles}">
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
        </div>`;
    }
    
    return html;
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
        description: "Please complete all steps and purchase a plan to download your signature HTML.",
      });
      return;
    }
    
    // Generate HTML for download
    const html = generateSignatureHTML();
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
        
      case "icon-list":
        return (
          <div className="text-center space-y-2" style={{ fontFamily: signatureData.font }}>
            {signatureData.logoUrl && (
              <div className="flex justify-center mb-2">
                <img src={signatureData.logoUrl} alt="Company Logo" className="h-16 w-16 object-cover rounded-full" />
              </div>
            )}
            <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
            <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
            <div className="text-sm text-gray-700 space-y-1 text-left mt-2">
              {signatureData.phone && (
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: signatureData.primaryColor }}></span>
                  {signatureData.phone}
                </p>
              )}
              {signatureData.email && (
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: signatureData.primaryColor }}></span>
                  {signatureData.email}
                </p>
              )}
              {signatureData.website && (
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: signatureData.primaryColor }}></span>
                  {signatureData.website}
                </p>
              )}
              {signatureData.address && (
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: signatureData.primaryColor }}></span>
                  {signatureData.address}
                </p>
              )}
            </div>
          </div>
        );
      
      case "two-columns":
        return (
          <div className="flex justify-between" style={{ fontFamily: signatureData.font }}>
            <div className="w-[48%]">
              <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
              <p className="text-gray-600">{signatureData.jobTitle}</p>
              {signatureData.logoUrl && (
                <img src={signatureData.logoUrl} alt="Company Logo" className="w-16 h-auto object-contain mt-2" />
              )}
            </div>
            <div className="w-[48%] border-l pl-4">
              <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.companyName}</h3>
              <div className="text-sm text-gray-700 space-y-1">
                {signatureData.phone && <p>{signatureData.phone}</p>}
                {signatureData.email && <p>{signatureData.email}</p>}
                {signatureData.website && <p>{signatureData.website}</p>}
                {signatureData.address && <p>{signatureData.address}</p>}
              </div>
            </div>
          </div>
        );
        
      case "bordered":
        return (
          <div className="text-center p-4 border-2 rounded-md" style={{ fontFamily: signatureData.font, borderColor: signatureData.primaryColor }}>
            {signatureData.logoUrl && (
              <div className="flex justify-center mb-2">
                <img src={signatureData.logoUrl} alt="Company Logo" className="h-16 w-auto object-contain" />
              </div>
            )}
            <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
            <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-700">
              {signatureData.phone && <span>{signatureData.phone}</span>}
              {signatureData.email && <span>{signatureData.email}</span>}
              {signatureData.website && <span>{signatureData.website}</span>}
            </div>
            {signatureData.address && <p className="text-sm text-gray-700 mt-1">{signatureData.address}</p>}
          </div>
        );
        
      case "minimalist":
        return (
          <div className="flex items-center" style={{ fontFamily: signatureData.font }}>
            <div className="w-1 h-16 mr-4" style={{ backgroundColor: signatureData.primaryColor }}></div>
            <div>
              <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
              <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
              <p className="text-sm text-gray-700">
                {signatureData.phone}{signatureData.email ? ` | ${signatureData.email}` : ''}
              </p>
              <p className="text-sm text-gray-700">
                {signatureData.website}{signatureData.address ? ` | ${signatureData.address}` : ''}
              </p>
            </div>
          </div>
        );
        
      case "bubbles":
        return (
          <div className="text-center space-y-2" style={{ fontFamily: signatureData.font }}>
            {signatureData.logoUrl && (
              <div className="flex justify-center mb-2">
                <img src={signatureData.logoUrl} alt="Company Logo" className="h-16 w-16 object-cover rounded-full" />
              </div>
            )}
            <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
            <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
            <div className="flex justify-center gap-2 mt-2">
              {signatureData.phone && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: signatureData.primaryColor }}
                  title={signatureData.phone}
                >
                  P
                </div>
              )}
              {signatureData.email && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: signatureData.primaryColor }}
                  title={signatureData.email}
                >
                  E
                </div>
              )}
              {signatureData.website && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: signatureData.primaryColor }}
                  title={signatureData.website}
                >
                  W
                </div>
              )}
            </div>
          </div>
        );
        
      case "banner":
        return (
          <div style={{ fontFamily: signatureData.font }}>
            <div 
              className="py-2 px-4 text-center text-white mb-3"
              style={{ backgroundColor: signatureData.primaryColor }}
            >
              <h3 className="font-semibold text-lg">{signatureData.fullName}</h3>
            </div>
            <div className="px-2">
              <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
              <div className="text-sm text-gray-700 space-y-1 mt-2">
                {signatureData.phone && <p>{signatureData.phone}</p>}
                {signatureData.email && <p>{signatureData.email}</p>}
                {signatureData.website && <p>{signatureData.website}</p>}
                {signatureData.address && <p>{signatureData.address}</p>}
              </div>
              {signatureData.logoUrl && (
                <div className="mt-2">
                  <img src={signatureData.logoUrl} alt="Company Logo" className="h-12 w-auto object-contain" />
                </div>
              )}
            </div>
          </div>
        );
        
      case "gradient":
        return (
          <div 
            className="p-4 rounded-md"
            style={{ 
              fontFamily: signatureData.font,
              background: `linear-gradient(135deg, ${signatureData.primaryColor}20, white)`
            }}
          >
            <div className="text-center">
              <h3 style={{ color: signatureData.primaryColor }} className="font-semibold text-lg">{signatureData.fullName}</h3>
              <p className="text-gray-600">{signatureData.jobTitle} | {signatureData.companyName}</p>
            </div>
            <div className="h-px my-2" style={{ backgroundColor: `${signatureData.primaryColor}50` }}></div>
            <div className="text-center text-sm text-gray-700 space-y-1">
              {signatureData.phone && <p>{signatureData.phone}</p>}
              {signatureData.email && <p>{signatureData.email}</p>}
              {signatureData.website && <p>{signatureData.website}</p>}
              {signatureData.address && <p>{signatureData.address}</p>}
            </div>
            {signatureData.logoUrl && (
              <div className="flex justify-center mt-2">
                <img src={signatureData.logoUrl} alt="Company Logo" className="h-12 w-auto object-contain" />
              </div>
            )}
          </div>
        );
      
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
