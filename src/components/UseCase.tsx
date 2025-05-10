
import React from "react";
import { Check } from "lucide-react";

const UseCase: React.FC = () => {
  const benefits = [
    "Save time with automated social media scheduling",
    "Create professional content with easy-to-use editing tools",
    "Generate engaging captions and content with AI",
    "Understand your competitors and stand out",
    "Track your performance and grow your audience"
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Perfect for Local Businesses
            </h2>
            <p className="text-gray-600 mb-8">
              ShopBoost AI is designed specifically for local businesses looking to grow their
              online presence without needing specialized marketing skills or a big team.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-accent-purple rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e" 
              alt="Local shop owner using ShopBoost AI" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCase;
