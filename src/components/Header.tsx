
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
          {!isLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 hover:bg-gray-50">
                  <User className="h-4 w-4" />
                  <span className="capitalize hidden sm:inline">{user.name || user.email.split('@')[0]}</span>
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
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !isLoading ? (
            <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden sm:flex hover:bg-gray-50" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-16 h-9 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-9 bg-gray-200 rounded animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
