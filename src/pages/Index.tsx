
import React, { useState } from "react";
import Header from "@/components/Header";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [template, setTemplate] = useState<string>("modern");
  const [layout, setLayout] = useState<string>("standard");
  const [signatureData, setSignatureData] = useState({
    fullName: "John Doe",
    jobTitle: "Marketing Manager",
    companyName: "Acme Inc.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://www.example.com",
    address: "123 Business St, City, Country",
    logoUrl: "https://placehold.co/100x60?text=Logo",
    primaryColor: "#9b87f5",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-brand-purple text-white py-16">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Create Professional Email Signatures in Minutes
            </h1>
            <p className="text-xl opacity-90">
              Make a lasting impression with custom email signatures that showcase your brand identity.
            </p>
          </div>
        </div>
      </div>
      
      {/* Editor Section */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <SignatureForm 
            signatureData={signatureData} 
            setSignatureData={setSignatureData}
            template={template}
            setTemplate={setTemplate}
            layout={layout}
            setLayout={setLayout}
          />
          <div className="lg:sticky lg:top-8 self-start">
            <SignaturePreview 
              signatureData={signatureData} 
              template={template} 
              layout={layout}
            />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Signature Creator</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-gray-600">Choose from a variety of professional templates designed to impress.</p>
            </div>
            <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Multiple Layouts</h3>
              <p className="text-gray-600">Customize your signature with different layout options to fit your style.</p>
            </div>
            <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Complete Customization</h3>
              <p className="text-gray-600">Customize colors, layout, and styling to match your brand identity.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-brand-light py-16">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to create your professional signature?</h2>
            <p className="text-lg text-gray-700">
              Sign up now to save your signatures and access premium templates.
            </p>
            <Button size="lg" className="bg-brand-purple hover:bg-opacity-90 text-white">
              Sign Up for Free
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-brand-dark text-white py-8 mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-lg">SignatureCraft</span>
              <p className="text-sm opacity-70">© 2025 All Rights Reserved</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:underline">Terms</a>
              <a href="#" className="text-sm hover:underline">Privacy</a>
              <a href="#" className="text-sm hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
