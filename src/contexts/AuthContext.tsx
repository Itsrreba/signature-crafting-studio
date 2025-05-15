
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API request
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo, we'll accept any non-empty values
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Create a mock user (in a real app, this would come from your backend)
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0],
        plan: null,
      };
      
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      return true;
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
    // Simulate API request
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Create a mock user (in a real app, this would come from your backend)
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        plan: null,
      };
      
      setUser(mockUser);
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
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const updateUserPlan = (plan: "individual" | "team") => {
    if (user) {
      const updatedUser = { ...user, plan };
      setUser(updatedUser);
      toast({
        title: "Subscription updated",
        description: `You are now subscribed to the ${plan === "individual" ? "Single User" : "Team"} plan.`,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUserPlan }}>
      {children}
    </AuthContext.Provider>
  );
};
