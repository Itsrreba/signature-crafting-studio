
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Download, AlertTriangle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaymentDialog from "@/components/PaymentDialog";
import ProtectedRoute from "@/components/ProtectedRoute";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || "", supabaseKey || "");

interface Signature {
  id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const SignaturesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  // Fetch signatures from database
  useEffect(() => {
    const fetchSignatures = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('signatures')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        setSignatures(data || []);
      } catch (error) {
        console.error('Error fetching signatures:', error);
        toast({
          title: "Failed to load signatures",
          description: "There was a problem loading your signatures. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSignatures();
  }, [user]);
  
  // Handle creating a new signature
  const handleCreateNew = () => {
    // Check if user has reached their plan limit
    if (user?.plan === "individual" && signatures.length >= 1) {
      // Show payment dialog if they've reached the limit
      setShowPaymentDialog(true);
      return;
    }
    
    if (user?.plan === "team" && signatures.length >= 10) {
      toast({
        title: "Signature limit reached",
        description: "You've reached the maximum number of signatures allowed under your Team plan (10).",
        variant: "destructive",
      });
      return;
    }
    
    // If not subscribed at all
    if (!user?.plan) {
      setShowPaymentDialog(true);
      return;
    }
    
    // Navigate to signature creator
    navigate('/');
  };
  
  // Handle editing a signature
  const handleEdit = (signature: Signature) => {
    // In a real app, you would pass the signature ID to the editor
    // For now, we'll just navigate to the home page
    navigate('/');
  };
  
  // Handle downloading a signature
  const handleDownload = (signature: Signature) => {
    // Create a blob from the signature content
    const blob = new Blob([signature.content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${signature.name}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Signature downloaded",
      description: `${signature.name} has been downloaded successfully.`,
    });
  };
  
  // Handle deleting a signature
  const handleDelete = async (id: string, name: string) => {
    try {
      const { error } = await supabase
        .from('signatures')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the local state
      setSignatures(signatures.filter(sig => sig.id !== id));
      
      toast({
        title: "Signature deleted",
        description: `${name} has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error deleting signature:', error);
      toast({
        title: "Failed to delete signature",
        description: "There was a problem deleting this signature. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Email Signatures</h1>
            <Button onClick={handleCreateNew} className="bg-brand-purple hover:bg-opacity-90">
              <Plus className="mr-1 h-4 w-4" />
              Create New Signature
            </Button>
          </div>
          
          {user?.plan ? (
            <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-lg flex items-center">
              <div className="text-green-700">
                <strong>Current Plan:</strong> {user.plan === "individual" ? "Individual" : "Team"} Plan
                {user.plan === "individual" ? (
                  <span className="block text-sm mt-1">You can create 1 signature with this plan.</span>
                ) : (
                  <span className="block text-sm mt-1">You can create up to 10 signatures with this plan.</span>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-amber-700">
                You don't have any active subscription plan. 
                <a href="/pricing" className="ml-1 underline">Upgrade now</a> to save your signatures.
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-8">Loading your signatures...</div>
          ) : signatures.length > 0 ? (
            <div className="bg-white rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[200px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signatures.map((signature) => (
                    <TableRow key={signature.id}>
                      <TableCell className="font-medium">{signature.name}</TableCell>
                      <TableCell>
                        {new Date(signature.updated_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEdit(signature)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDownload(signature)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-500 hover:text-red-700" 
                            onClick={() => handleDelete(signature.id, signature.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Card className="border-dashed border-2 bg-gray-50">
              <CardContent className="pt-10 pb-8 text-center">
                <div className="mb-4 text-gray-500">
                  You don't have any saved signatures yet.
                </div>
                <Button 
                  onClick={handleCreateNew} 
                  className="bg-brand-purple hover:bg-opacity-90"
                >
                  Create Your First Signature
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <PaymentDialog 
        open={showPaymentDialog} 
        onOpenChange={setShowPaymentDialog} 
      />
    </ProtectedRoute>
  );
};

export default SignaturesPage;
