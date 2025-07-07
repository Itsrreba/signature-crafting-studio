
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Mail, LayoutDashboard } from "lucide-react";

const Header = () => {
  const { user, logout, isLoading } = useAuth();

  console.log("Header render - user:", user?.email || "No user", "isLoading:", isLoading);

  const handleLogout = async () => {
    console.log("Header - logout clicked");
    await logout();
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-brand-purple">SignatureCraft</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5">
            <Link to="/" className="text-sm font-medium hover:text-brand-purple transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-brand-purple transition-colors">
              Pricing
            </Link>
            {user && (
              <Link to="/dashboard" className="text-sm font-medium hover:text-brand-purple transition-colors">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 hover:bg-gray-50 min-w-[120px]">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name || user.email?.split('@')[0] || 'User'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center cursor-default focus:bg-transparent">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="text-sm truncate max-w-[200px]">{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center cursor-pointer w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-colors" 
                asChild
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button 
                className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6" 
                asChild
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
