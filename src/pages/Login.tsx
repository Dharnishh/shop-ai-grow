
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/AuthLayout";
import { Google } from "lucide-react";

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for login functionality
    console.log("Login attempt");
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your account"
      authType="login"
    >
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            className="rounded-lg"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm text-accent-purple hover:underline">
              Forgot password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            className="rounded-lg"
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
            Remember me for 30 days
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-accent-purple hover:bg-accent-purple-hover rounded-lg button-hover"
        >
          Log in
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <Button 
          type="button"
          variant="outline" 
          className="w-full rounded-lg button-hover"
        >
          <Google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
