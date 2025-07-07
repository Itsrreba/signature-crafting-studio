
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SavedSignature } from "@/types/SavedSignature";

type User = {
  id: string;
  email: string;
  name: string;
  plan: "free" | "individual" | "team" | null;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserPlan: (plan: "individual" | "team") => void;
  saveSignature: (name: string, signatureData: any, layout: string) => Promise<boolean>;
  updateSignature: (id: string, name: string, signatureData: any, layout: string) => Promise<boolean>;
  deleteSignature: (id: string) => Promise<boolean>;
  getSavedSignatures: () => Promise<SavedSignature[]>;
  savedSignatures: SavedSignature[];
  isSavingSignature: boolean;
  refreshSignatures: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedSignatures, setSavedSignatures] = useState<SavedSignature[]>([]);
  const [isSavingSignature, setIsSavingSignature] = useState(false);

  console.log("AuthProvider - Current user state:", user?.email || "No user");

  // Initialize auth state
  useEffect(() => {
    console.log("AuthProvider - Setting up auth listener");
    
    let mounted = true;

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session ? `User: ${session.user.email}` : "No session");
      
      if (!mounted) return;

      if (session?.user) {
        await processUser(session.user);
      } else {
        setUser(null);
        setSavedSignatures([]);
      }
      setIsLoading(false);
    });

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          if (mounted) setIsLoading(false);
          return;
        }

        if (mounted) {
          if (session?.user) {
            await processUser(session.user);
          } else {
            setUser(null);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      console.log("Cleaning up auth listener");
      authListener.subscription.unsubscribe();
    };
  }, []);

  const processUser = async (authUser: any) => {
    try {
      console.log("Processing user:", authUser.email);
      
      // Fetch user profile from database
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      let userProfile = profileData;

      // If profile doesn't exist, create one
      if (!userProfile) {
        console.log("Creating new profile for user:", authUser.email);
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: authUser.id,
            name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || "",
            plan: "free"
          })
          .select()
          .single();
        
        if (insertError) {
          console.error("Error creating profile:", insertError);
        } else {
          userProfile = newProfile;
        }
      }

      // Create user object
      const userObj: User = {
        id: authUser.id,
        email: authUser.email || "",
        name: userProfile?.name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || "",
        plan: (userProfile?.plan as "free" | "individual" | "team") || "free",
      };
      
      console.log("Setting user:", userObj.email, "with plan:", userObj.plan);
      setUser(userObj);

    } catch (error) {
      console.error("Error processing user:", error);
      // Still set user even if profile operations fail
      const userObj: User = {
        id: authUser.id,
        email: authUser.email || "",
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || "",
        plan: "free",
      };
      setUser(userObj);
    }
  };

  // Fetch saved signatures when user changes
  useEffect(() => {
    if (user) {
      refreshSignatures();
    } else {
      setSavedSignatures([]);
    }
  }, [user]);

  const refreshSignatures = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("signatures")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching signatures:", error);
        return;
      }

      setSavedSignatures(data || []);
    } catch (error) {
      console.error("Error in refreshSignatures:", error);
    }
  };

  const saveSignature = async (name: string, signatureData: any, layout: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save signatures",
        variant: "destructive",
      });
      return false;
    }

    setIsSavingSignature(true);
    try {
      // Check signature limit based on plan
      if (savedSignatures.length >= getSignatureLimit(user.plan)) {
        toast({
          title: "Signature limit reached",
          description: getPlanLimitMessage(user.plan),
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase.from("signatures").insert({
        user_id: user.id,
        name,
        signature_data: signatureData,
        layout,
      }).select().single();

      if (error) {
        console.error("Error saving signature:", error);
        toast({
          title: "Save failed",
          description: "Could not save your signature. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      // Update local state
      setSavedSignatures((prev) => [data, ...prev]);
      
      toast({
        title: "Signature saved",
        description: `"${name}" has been saved successfully.`,
      });
      
      return true;
    } catch (error) {
      console.error("Save signature error:", error);
      toast({
        title: "Save failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSavingSignature(false);
    }
  };

  const updateSignature = async (id: string, name: string, signatureData: any, layout: string) => {
    if (!user) return false;

    setIsSavingSignature(true);
    try {
      const { error } = await supabase
        .from("signatures")
        .update({
          name,
          signature_data: signatureData,
          layout,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating signature:", error);
        toast({
          title: "Update failed",
          description: "Could not update your signature. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      // Update local state
      setSavedSignatures((prev) =>
        prev.map((sig) => (sig.id === id ? { ...sig, name, signature_data: signatureData, layout, updated_at: new Date().toISOString() } : sig))
      );
      
      toast({
        title: "Signature updated",
        description: `"${name}" has been updated successfully.`,
      });
      
      return true;
    } catch (error) {
      console.error("Update signature error:", error);
      toast({
        title: "Update failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSavingSignature(false);
    }
  };

  const deleteSignature = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("signatures")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error deleting signature:", error);
        toast({
          title: "Delete failed",
          description: "Could not delete your signature. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      // Update local state
      setSavedSignatures((prev) => prev.filter((sig) => sig.id !== id));
      
      toast({
        title: "Signature deleted",
        description: "The signature has been deleted successfully.",
      });
      
      return true;
    } catch (error) {
      console.error("Delete signature error:", error);
      toast({
        title: "Delete failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getSavedSignatures = async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from("signatures")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching signatures:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getSavedSignatures:", error);
      return [];
    }
  };
  
  const getSignatureLimit = (plan: "free" | "individual" | "team" | null) => {
    switch (plan) {
      case "individual": return 1;
      case "team": return 10;
      default: return 0; // Free users can't save
    }
  };
  
  const getPlanLimitMessage = (plan: "free" | "individual" | "team" | null) => {
    switch (plan) {
      case "individual": 
        return "Your Individual plan allows saving 1 signature. Upgrade to Team plan for more.";
      case "team": 
        return "Your Team plan allows saving up to 10 signatures.";
      default: 
        return "You need to purchase a plan to save signatures.";
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login for:", email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      console.log("Login successful for:", data?.user?.email);
      
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      console.log("Attempting signup for:", email);
      setIsLoading(true);
      
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) {
        throw error;
      }
      
      console.log("Signup successful for:", data?.user?.email);
      
      toast({
        title: "Account created",
        description: `Welcome, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out user");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Clear local state immediately
      setUser(null);
      setSavedSignatures([]);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  const updateUserPlan = async (plan: "individual" | "team") => {
    if (!user) {
      return;
    }

    try {
      // Update plan in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({ plan, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      // Update local user state
      setUser({ ...user, plan });
      
      toast({
        title: "Subscription updated",
        description: `You are now subscribed to the ${plan === "individual" ? "Single User" : "Team"} plan.`,
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      toast({
        title: "Failed to update subscription",
        description: error instanceof Error ? error.message : "An error occurred while updating your subscription",
        variant: "destructive",
      });
    }
  };

  // Fetch saved signatures when user changes
  useEffect(() => {
    if (user) {
      refreshSignatures();
    } else {
      setSavedSignatures([]);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      updateUserPlan,
      saveSignature,
      updateSignature,
      deleteSignature,
      getSavedSignatures,
      savedSignatures,
      isSavingSignature,
      refreshSignatures
    }}>
      {children}
    </AuthContext.Provider>
  );
};
