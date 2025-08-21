import React from "react";
import { 
  CalendarDays, 
  Image, 
  Video, 
  MessageCircle, 
  BarChart 
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const features: Feature[] = [
  {
    title: "Auto Schedule Posts",
    description: "Schedule your social media posts in advance with our easy-to-use calendar interface.",
    icon: <CalendarDays size={32} />,
    color: "bg-blue-100 text-blue-600",
    delay: 100
  },
  {
    title: "AI Content Tools",
    description: "Generate engaging captions and content ideas with our AI-powered tools.",
    icon: <MessageCircle size={32} />,
    color: "bg-purple-100 text-purple-600",
    delay: 200
  },
  {
    title: "Photo Editing",
    description: "Edit your photos with our simple tools designed for social media.",
    icon: <Image size={32} />,
    color: "bg-green-100 text-green-600",
    delay: 300
  },
  {
    title: "Video Editing",
    description: "Create engaging video content for Reels, Stories, and more.",
    icon: <Video size={32} />,
    color: "bg-orange-100 text-orange-600",
    delay: 400
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All-in-One Platform for Local Shops
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to grow your social media presence and increase sales, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card" 
              style={{animationDelay: `${feature.delay}ms`}}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;