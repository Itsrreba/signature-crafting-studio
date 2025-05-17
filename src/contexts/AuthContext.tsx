
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Check for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If environment variables are not set, warn in development
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Initialize the Supabase client with fallback values for development
const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co", 
  supabaseAnonKey || "placeholder-key"
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from Supabase session on initial render
  useEffect(() => {
    // Show warning if environment variables are missing
    if (!supabaseUrl || !supabaseAnonKey) {
      toast({
        title: "Configuration Error",
        description: "Supabase environment variables are missing. Please check your .env file.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const loadUser = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch user profile from database
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
            throw profileError;
          }

          // Create user object with profile data
          const userObj: User = {
            id: session.user.id,
            email: session.user.email || "",
            name: profileData?.name || session.user.email?.split('@')[0] || "",
            plan: profileData?.plan || null,
          };
          
          setUser(userObj);
        }
      } catch (error) {
        console.error("Error loading user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Fetch user profile and set user state
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: profileData?.name || session.user.email?.split('@')[0] || "",
          plan: profileData?.plan || null,
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Fetch user profile from database
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        }

        // Set user state
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: profileData?.name || data.user.email?.split('@')[0] || "",
          plan: profileData?.plan || null,
        });
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${profileData?.name || data.user.email?.split('@')[0] || ""}!`,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Update profile with name
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ name })
          .eq("id", data.user.id);

        if (updateError) {
          console.error("Error updating profile:", updateError);
        }

        // Set user state
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: name,
          plan: null,
        });
        
        toast({
          title: "Account created",
          description: `Welcome, ${name}!`,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
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
    
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
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

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUserPlan }}>
      {children}
    </AuthContext.Provider>
  );
};
