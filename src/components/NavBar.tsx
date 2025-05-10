
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-4 px-6 md:px-10 flex items-center justify-between bg-white shadow-sm fixed w-full z-50">
      <Link to="/" className="text-2xl font-bold text-accent-purple flex items-center">
        <img src="/logo.svg" alt="ShopBoost AI" className="h-8 w-8 mr-2" />
        ShopBoost AI
      </Link>

      {/* Mobile menu button */}
      <button 
        className="md:hidden button-hover"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/#features" className="text-gray-600 hover:text-accent-purple transition-colors">
          Features
        </Link>
        <Link to="/#about" className="text-gray-600 hover:text-accent-purple transition-colors">
          About Us
        </Link>
        <Link to="/login">
          <Button variant="outline" className="rounded-full button-hover">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-accent-purple hover:bg-accent-purple-hover rounded-full text-white button-hover">
            Sign Up
          </Button>
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-5 flex flex-col space-y-4 animate-fade-in">
          <Link to="/#features" className="text-gray-600 hover:text-accent-purple transition-colors" onClick={toggleMenu}>
            Features
          </Link>
          <Link to="/#about" className="text-gray-600 hover:text-accent-purple transition-colors" onClick={toggleMenu}>
            About Us
          </Link>
          <Link to="/login" onClick={toggleMenu}>
            <Button variant="outline" className="w-full rounded-full">
              Login
            </Button>
          </Link>
          <Link to="/signup" onClick={toggleMenu}>
            <Button className="w-full bg-accent-purple hover:bg-accent-purple-hover rounded-full text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
