
import React, { useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  FileVideo, 
  Scissors, 
  Type, 
  Music, 
  Image, 
  Save, 
  PlaySquare,
  Plus,
  Search
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const VideoEditing: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Template categories
  const categories = ["All", "Business", "Story", "Promo", "Social Media"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Sample templates
  const templates = [
    { id: "1", title: "Product Showcase", category: "Business", thumbnail: "https://images.unsplash.com/photo-1516876437184-593fda40c8ce?w=500&h=280&auto=format&fit=crop" },
    { id: "2", title: "Fashion Sale", category: "Promo", thumbnail: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=280&auto=format&fit=crop" },
    { id: "3", title: "Instagram Story", category: "Story", thumbnail: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500&h=280&auto=format&fit=crop" },
    { id: "4", title: "Restaurant Menu", category: "Business", thumbnail: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500&h=280&auto=format&fit=crop" },
    { id: "5", title: "Summer Collection", category: "Social Media", thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=280&auto=format&fit=crop" },
    { id: "6", title: "Service Overview", category: "Business", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=280&auto=format&fit=crop" },
  ];
  
  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);
  
  // Sample timeline elements
  const timelineElements = [
    { id: "1", type: "video", name: "Intro.mp4", duration: "0:05" },
    { id: "2", type: "text", name: "Title Text", duration: "0:03" },
    { id: "3", type: "video", name: "Product Demo.mp4", duration: "0:12" },
    { id: "4", type: "image", name: "Product Image.jpg", duration: "0:04" },
    { id: "5", type: "video", name: "Testimonial.mp4", duration: "0:08" },
    { id: "6", type: "text", name: "Call to Action", duration: "0:03" },
  ];
  
  return (
    <DashboardLayout pageTitle="Video Editing">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Video Editing Studio</h2>
        <p className="text-gray-600">Create professional videos for your social media and marketing.</p>
      </div>
      
      <Tabs defaultValue="templates">
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="editor">Video Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Choose a Template</CardTitle>
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${selectedTemplate === template.id ? 'ring-2 ring-accent-purple' : ''}`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="relative aspect-video">
                      <img 
                        src={template.thumbnail} 
                        alt={template.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PlaySquare className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{template.title}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Load More
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <FileVideo className="h-4 w-4 mr-2" />
              Start from Scratch
            </Button>
            <Button disabled={!selectedTemplate}>
              <PlaySquare className="h-4 w-4 mr-2" />
              Use Selected Template
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar with assets */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Media Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="videos">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="videos" className="text-xs">
                        <FileVideo className="h-4 w-4 mr-1" />
                        Videos
                      </TabsTrigger>
                      <TabsTrigger value="images" className="text-xs">
                        <Image className="h-4 w-4 mr-1" />
                        Images
                      </TabsTrigger>
                      <TabsTrigger value="audio" className="text-xs">
                        <Music className="h-4 w-4 mr-1" />
                        Audio
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="videos" className="pt-4">
                      <div className="space-y-2">
                        <div className="p-3 border rounded-md flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                            <FileVideo className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">intro_clip.mp4</p>
                            <p className="text-xs text-gray-500">00:12 • 720p</p>
                          </div>
                        </div>
                        <div className="p-3 border rounded-md flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                            <FileVideo className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">product_demo.mp4</p>
                            <p className="text-xs text-gray-500">00:25 • 1080p</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Video
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="images" className="pt-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Images
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="audio" className="pt-4">
                      <div className="space-y-2">
                        <div className="p-3 border rounded-md flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                            <Music className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">background_music.mp3</p>
                            <p className="text-xs text-gray-500">01:42</p>
                          </div>
                        </div>
                        <div className="p-3 border rounded-md flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                            <Music className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">voice_over.mp3</p>
                            <p className="text-xs text-gray-500">00:35</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Audio
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Main preview area */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="flex-grow bg-black rounded-md flex items-center justify-center">
                    <Video className="h-16 w-16 text-white opacity-20" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rewind">
                          <polygon points="11 19 2 12 11 5 11 19"></polygon>
                          <polygon points="22 19 13 12 22 5 22 19"></polygon>
                        </svg>
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-fast-forward">
                          <polygon points="13 19 22 12 13 5 13 19"></polygon>
                          <polygon points="2 19 11 12 2 5 2 19"></polygon>
                        </svg>
                      </Button>
                    </div>
                    <div className="text-sm">
                      00:00 / 00:35
                    </div>
                  </div>
                  <div className="mt-4">
                    <Slider defaultValue={[0]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right sidebar with editing tools */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Editing Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="trim">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="trim" className="text-xs">
                        <Scissors className="h-4 w-4 mb-1" />
                        <span>Trim</span>
                      </TabsTrigger>
                      <TabsTrigger value="text" className="text-xs">
                        <Type className="h-4 w-4 mb-1" />
                        <span>Text</span>
                      </TabsTrigger>
                      <TabsTrigger value="music" className="text-xs">
                        <Music className="h-4 w-4 mb-1" />
                        <span>Audio</span>
                      </TabsTrigger>
                      <TabsTrigger value="effects" className="text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-4 w-4 mb-1">
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                          <path d="M5 3v4"></path>
                          <path d="M19 17v4"></path>
                          <path d="M3 5h4"></path>
                          <path d="M17 19h4"></path>
                        </svg>
                        <span>Effects</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="trim" className="pt-4 space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Start Time</label>
                          <span className="text-xs">00:00</span>
                        </div>
                        <Slider defaultValue={[0]} max={100} step={1} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">End Time</label>
                          <span className="text-xs">00:35</span>
                        </div>
                        <Slider defaultValue={[100]} max={100} step={1} />
                      </div>
                      
                      <div>
                        <Button variant="outline" className="w-full">
                          <Scissors className="h-4 w-4 mr-2" />
                          Split Clip
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="text" className="pt-4">
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <span>Add title</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <span>Add subtitle</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <span>Add call to action</span>
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Text animations</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Fade In</p>
                          </div>
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Slide Up</p>
                          </div>
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Pop</p>
                          </div>
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Bounce</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="music" className="pt-4 space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Music Volume</label>
                          <span className="text-xs">50%</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Voice Volume</label>
                          <span className="text-xs">80%</span>
                        </div>
                        <Slider defaultValue={[80]} max={100} step={1} />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Background Music</h4>
                        <div className="space-y-2">
                          <div className="p-2 border rounded-md flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <Music className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-sm">Upbeat Pop</span>
                          </div>
                          <div className="p-2 border rounded-md flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <Music className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-sm">Corporate</span>
                          </div>
                          <div className="p-2 border rounded-md flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <Music className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-sm">Inspirational</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="effects" className="pt-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Transitions</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Fade</p>
                          </div>
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Dissolve</p>
                          </div>
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Slide</p>
                          </div>
                          <div className="p-2 border rounded-md text-center">
                            <p className="text-sm">Wipe</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Filters</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="aspect-square bg-gray-200 rounded-md"></div>
                          <div className="aspect-square bg-gray-300 rounded-md"></div>
                          <div className="aspect-square bg-gray-400 rounded-md"></div>
                          <div className="aspect-square bg-gray-500 rounded-md"></div>
                          <div className="aspect-square bg-gray-600 rounded-md"></div>
                          <div className="aspect-square bg-gray-700 rounded-md"></div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="pt-6 flex justify-between">
                    <Button variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button>
                      Export Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <div className="min-w-full">
                  <div className="h-8 mb-1 flex border-b">
                    <div className="w-40 flex-shrink-0 border-r px-2 font-medium text-sm flex items-center">
                      Elements
                    </div>
                    <div className="flex-grow relative">
                      {/* Time markers */}
                      <div className="absolute inset-0 flex">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="flex-1 border-r text-xs text-gray-500 flex items-center justify-end pr-1">
                            {i * 5}s
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline rows */}
                  {timelineElements.map((element) => (
                    <div key={element.id} className="h-12 flex mb-1 group hover:bg-gray-50">
                      <div className="w-40 flex-shrink-0 border-r px-2 flex items-center">
                        <div className="w-6 h-6 rounded flex items-center justify-center mr-2 bg-gray-100">
                          {element.type === 'video' && <FileVideo className="h-3 w-3" />}
                          {element.type === 'image' && <Image className="h-3 w-3" />}
                          {element.type === 'text' && <Type className="h-3 w-3" />}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm truncate">{element.name}</p>
                        </div>
                      </div>
                      <div className="flex-grow relative">
                        {/* Element block */}
                        <div 
                          className={`absolute h-8 top-2 rounded ${
                            element.type === 'video' ? 'bg-blue-100 border-blue-200' : 
                            element.type === 'text' ? 'bg-green-100 border-green-200' : 
                            'bg-purple-100 border-purple-200'
                          } border flex items-center px-2 cursor-pointer group-hover:ring-1 ring-gray-400`}
                          style={{ 
                            left: '10%', 
                            width: element.type === 'video' ? '25%' : '15%'
                          }}
                        >
                          <span className="text-xs truncate">{element.name}</span>
                          <span className="ml-auto text-xs opacity-70">{element.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add element row */}
                  <div className="h-12 flex items-center justify-center border-t border-dashed">
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Element
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default VideoEditing;
