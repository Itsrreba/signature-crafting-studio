
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type SignatureAccessStepProps = {
  prevStep: () => void;
};

const SignatureAccessStep = ({ prevStep }: SignatureAccessStepProps) => {
  const handleFreeSignup = () => {
    toast({
      title: "Sign up required",
      description: "Please create an account to access your signature.",
    });
  };

  const handlePayment = (plan: string) => {
    toast({
      title: "Payment required",
      description: `Please complete your ${plan} plan payment to access your signature.`,
    });
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Access Your Signature</h2>
        <p className="text-gray-500">Sign up or upgrade to download your signature HTML.</p>
      </div>
      
      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4 text-center">
          <Lock className="h-12 w-12 mx-auto text-brand-purple opacity-80 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your Signature is Ready!</h3>
          <p className="text-muted-foreground mb-4">
            Sign up for free or choose a plan to access your signature HTML and start using it right away.
          </p>
        </div>
        
        <div className="grid gap-4">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-lg font-semibold flex items-center">
                  Free Access
                  <span className="ml-auto text-sm font-normal text-muted-foreground">$0</span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Basic signature HTML</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Limited layout options</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Create one signature</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4"
                  variant="outline"
                  onClick={handleFreeSignup}
                >
                  Sign Up for Free
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-brand-purple border-2 transition-all">
            <CardContent className="p-0">
              <div className="bg-brand-purple text-white p-2 text-center text-sm font-medium">
                RECOMMENDED
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold flex items-center">
                  Premium
                  <span className="ml-auto text-sm font-normal text-muted-foreground">$2</span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>All layouts and fonts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Unlimited signatures</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Premium support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4 bg-brand-purple hover:bg-brand-purple/90"
                  onClick={() => handlePayment("premium")}
                >
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button onClick={prevStep} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </>
  );
};

export default SignatureAccessStep;
