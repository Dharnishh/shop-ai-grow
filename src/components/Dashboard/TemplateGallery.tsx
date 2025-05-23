
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaySquare, Eye } from "lucide-react";

export interface Template {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  dimensions?: string;
  type: "photo" | "video";
  description?: string;
}

interface TemplateGalleryProps {
  templates: Template[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
  type: "photo" | "video";
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate,
  type
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div 
          key={template.id}
          className={`border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${selectedTemplate === template.id ? 'ring-2 ring-accent-purple' : ''}`}
          onClick={() => onSelectTemplate(template.id)}
        >
          <div className="relative aspect-video">
            <img 
              src={template.thumbnail} 
              alt={template.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              {type === "video" ? (
                <PlaySquare className="h-12 w-12 text-white" />
              ) : (
                <Eye className="h-12 w-12 text-white" />
              )}
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">{template.title}</h3>
              <Badge variant="outline" className="text-xs">
                {template.category}
              </Badge>
            </div>
            {template.dimensions && (
              <p className="text-xs text-gray-500 mt-1">{template.dimensions}</p>
            )}
            {template.description && (
              <p className="text-xs text-gray-500 mt-1 truncate">{template.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;
