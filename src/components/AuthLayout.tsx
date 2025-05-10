
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  authType: "login" | "signup";
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, authType }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold text-accent-purple flex items-center">
              <img src="/logo.svg" alt="ShopBoost AI" className="h-8 w-8 mr-2" />
              ShopBoost AI
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-8">{subtitle}</p>
          
          {children}
          
          <div className="mt-6 text-center">
            {authType === "login" ? (
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-accent-purple hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-accent-purple hover:underline font-medium">
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-soft-blue">
        <div className="h-full w-full flex items-center justify-center p-12">
          <div className="max-w-xl rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={authType === "login" 
                ? "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                : "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
              } 
              alt="ShopBoost AI" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
