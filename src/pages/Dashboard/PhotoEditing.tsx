import React, { useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Shuffle,
  Settings,
  Copy,
  Search
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TemplateGallery, { Template } from "@/components/Dashboard/TemplateGallery";

const PhotoEditing: React.FC = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState<Template | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  
  // Enhanced state for customization with proper functionality
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [temperature, setTemperature] = useState<number>(0);
  const [textElements, setTextElements] = useState<Array<{id: string, text: string, x: number, y: number, fontSize: number, color: string}>>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  
  // Template categories
  const categories = ["All", "Social Media", "Business", "Personal", "Promotional"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filters = [
    { id: "original", name: "Original", class: "", filterCSS: "" },
    { id: "grayscale", name: "B&W", class: "grayscale", filterCSS: "grayscale(1)" },
    { id: "sepia", name: "Sepia", class: "sepia", filterCSS: "sepia(1)" },
    { id: "saturate", name: "Vibrant", class: "saturate-200", filterCSS: "saturate(2)" },
    { id: "contrast", name: "Contrast", class: "contrast-125", filterCSS: "contrast(1.25)" },
    { id: "brightness", name: "Bright", class: "brightness-125", filterCSS: "brightness(1.25)" },
    { id: "blur", name: "Blur", class: "blur-sm", filterCSS: "blur(2px)" },
    { id: "hue", name: "Color Shift", class: "hue-rotate-90", filterCSS: "hue-rotate(90deg)" }
  ];

  // Photo editing templates
  const templates: Template[] = [
    {
      id: "1",
      title: "Instagram Post",
      category: "Social Media",
      dimensions: "1080 x 1080px",
      thumbnail: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=500&h=500&auto=format&fit=crop",
      type: "photo",
      description: "Perfect square format for Instagram feed"
    },
    {
      id: "2",
      title: "Instagram Story",
      category: "Social Media",
      dimensions: "1080 x 1920px",
      thumbnail: "https://images.unsplash.com/photo-1557053815-9f79f70c7980?w=500&h=800&auto=format&fit=crop",
      type: "photo",
      description: "Vertical format for Instagram stories"
    },
    {
      id: "3",
      title: "Facebook Post",
      category: "Social Media",
      dimensions: "1200 x 630px",
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&auto=format&fit=crop",
      type: "photo",
      description: "Optimized for Facebook timeline"
    },
    {
      id: "4",
      title: "Twitter Post",
      category: "Social Media",
      dimensions: "1200 x 675px",
      thumbnail: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=500&h=280&auto=format&fit=crop",
      type: "photo",
      description: "Best size for Twitter feed visibility"
    },
    {
      id: "5",
      title: "Product Banner",
      category: "Business",
      dimensions: "1200 x 300px",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=125&auto=format&fit=crop",
      type: "photo",
      description: "Wide banner for product showcases"
    },
    {
      id: "6",
      title: "Sale Promotion",
      category: "Promotional",
      dimensions: "800 x 800px",
      thumbnail: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&h=500&auto=format&fit=crop",
      type: "photo",
      description: "Eye-catching design for sales and promotions"
    },
    {
      id: "7",
      title: "LinkedIn Cover",
      category: "Business",
      dimensions: "1584 x 396px",
      thumbnail: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?w=500&h=125&auto=format&fit=crop",
      type: "photo",
      description: "Professional cover for LinkedIn profiles"
    },
    {
      id: "8",
      title: "Pinterest Pin",
      category: "Social Media",
      dimensions: "1000 x 1500px",
      thumbnail: "https://images.unsplash.com/photo-1515941677897-0f7012d1e22e?w=500&h=750&auto=format&fit=crop",
      type: "photo",
      description: "Vertical format optimized for Pinterest"
    }
  ];
  
  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFilter("original");
      setEditingMode(true);
      
      // Reset all adjustments
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
      setTemperature(0);
      setTextElements([]);
      
      toast({
        title: "Image Uploaded Successfully",
        description: "Your image is ready for editing. Use the tools on the right to customize it."
      });
    }
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    
    toast({
      title: "Template Selected",
      description: `You selected the ${template?.title} template`
    });
  };
  
  const handleUseTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (template) {
      setCustomTemplate(template);
      setEditingMode(true);
      
      // Load template with sample image
      setSelectedImage(template.thumbnail);
      setSelectedFilter("original");
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
      setTemperature(0);
      setTextElements([]);
      
      toast({
        title: "Template Loaded Successfully",
        description: "Template loaded! You can now customize it with your own content."
      });
    }
  };
  
  const handleCreateCopy = () => {
    toast({
      title: "Template Duplicated",
      description: "A copy of this template has been created for customization"
    });
  };
  
  const handleSaveTemplate = () => {
    if (!selectedImage) {
      toast({
        title: "No Image to Save",
        description: "Please upload an image or select a template first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Template Saved Successfully",
      description: "Your customized template has been saved to your library"
    });
  };
  
  const handleExport = () => {
    if (!selectedImage) {
      toast({
        title: "No Image to Export",
        description: "Please upload an image or select a template first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Exporting Image...",
      description: "Your image is being prepared for download"
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your customized image has been successfully exported!"
      });
    }, 1500);
  };

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
    toast({
      title: "Brightness Adjusted",
      description: `Brightness set to ${value[0]}%`
    });
  };

  const handleContrastChange = (value: number[]) => {
    setContrast(value[0]);
    toast({
      title: "Contrast Adjusted",
      description: `Contrast set to ${value[0]}%`
    });
  };

  const handleSaturationChange = (value: number[]) => {
    setSaturation(value[0]);
    toast({
      title: "Saturation Adjusted",
      description: `Saturation set to ${value[0]}%`
    });
  };

  const handleTemperatureChange = (value: number[]) => {
    setTemperature(value[0]);
    toast({
      title: "Temperature Adjusted",
      description: `Color temperature set to ${value[0]}%`
    });
  };
  
  const handleAddText = (textType: string) => {
    const newText = {
      id: Date.now().toString(),
      text: textType === "heading" ? "New Heading" : textType === "subheading" ? "New Subheading" : "New Text",
      x: 50,
      y: textType === "heading" ? 20 : textType === "subheading" ? 40 : 60,
      fontSize: textType === "heading" ? 32 : textType === "subheading" ? 24 : 16,
      color: "#ffffff"
    };
    
    setTextElements([...textElements, newText]);
    setSelectedElement(newText.id);
    
    toast({
      title: "Text Added",
      description: `${textType.charAt(0).toUpperCase() + textType.slice(1)} text added to your image. Click on it to edit.`
    });
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    const filter = filters.find(f => f.id === filterId);
    
    toast({
      title: "Filter Applied",
      description: `${filter?.name} filter applied to your image`
    });
  };

  const updateTextElement = (id: string, updates: Partial<typeof textElements[0]>) => {
    setTextElements(prev => 
      prev.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  const removeTextElement = (id: string) => {
    setTextElements(prev => prev.filter(element => element.id !== id));
    setSelectedElement(null);
    toast({
      title: "Text Removed",
      description: "Text element has been removed from your image"
    });
  };

  // Generate CSS filter string
  const getImageFilters = () => {
    const selectedFilterObj = filters.find(f => f.id === selectedFilter);
    const baseFilter = selectedFilterObj?.filterCSS || "";
    const adjustmentFilters = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${temperature}deg)`;
    return baseFilter ? `${baseFilter} ${adjustmentFilters}` : adjustmentFilters;
  };

  return (
    <DashboardLayout pageTitle="Photo Editing">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Photo Editing Studio</h2>
        <p className="text-gray-600">Create stunning visuals for your social media posts with full customization.</p>
      </div>
      
      <Tabs defaultValue={editingMode ? "editor" : "templates"} onValueChange={(value) => {
        if (value === "templates") {
          setEditingMode(false);
        }
      }}>
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="editor" disabled={!editingMode && !selectedTemplate}>Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Select a pre-designed template or start from scratch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    className="w-[250px] pl-8"
                  />
                </div>
              </div>
              
              <TemplateGallery 
                templates={filteredTemplates}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleSelectTemplate}
                type="photo"
              />
              
              <div className="mt-6 flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Custom Size
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Custom Image</DialogTitle>
                      <DialogDescription>
                        Set your desired dimensions for a custom image project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Width (px)</label>
                          <Input type="number" defaultValue={1200} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Height (px)</label>
                          <Input type="number" defaultValue={800} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preset</label>
                        <Select defaultValue="3:2">
                          <SelectTrigger>
                            <SelectValue placeholder="Select aspect ratio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1:1">1:1 (Square)</SelectItem>
                            <SelectItem value="4:3">4:3 (Classic)</SelectItem>
                            <SelectItem value="3:2">3:2 (Standard)</SelectItem>
                            <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Resolution</label>
                        <Select defaultValue="300">
                          <SelectTrigger>
                            <SelectValue placeholder="Select resolution" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="72">72 DPI (Web)</SelectItem>
                            <SelectItem value="150">150 DPI (Medium)</SelectItem>
                            <SelectItem value="300">300 DPI (Print)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={() => {
                        setEditingMode(true);
                        setCustomTemplate(null);
                        toast({
                          title: "Custom Project Created",
                          description: "You can now start editing your custom image"
                        });
                      }}>
                        Create Project
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline">
                  <ImagePlus className="h-4 w-4 mr-2" />
                  <label htmlFor="upload-new" className="cursor-pointer">
                    Upload Image
                    <input 
                      id="upload-new" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>
                
                <Button disabled={!selectedTemplate} onClick={handleUseTemplate}>
                  <Filter className="h-4 w-4 mr-2" />
                  Use Selected Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar with design elements */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Design Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search elements..." 
                      className="w-full p-2 border rounded-md text-sm"
                    />
                  </div>
                  
                  <Tabs defaultValue="shapes">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="shapes" className="text-xs">Shapes</TabsTrigger>
                      <TabsTrigger value="stickers" className="text-xs">Stickers</TabsTrigger>
                      <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="shapes" className="pt-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300">
                          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300">
                          <div className="w-8 h-8 bg-gray-400"></div>
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300">
                          <div className="w-8 h-8 bg-gray-400 rounded-md"></div>
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300">
                          <div className="w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-transparent border-b-gray-400"></div>
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300">
                          <div className="w-8 h-8 bg-gray-400 rounded-[50%_50%_50%_0%]"></div>
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300">
                          <div className="w-8 h-6 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="stickers" className="pt-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          🎉
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          ⭐
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          🔥
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          ❤️
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          👍
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          🎯
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          🎨
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          🗓️
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-300">
                          📊
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="text" className="pt-4">
                      <div className="space-y-2">
                        <div 
                          className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100"
                          onClick={() => handleAddText("heading")}
                        >
                          <p className="text-lg font-bold">Add heading</p>
                        </div>
                        <div 
                          className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100"
                          onClick={() => handleAddText("subheading")}
                        >
                          <p className="text-md">Add subheading</p>
                        </div>
                        <div 
                          className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100"
                          onClick={() => handleAddText("body")}
                        >
                          <p className="text-sm">Add body text</p>
                        </div>
                        <div 
                          className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100"
                          onClick={() => handleAddText("caption")}
                        >
                          <p className="text-sm italic">Add caption</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Add More Assets
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main editing area with functional preview */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3 flex flex-row justify-between items-center">
                  <CardTitle>Editor</CardTitle>
                  {customTemplate && (
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 mr-2">Template:</span>
                      <Badge variant="accent">{customTemplate.title}</Badge>
                      <Button variant="ghost" size="icon" onClick={handleCreateCopy}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  {selectedImage ? (
                    <>
                      <div className="flex-grow relative bg-[#f0f0f0] rounded-md flex items-center justify-center overflow-hidden">
                        <div className="relative">
                          <img 
                            src={selectedImage} 
                            alt="Editing preview" 
                            className="max-h-full max-w-full object-contain"
                            style={{
                              filter: getImageFilters()
                            }}
                          />
                          
                          {/* Functional text overlays */}
                          {textElements.map((textElement) => (
                            <div
                              key={textElement.id}
                              className={`absolute cursor-pointer ${selectedElement === textElement.id ? 'ring-2 ring-blue-500' : ''}`}
                              style={{
                                left: `${textElement.x}%`,
                                top: `${textElement.y}%`,
                                fontSize: `${textElement.fontSize}px`,
                                color: textElement.color,
                                fontWeight: textElement.fontSize > 24 ? 'bold' : 'normal',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                transform: 'translate(-50%, -50%)'
                              }}
                              onClick={() => setSelectedElement(textElement.id)}
                            >
                              {textElement.text}
                            </div>
                          ))}
                        </div>
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => {
                              setSelectedImage(null);
                              setTextElements([]);
                              setSelectedElement(null);
                              setEditingMode(false);
                              toast({
                                title: "Image Removed",
                                description: "Image has been removed from the editor"
                              });
                            }}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            <span>Delete</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <label htmlFor="upload" className="cursor-pointer flex items-center">
                              <ImagePlus className="h-4 w-4 mr-1" />
                              <span>New</span>
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
                      </div>
                    </>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 rounded-md border-2 border-dashed border-gray-300 p-8">
                      <ImagePlus className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-4 text-center">
                        Upload an image to start editing or select a template from the gallery.
                      </p>
                      <Button>
                        <label htmlFor="upload-main" className="cursor-pointer">
                          Upload Image
                          <input 
                            id="upload-main" 
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
            
            {/* Right sidebar with functional editing tools */}
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
                        <span>Effects</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="filters" className="pt-4">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {filters.map(filter => (
                          <div 
                            key={filter.id}
                            className={`cursor-pointer p-1 border rounded-md text-center ${selectedFilter === filter.id ? 'border-purple-600 bg-purple-50' : ''}`}
                            onClick={() => handleFilterSelect(filter.id)}
                          >
                            <div className="h-14 bg-gray-200 rounded mb-1 overflow-hidden">
                              {selectedImage ? (
                                <img 
                                  src={selectedImage} 
                                  alt={filter.name} 
                                  className="h-full w-full object-cover"
                                  style={{ filter: filter.filterCSS }}
                                />
                              ) : (
                                <div 
                                  className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-200"
                                  style={{ filter: filter.filterCSS }}
                                ></div>
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
                          <span className="text-xs">{brightness}%</span>
                        </div>
                        <Slider 
                          value={[brightness]} 
                          min={0}
                          max={200} 
                          step={1} 
                          onValueChange={handleBrightnessChange}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Contrast</label>
                          <span className="text-xs">{contrast}%</span>
                        </div>
                        <Slider 
                          value={[contrast]} 
                          min={0}
                          max={200} 
                          step={1} 
                          onValueChange={handleContrastChange}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Saturation</label>
                          <span className="text-xs">{saturation}%</span>
                        </div>
                        <Slider 
                          value={[saturation]} 
                          min={0}
                          max={200} 
                          step={1} 
                          onValueChange={handleSaturationChange}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Temperature</label>
                          <span className="text-xs">{temperature}°</span>
                        </div>
                        <Slider 
                          value={[temperature]} 
                          min={-180}
                          max={180} 
                          step={1} 
                          onValueChange={handleTemperatureChange}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="text" className="pt-4">
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => handleAddText("heading")}
                          disabled={!selectedImage}
                        >
                          <span>Add heading</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => handleAddText("subheading")}
                          disabled={!selectedImage}
                        >
                          <span>Add subheading</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => handleAddText("body")}
                          disabled={!selectedImage}
                        >
                          <span>Add body text</span>
                        </Button>
                      </div>
                      
                      {selectedElement && (
                        <div className="mt-4 space-y-2">
                          <label className="text-sm font-medium">Edit Selected Text</label>
                          <Input 
                            value={textElements.find(t => t.id === selectedElement)?.text || ""} 
                            onChange={(e) => updateTextElement(selectedElement, { text: e.target.value })} 
                          />
                          <div className="flex space-x-2">
                            <Input 
                              type="color"
                              value={textElements.find(t => t.id === selectedElement)?.color || "#ffffff"}
                              onChange={(e) => updateTextElement(selectedElement, { color: e.target.value })}
                              className="w-16 h-8"
                            />
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeTextElement(selectedElement)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Text styles</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm font-bold">Bold</p>
                          </div>
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm italic">Italic</p>
                          </div>
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm underline">Underline</p>
                          </div>
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
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
                    <Button variant="outline" disabled={!selectedImage} onClick={handleSaveTemplate}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Template
                    </Button>
                    <Button disabled={!selectedImage} onClick={handleExport} className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default PhotoEditing;
