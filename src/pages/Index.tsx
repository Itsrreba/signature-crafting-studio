
import React, { useState } from "react";
import Header from "@/components/Header";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import SignatureSaveButton from "@/components/SignatureSaveButton";
import { getSignatureHTML } from "@/utils/signatureHtml";

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

  // Get the current HTML content of the signature
  const signatureHTML = getSignatureHTML(formData);

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
            <SignatureForm data={formData} setData={setFormData} />
          </div>
          <div>
            <SignaturePreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
