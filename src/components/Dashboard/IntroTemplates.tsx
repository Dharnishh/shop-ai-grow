
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Users, Zap, Sparkles, Rocket } from 'lucide-react';

export interface IntroTemplate {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

interface IntroTemplatesProps {
  onSelectTemplate: (template: IntroTemplate) => void;
}

const IntroTemplates: React.FC<IntroTemplatesProps> = ({ onSelectTemplate }) => {
  const introTemplates: IntroTemplate[] = [
    {
      id: 'corporate-intro',
      title: 'Corporate Introduction',
      description: 'Professional business intro with elegant transitions',
      duration: '10s',
      category: 'Business',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&auto=format&fit=crop',
      features: ['Text animations', 'Logo reveal', 'Professional transitions'],
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-500'
    },
    {
      id: 'tech-startup',
      title: 'Tech Startup Intro',
      description: 'Modern tech-focused intro with dynamic effects',
      duration: '8s',
      category: 'Technology',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&auto=format&fit=crop',
      features: ['Glitch effects', 'Code animations', 'Futuristic design'],
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-purple-500'
    },
    {
      id: 'creative-agency',
      title: 'Creative Agency Intro',
      description: 'Artistic intro with colorful animations',
      duration: '12s',
      category: 'Creative',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&auto=format&fit=crop',
      features: ['Color explosions', 'Creative transitions', 'Art-focused'],
      icon: <Sparkles className="h-5 w-5" />,
      color: 'bg-pink-500'
    },
    {
      id: 'product-launch',
      title: 'Product Launch Intro',
      description: 'High-energy intro perfect for product reveals',
      duration: '15s',
      category: 'Marketing',
      thumbnail: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=225&auto=format&fit=crop',
      features: ['Product showcase', 'Dynamic reveals', 'Marketing focus'],
      icon: <Rocket className="h-5 w-5" />,
      color: 'bg-green-500'
    },
    {
      id: 'minimalist-intro',
      title: 'Minimalist Intro',
      description: 'Clean and simple intro with subtle animations',
      duration: '6s',
      category: 'Minimal',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=225&auto=format&fit=crop',
      features: ['Clean design', 'Subtle animations', 'Typography focus'],
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Your Intro Template</h3>
        <p className="text-gray-600">Select a pre-designed intro template to customize with your content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {introTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              <img 
                src={template.thumbnail} 
                alt={template.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-12 w-12 text-white" />
              </div>
              <div className={`absolute top-2 left-2 ${template.color} text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs`}>
                {template.icon}
                {template.duration}
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{template.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
              <CardDescription className="text-xs">{template.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => onSelectTemplate(template)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Use This Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntroTemplates;
