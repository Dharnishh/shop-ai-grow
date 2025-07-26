import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-soft-blue via-white to-soft-green py-20 md:py-32 px-6 rounded-b-3xl text-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-purple opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-soft-blue opacity-40 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-blue-600">
          Grow Your Local Shop with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Boost your social media presence and increase sales with our
          AI-powered tools designed specifically for local businesses.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button className="bg-accent-purple hover:bg-accent-purple-hover text-white rounded-full text-lg px-8 py-6 button-hover">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/#features">
            <Button variant="outline" className="rounded-full text-lg px-8 py-6 border-gray-300 button-hover">
              See Features
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;