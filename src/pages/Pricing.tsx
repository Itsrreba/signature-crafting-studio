import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Wallet, PayPal, BankNote } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";

const PricingPage = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"individual" | "team">("individual");

  const handlePaymentClick = (plan: "individual" | "team") => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-brand-purple text-white py-16">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl opacity-90">
              Choose the right plan for your email signature needs
            </p>
          </div>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Individual Plan */}
          <Card className="border-2 hover:border-brand-purple hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Individual</CardTitle>
              <CardDescription>Perfect for personal use</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$2</span>
                <span className="text-gray-500 ml-2">one-time payment</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>1 user account</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>All signature templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>All layout variations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>HTML export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Customer support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handlePaymentClick("individual")} 
                className="w-full bg-brand-purple hover:bg-opacity-90"
              >
                <Wallet className="mr-1 h-4 w-4" />
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Team Plan */}
          <Card className="border-2 border-brand-purple shadow-lg">
            <div className="bg-brand-purple text-white text-center py-1.5 text-sm font-medium">
              MOST POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Team</CardTitle>
              <CardDescription>For multiple team members</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$10</span>
                <span className="text-gray-500 ml-2">one-time payment</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Multiple user accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Team management dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Company branding options</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Unified style across team</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Premium customer support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handlePaymentClick("team")} 
                className="w-full bg-brand-purple hover:bg-opacity-90"
              >
                <Wallet className="mr-1 h-4 w-4" />
                Get Team Access
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Payment Methods Section */}
      <div className="bg-white py-12">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Accepted Payment Methods</h2>
            <p className="text-gray-600 mt-3">We offer flexible payment options to suit your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-lg border bg-white shadow-sm text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PayPal className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PayPal</h3>
              <p className="text-gray-600">Quick and secure online payments</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-white shadow-sm text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BankNote className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wise</h3>
              <p className="text-gray-600">International transfers with low fees</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-white shadow-sm text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bank Transfer</h3>
              <p className="text-gray-600">Direct transfer to our bank account</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-50 py-12">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Is this a subscription or one-time payment?</h3>
              <p className="text-gray-600">This is a one-time payment for lifetime access to the service.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What's included in the Individual plan?</h3>
              <p className="text-gray-600">The Individual plan includes access for one user to all signature templates and layouts with HTML export capability.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How many users are included in the Team plan?</h3>
              <p className="text-gray-600">The Team plan includes multiple users with unified branding across your team's signatures.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How do I receive my access after payment?</h3>
              <p className="text-gray-600">After payment confirmation, you'll receive an email with your access credentials and instructions.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-brand-light py-16">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to create professional email signatures?</h2>
            <p className="text-lg text-gray-700">
              Choose a plan and start making a great impression with every email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-brand-purple hover:bg-opacity-90 text-white">
                <Link to="/pricing">View Pricing</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">Try Creator First</Link>
              </Button>
            </div>
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
      
      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
};

export default PricingPage;
