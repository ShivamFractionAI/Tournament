
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-gaming-primary/20 backdrop-blur-sm bg-gaming-dark/80 py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold gaming-gradient-text">Bid Tac Toe</div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-gaming-primary transition-colors">
            Home
          </Link>
          <Link to="/tournaments" className="text-foreground hover:text-gaming-primary transition-colors">
            Tournaments
          </Link>
          <Link to="/rules" className="text-foreground hover:text-gaming-primary transition-colors">
            Rules
          </Link>
          <Link to="/leaderboard" className="text-foreground hover:text-gaming-primary transition-colors">
            Leaderboard
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-gaming-primary text-gaming-primary hover:bg-gaming-primary hover:text-white">
            Log In
          </Button>
          <Button className="bg-gaming-primary text-white hover:bg-gaming-secondary">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
