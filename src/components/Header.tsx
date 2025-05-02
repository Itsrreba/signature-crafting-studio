
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-brand-purple">SignatureCraft</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">
            Log In
          </Button>
          <Button className="bg-brand-purple hover:bg-opacity-90">
            Sign Up for Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
