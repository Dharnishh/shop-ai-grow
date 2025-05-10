
import React from "react";
import PageLayout from "@/components/PageLayout";
import { MessageCircle, Hash, FileText, Image, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ToolCard = ({ 
  title, 
  description, 
  icon, 
  bgColor, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  bgColor: string;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`${bgColor} p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="bg-white p-3 rounded-full mr-3 shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const AITools: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toolCards = [
    {
      title: "Caption Generator",
      description: "Create engaging captions for your social media posts with AI assistance.",
      icon: <MessageCircle className="text-blue-600" size={24} />,
      bgColor: "bg-blue-100",
      onClick: () => console.log("Caption Generator clicked")
    },
    {
      title: "Content Ideas",
      description: "Get AI-powered content ideas tailored to your business niche and audience.",
      icon: <FileText className="text-purple-600" size={24} />,
      bgColor: "bg-purple-100",
      onClick: () => console.log("Content Ideas clicked")
    },
    {
      title: "Hashtag Finder",
      description: "Discover trending and relevant hashtags to increase your content reach.",
      icon: <Hash className="text-green-600" size={24} />,
      bgColor: "bg-green-100",
      onClick: () => console.log("Hashtag Finder clicked")
    },
    {
      title: "Post Templates",
      description: "Access customizable templates for various social media platforms and occasions.",
      icon: <Image className="text-pink-600" size={24} />,
      bgColor: "bg-pink-100",
      onClick: () => console.log("Post Templates clicked")
    }
  ];

  const filteredTools = searchTerm 
    ? toolCards.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : toolCards;

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">AI Content Tools</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Create better content faster with our AI-powered tools designed to boost your social media presence.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search tools..."
              className="pl-10 rounded-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTools.map((tool, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                bgColor={tool.bgColor}
                onClick={tool.onClick}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-soft-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Select a Tool</h3>
              <p className="text-gray-600">Choose from our selection of AI-powered tools designed for specific content needs.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-soft-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Input Your Details</h3>
              <p className="text-gray-600">Provide information about your business, target audience, and content goals.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Get AI-Generated Results</h3>
              <p className="text-gray-600">Receive tailored content suggestions, captions, hashtags, or templates in seconds.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Button 
              className="bg-accent-purple hover:bg-accent-purple-hover rounded-lg px-6 py-5 button-hover"
            >
              Explore All Features
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AITools;
