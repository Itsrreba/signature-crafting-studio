
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  const { user, savedSignatures, refreshSignatures, isLoading } = useAuth();
  
  useEffect(() => {
    if (user) {
      refreshSignatures();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-purple" />
        <p className="mt-4 text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="signatures">My Signatures</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>View your account details and subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-500">{user?.email}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Name</h3>
                      <p className="text-gray-500">{user?.name || "Not specified"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Current Plan</h3>
                      {user?.plan ? (
                        <Badge className="bg-brand-purple capitalize">{user.plan}</Badge>
                      ) : (
                        <Badge variant="outline">Free</Badge>
                      )}
                    </div>
                  </div>
                  
                  {!user?.plan && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600 mb-4">
                        Upgrade to a paid plan to unlock premium features and save your signature designs.
                      </p>
                      <Button asChild size="sm">
                        <Link to="/pricing">View Plans</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Signature Stats</CardTitle>
                  <CardDescription>An overview of your signature usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Total Signatures</h3>
                      <p className="text-3xl font-bold">{savedSignatures?.length || 0}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Storage Used</h3>
                      <p className="text-3xl font-bold">
                        {(savedSignatures?.length || 0) > 0 ? "~" + (savedSignatures?.length || 0) * 5 + "KB" : "0KB"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Available Slots</h3>
                      <p className="text-3xl font-bold">
                        {user?.plan === "individual" ? "1" : user?.plan === "team" ? "10" : "0"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signatures" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Signatures</CardTitle>
                  <CardDescription>Manage your saved email signatures</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedSignatures && savedSignatures.length > 0 ? (
                    <div className="grid gap-4">
                      {savedSignatures.map((signature) => (
                        <div key={signature.id} className="border rounded-md p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{signature.name}</p>
                            <p className="text-sm text-gray-500">
                              Created: {new Date(signature.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-4">You haven't created any signatures yet.</p>
                      <Button asChild>
                        <Link to="/">Create Your First Signature</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
