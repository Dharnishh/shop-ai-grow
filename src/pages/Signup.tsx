
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/AuthLayout";
import { ExternalLink } from "lucide-react";

const Signup: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for signup functionality
    console.log("Signup attempt");
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Get started with ShopBoost AI"
      authType="signup"
    >
      <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            className="rounded-lg"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              className="rounded-lg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input 
              id="whatsapp" 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              className="rounded-lg"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signupEmail">Email address</Label>
          <Input 
            id="signupEmail" 
            type="email" 
            placeholder="you@example.com" 
            className="rounded-lg"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signupPassword">Password</Label>
          <Input 
            id="signupPassword" 
            type="password" 
            placeholder="Create a strong password" 
            className="rounded-lg"
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="/terms" className="text-accent-purple hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-accent-purple hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-accent-purple hover:bg-accent-purple-hover rounded-lg button-hover"
        >
          Create Account
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-50 px-2 text-gray-500">Or sign up with</span>
          </div>
        </div>
        
        <Button 
          type="button"
          variant="outline" 
          className="w-full rounded-lg button-hover"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Google
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
