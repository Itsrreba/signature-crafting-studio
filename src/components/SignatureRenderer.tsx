
import React from "react";

interface SignatureRendererProps {
  signatureData: any;
  layout: string;
}

const SignatureRenderer = ({ signatureData, layout }: SignatureRendererProps) => {
  
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

export default SignatureRenderer;
