import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { DollarSign } from "lucide-react";

const Index = () => {
  const [layout, setLayout] = useState<string>("standard");
  const [currentStep, setCurrentStep] = useState<number>(1);
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
    font: "Arial, sans-serif",
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-brand text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Create Professional Email Signatures in Minutes
            </h1>
            <p className="text-xl opacity-90">
              Make a lasting impression with custom email signatures that showcase your brand identity.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 shadow-lg">
                Start Creating Now
              </Button>
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 shadow-lg">
                <Link to="/pricing">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Editor Section */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <SignatureForm 
            signatureData={signatureData} 
            setSignatureData={setSignatureData}
            layout={layout}
            setLayout={setLayout}
            onStepChange={handleStepChange}
          />
          <div className="lg:sticky lg:top-8 self-start">
            <SignaturePreview 
              signatureData={signatureData} 
              layout={layout}
              template=""
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-gradient-card py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Why Choose Our Signature Creator</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-gray-600">Choose from a variety of professional templates designed to impress.</p>
            </div>
            <div className="p-6 rounded-lg border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2">Multiple Layouts</h3>
              <p className="text-gray-600">Customize your signature with different layout options to fit your style.</p>
            </div>
            <div className="p-6 rounded-lg border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2">Complete Customization</h3>
              <p className="text-gray-600">Customize colors, layout, and styling to match your brand identity.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Teaser Section */}
      <div className="bg-gradient-purple-light py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gradient">Simple, Affordable Pricing</h2>
            <p className="text-lg text-gray-700 mt-3">Start with our free creator, upgrade when you need more</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm border-2 hover:border-brand-purple hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Individual</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-gradient">$2</span>
                  <span className="text-gray-500 ml-2">one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Single user access</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>All templates included</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Basic support</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-brand hover:opacity-90 text-white shadow-lg">
                <Link to="/pricing">Buy Now</Link>
              </Button>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm border-2 border-brand-purple relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-gradient-brand text-white text-center py-1 text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="text-center mb-6 mt-4">
                <h3 className="text-xl font-semibold">Team</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-gradient">$10</span>
                  <span className="text-gray-500 ml-2">one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Multiple user accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Team management</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-brand hover:opacity-90 text-white shadow-lg">
                <Link to="/pricing">Buy Team Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-purple-light py-16">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-gradient">Ready to create your professional signature?</h2>
            <p className="text-lg text-gray-700">
              Sign up now to save your signatures and access premium templates.
            </p>
            <Button size="lg" className="bg-gradient-brand hover:opacity-90 text-white shadow-lg">
              Sign Up for Free
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-dark to-gray-900 text-white py-8 mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-lg text-gradient-purple">SignatureCraft</span>
              <p className="text-sm opacity-70">© 2025 All Rights Reserved</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:underline hover:text-brand-purple transition-colors">Terms</a>
              <a href="#" className="text-sm hover:underline hover:text-brand-purple transition-colors">Privacy</a>
              <a href="#" className="text-sm hover:underline hover:text-brand-purple transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
