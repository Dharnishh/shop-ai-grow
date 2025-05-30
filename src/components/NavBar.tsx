
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/features" className="text-gray-600 hover:text-accent-purple transition-colors">
                Features
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-600 hover:text-accent-purple">
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <ListItem to="/ai-tools" title="AI Content Tools">
                    Generate captions, find hashtags, and create engaging content
                  </ListItem>
                  <ListItem to="/competitor-analysis" title="Competitor Analysis">
                    Track and analyze your competitors' performance
                  </ListItem>
                  <ListItem to="/features" title="Post Scheduling">
                    Schedule and automate your social media posting
                  </ListItem>
                  <ListItem to="/features" title="Analytics Dashboard">
                    Track your growth and engagement metrics
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-600 hover:text-accent-purple">
                Company
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px]">
                  <ListItem to="/about" title="About Us">
                    Learn about our mission and team
                  </ListItem>
                  <ListItem to="/contact" title="Contact Us">
                    Get in touch with our support team
                  </ListItem>
                  <ListItem to="/terms" title="Terms of Service">
                    Read our terms and conditions
                  </ListItem>
                  <ListItem to="/privacy" title="Privacy Policy">
                    Understand how we protect your data
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
          <Link to="/features" className="text-gray-600 hover:text-accent-purple transition-colors" onClick={toggleMenu}>
            Features
          </Link>
          <Link to="/ai-tools" className="text-gray-600 hover:text-accent-purple transition-colors" onClick={toggleMenu}>
            AI Tools
          </Link>
          <Link to="/competitor-analysis" className="text-gray-600 hover:text-accent-purple transition-colors" onClick={toggleMenu}>
            Competitor Analysis
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-accent-purple transition-colors" onClick={toggleMenu}>
            About Us
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-accent-purple transition-colors" onClick={toggleMenu}>
            Contact
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
