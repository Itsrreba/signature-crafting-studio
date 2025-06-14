
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const plan = searchParams.get("plan") as "individual" | "team";
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { user, updateUserPlan } = useAuth();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !plan) {
        setIsVerifying(false);
        return;
      }

      try {
        // Call verification function
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId, plan }
        });

        if (error) {
          throw error;
        }

        if (data?.success) {
          setIsVerified(true);
          // Update user plan
          await updateUserPlan(plan);
          toast({
            title: "Payment successful!",
            description: `Your ${plan} plan has been activated.`,
          });
        } else {
          throw new Error(data?.error || "Payment verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast({
          title: "Payment verification failed",
          description: "Please contact support if the issue persists.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, plan, updateUserPlan]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-brand-purple" />
            <CardTitle>Verifying Payment</CardTitle>
            <CardDescription>
              Please wait while we confirm your payment...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {isVerified ? (
            <>
              <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
              <CardTitle className="text-green-700">Payment Successful!</CardTitle>
              <CardDescription>
                Thank you for your purchase. Your {plan} plan has been activated.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-red-700">Payment Verification Failed</CardTitle>
              <CardDescription>
                We couldn't verify your payment. Please contact support.
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isVerified && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">What's next?</h3>
              <p className="text-sm text-green-700 mt-1">
                You can now access all features of your {plan} plan. Go to your dashboard to get started.
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/">Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
