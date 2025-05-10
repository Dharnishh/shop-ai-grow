
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-10 px-6 md:px-10 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-accent-purple flex items-center">
              <img src="/logo.svg" alt="ShopBoost AI" className="h-8 w-8 mr-2" />
              ShopBoost AI
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Empowering local shops with AI-powered tools to grow their social media presence and increase sales.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#features" className="text-gray-600 hover:text-accent-purple transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-600 hover:text-accent-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-accent-purple transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-accent-purple transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-accent-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-accent-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-accent-purple transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ShopBoost AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
