
import React from "react";
import PageLayout from "@/components/PageLayout";
import { MessageCircle, Image, Video, Hash, Calendar, BarChart, FileText } from "lucide-react";

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  bgColor = "bg-soft-blue" 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  bgColor?: string;
}) => {
  return (
    <div className="feature-card">
      <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Caption Generator",
      description: "AI-powered caption creation for your social media posts. Get engaging, relevant captions in seconds.",
      icon: <MessageCircle className="text-blue-600" size={24} />,
      bgColor: "bg-soft-blue"
    },
    {
      title: "Content Ideas",
      description: "Never run out of content ideas. Our AI suggests trending topics relevant to your business.",
      icon: <FileText className="text-purple-600" size={24} />,
      bgColor: "bg-purple-100"
    },
    {
      title: "Hashtag Finder",
      description: "Discover the most effective hashtags to increase your posts' reach and engagement.",
      icon: <Hash className="text-green-600" size={24} />,
      bgColor: "bg-soft-green"
    },
    {
      title: "Post Templates",
      description: "Beautiful, customizable templates for all social media platforms. Stand out with professional designs.",
      icon: <Image className="text-pink-600" size={24} />,
      bgColor: "bg-pink-100"
    },
    {
      title: "Auto-Schedule Posts",
      description: "Plan and schedule your content calendar ahead of time. Post at optimal times for maximum engagement.",
      icon: <Calendar className="text-orange-600" size={24} />,
      bgColor: "bg-orange-100"
    },
    {
      title: "Analytics",
      description: "In-depth analytics to track your social media performance, growth, and audience engagement.",
      icon: <BarChart className="text-blue-800" size={24} />,
      bgColor: "bg-blue-100"
    },
    {
      title: "AI Video Editor",
      description: "Edit videos easily with our AI-powered tools. Add effects, transitions, and more with ease.",
      icon: <Video className="text-indigo-600" size={24} />,
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Powerful Features for Your Social Media Success
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            ShopBoost AI provides all the tools you need to grow your social media presence 
            and boost your sales with AI-powered solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard 
                title={feature.title} 
                description={feature.description}
                icon={feature.icon}
                bgColor={feature.bgColor}
              />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Features;
