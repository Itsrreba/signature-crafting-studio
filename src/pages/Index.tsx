
import React, { useState } from "react";
import Header from "@/components/Header";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import SignatureSaveButton from "@/components/SignatureSaveButton";
import { generateSignatureHTML } from "@/utils/signatureHtml";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    linkedIn: "",
    twitter: "",
    instagram: "",
    logoUrl: "",
  });
  
  // Default layout and additional required properties for components
  const [layout, setLayout] = useState("standard");
  
  // Define additional properties for signature data that might be needed
  const signatureData = {
    ...formData,
    fullName: formData.name,
    jobTitle: formData.title,
    companyName: formData.company,
    primaryColor: "#4F46E5",
    font: "Arial, sans-serif",
  };

  // Get the current HTML content of the signature
  const signatureHTML = generateSignatureHTML(signatureData, layout);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container py-8 flex-1">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Create Your Email Signature</h1>
              <SignatureSaveButton signatureContent={signatureHTML} />
            </div>
            <SignatureForm 
              signatureData={signatureData} 
              setSignatureData={setFormData} 
              layout={layout}
              setLayout={setLayout}
            />
          </div>
          <div>
            <SignaturePreview 
              signatureData={signatureData}
              layout={layout}
              template="standard" // Default template, adjust if necessary
              currentStep={1} // Default step, adjust if necessary
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
