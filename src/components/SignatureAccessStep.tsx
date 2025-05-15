
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";
import { useAuth } from "@/contexts/AuthContext";

type SignatureAccessStepProps = {
  prevStep: () => void;
};

const SignatureAccessStep = ({ prevStep }: SignatureAccessStepProps) => {
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"individual" | "team">("individual");
  const { user } = useAuth();

  const handleFreeSignup = () => {
    if (!user) {
      toast({
        description: "Please sign in or create an account to continue.",
      });
      navigate("/login");
      return;
    }
    
    setSelectedPlan("individual");
    setIsPaymentModalOpen(true);
  };

  const handlePayment = (plan: "individual" | "team") => {
    if (!user) {
      toast({
        description: "Please sign in or create an account to continue.",
      });
      navigate("/login");
      return;
    }
    
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Access Your Signature</h2>
        <div className="flex items-center text-brand-purple">
          <Lock className="h-5 w-5 mr-2" />
          <p>Your signature is ready! Choose a plan to access your signature HTML.</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid gap-4">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-lg font-semibold flex items-center">
                  Single User
                  <span className="ml-auto text-sm font-normal text-muted-foreground">$2</span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Basic signature HTML</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Limited layout options</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Create one signature</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4"
                  variant="outline"
                  onClick={handleFreeSignup}
                >
                  Sign Up for $2
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
                  Team
                  <span className="ml-auto text-sm font-normal text-muted-foreground">$10</span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>All layouts and fonts</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Unlimited signatures</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Premium support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4 bg-brand-purple hover:bg-brand-purple/90"
                  onClick={() => handlePayment("team")}
                >
                  Upgrade to Team
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

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={selectedPlan}
      />
    </>
  );
};

export default SignatureAccessStep;
