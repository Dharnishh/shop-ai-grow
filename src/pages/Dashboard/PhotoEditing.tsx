
import React, { useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ImagePlus, 
  Crop, 
  Filter, 
  Type, 
  Sticker, 
  Save, 
  Download,
  Trash,
  ZoomIn,
  ZoomOut,
  Shuffle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const PhotoEditing: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = [
    { id: "original", name: "Original", class: "" },
    { id: "grayscale", name: "B&W", class: "grayscale" },
    { id: "sepia", name: "Sepia", class: "sepia" },
    { id: "saturate", name: "Vibrant", class: "saturate-200" },
    { id: "contrast", name: "Contrast", class: "contrast-125" },
    { id: "brightness", name: "Bright", class: "brightness-125" },
    { id: "blur", name: "Blur", class: "blur-sm" },
    { id: "hue", name: "Color Shift", class: "hue-rotate-90" }
  ];

  const templates = [
    { id: 1, name: "Instagram Post", dimensions: "1080 x 1080px", category: "Social" },
    { id: 2, name: "Instagram Story", dimensions: "1080 x 1920px", category: "Social" },
    { id: 3, name: "Facebook Post", dimensions: "1200 x 630px", category: "Social" },
    { id: 4, name: "Twitter Post", dimensions: "1200 x 675px", category: "Social" },
    { id: 5, name: "Product Banner", dimensions: "1200 x 300px", category: "Business" },
    { id: 6, name: "Sale Promotion", dimensions: "800 x 800px", category: "Business" }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setSelectedFilter(null); // Reset filter when new image is uploaded
    }
  };

  return (
    <DashboardLayout pageTitle="Photo Editing">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Photo Editing Studio</h2>
        <p className="text-gray-600">Create stunning visuals for your social media posts.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar with templates */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Search templates..." 
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {templates.map(template => (
                  <div 
                    key={template.id} 
                    className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{template.name}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{template.dimensions}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Custom Size
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main editing area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle>Editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              {selectedImage ? (
                <>
                  <div className="flex-grow relative bg-[#f0f0f0] rounded-md flex items-center justify-center overflow-hidden">
                    <img 
                      src={selectedImage} 
                      alt="Editing preview" 
                      className={`max-h-full max-w-full object-contain ${selectedFilter ? filters.find(f => f.id === selectedFilter)?.class : ""}`}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ZoomOut className="h-4 w-4 mr-1" />
                        <span>Zoom</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Shuffle className="h-4 w-4 mr-1" />
                        <span>Rotate</span>
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash className="h-4 w-4 mr-1" />
                        <span>Delete</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <label htmlFor="upload-new" className="cursor-pointer flex items-center">
                          <ImagePlus className="h-4 w-4 mr-1" />
                          <span>New</span>
                          <input 
                            id="upload-new" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                          />
                        </label>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 rounded-md border-2 border-dashed border-gray-300 p-8">
                  <ImagePlus className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4 text-center">
                    Upload an image to start editing or select a template from the left.
                  </p>
                  <Button>
                    <label htmlFor="upload" className="cursor-pointer">
                      Upload Image
                      <input 
                        id="upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right sidebar with tools */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Editing Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="filters">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="filters" className="text-xs">
                    <Filter className="h-4 w-4 mb-1" />
                    <span>Filters</span>
                  </TabsTrigger>
                  <TabsTrigger value="adjust" className="text-xs">
                    <Crop className="h-4 w-4 mb-1" />
                    <span>Adjust</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="text-xs">
                    <Type className="h-4 w-4 mb-1" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="elements" className="text-xs">
                    <Sticker className="h-4 w-4 mb-1" />
                    <span>Elements</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="filters" className="pt-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {filters.map(filter => (
                      <div 
                        key={filter.id}
                        className={`cursor-pointer p-1 border rounded-md text-center ${selectedFilter === filter.id ? 'border-accent-purple bg-accent-purple bg-opacity-10' : ''}`}
                        onClick={() => setSelectedFilter(filter.id)}
                      >
                        <div className="h-14 bg-gray-200 rounded mb-1 overflow-hidden">
                          {selectedImage ? (
                            <img 
                              src={selectedImage} 
                              alt={filter.name} 
                              className={`h-full w-full object-cover ${filter.class}`}
                            />
                          ) : (
                            <div className={`h-full w-full bg-gradient-to-br from-gray-300 to-gray-200 ${filter.class}`}></div>
                          )}
                        </div>
                        <span className="text-xs">{filter.name}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="adjust" className="pt-4 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm">Brightness</label>
                      <span className="text-xs">0</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm">Contrast</label>
                      <span className="text-xs">0</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm">Saturation</label>
                      <span className="text-xs">0</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm">Temperature</label>
                      <span className="text-xs">0</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </TabsContent>
                
                <TabsContent value="text" className="pt-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <span>Add heading</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <span>Add subheading</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <span>Add body text</span>
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Text styles</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 border rounded-md text-center">
                        <p className="text-sm font-bold">Bold</p>
                      </div>
                      <div className="p-2 border rounded-md text-center">
                        <p className="text-sm italic">Italic</p>
                      </div>
                      <div className="p-2 border rounded-md text-center">
                        <p className="text-sm underline">Underline</p>
                      </div>
                      <div className="p-2 border rounded-md text-center">
                        <p className="text-sm uppercase">Uppercase</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="elements" className="pt-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Shapes</h4>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400"></div>
                      </div>
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-md"></div>
                      </div>
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-transparent border-b-gray-400"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Stickers</h4>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg">
                        🎉
                      </div>
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg">
                        ⭐
                      </div>
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg">
                        🔥
                      </div>
                      <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg">
                        ❤️
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="pt-6 grid grid-cols-2 gap-2">
                <Button variant="outline" disabled={!selectedImage}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button disabled={!selectedImage} className="bg-accent-purple hover:bg-accent-purple-hover">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PhotoEditing;
