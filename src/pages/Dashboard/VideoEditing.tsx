
import React, { useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Search,
  Download,
  Settings,
  Copy,
  Smile,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TemplateGallery, { Template } from "@/components/Dashboard/TemplateGallery";
import StickerLibrary, { Sticker } from "@/components/Dashboard/StickerLibrary";
import GifLibrary, { GifItem } from "@/components/Dashboard/GifLibrary";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const VideoEditing: React.FC = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState<Template | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [selectedTabInEditor, setSelectedTabInEditor] = useState<string>("trim");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(35);
  const [volume, setVolume] = useState(50);
  
  // Template categories
  const categories = ["All", "Business", "Story", "Promo", "Social Media"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // State for customizations
  const [textTitle, setTextTitle] = useState<string>("");
  const [musicVolume, setMusicVolume] = useState<number>(50);
  const [voiceVolume, setVoiceVolume] = useState<number>(80);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [selectedTransition, setSelectedTransition] = useState<string | null>(null);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(100);
  const [addedStickers, setAddedStickers] = useState<Sticker[]>([]);
  const [addedGifs, setAddedGifs] = useState<GifItem[]>([]);
  
  // Sample templates with descriptions and more options
  const templates: Template[] = [
    { 
      id: "1", 
      title: "Product Showcase", 
      category: "Business", 
      thumbnail: "https://images.unsplash.com/photo-1516876437184-593fda40c8ce?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080p • 16:9",
      type: "video",
      description: "Perfect for displaying products with animated transitions"
    },
    { 
      id: "2", 
      title: "Fashion Sale", 
      category: "Promo", 
      thumbnail: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080p • 9:16",
      type: "video",
      description: "Quick promo template with dynamic text animations"
    },
    { 
      id: "3", 
      title: "Instagram Story", 
      category: "Story", 
      thumbnail: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080x1920",
      type: "video",
      description: "Vertical format perfect for Instagram Stories"
    },
    { 
      id: "4", 
      title: "Restaurant Menu", 
      category: "Business", 
      thumbnail: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080p • 16:9",
      type: "video",
      description: "Showcase restaurant menu items with elegant transitions"
    },
    { 
      id: "5", 
      title: "Summer Collection", 
      category: "Social Media", 
      thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080x1080",
      type: "video",
      description: "Square format video for Instagram feed posts"
    },
    { 
      id: "6", 
      title: "Service Overview", 
      category: "Business", 
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080p • 16:9",
      type: "video",
      description: "Professional template to highlight business services"
    },
    { 
      id: "7", 
      title: "YouTube Tutorial", 
      category: "Social Media", 
      thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080p • 16:9",
      type: "video",
      description: "Tutorial-style template with intro and sections"
    },
    { 
      id: "8", 
      title: "Quick TikTok", 
      category: "Social Media", 
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=280&auto=format&fit=crop",
      dimensions: "1080x1920",
      type: "video",
      description: "Fast-paced vertical video with trending effects"
    },
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
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    
    toast({
      title: "Template Selected",
      description: `You selected the ${template?.title} template`,
    });
  };

  const handleUseTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (template) {
      setCustomTemplate(template);
      setEditingMode(true);
      setVideoPreview(template.thumbnail);
      
      toast({
        title: "Template Loaded",
        description: "You can now customize this template in the editor",
      });
    }
  };

  const handleCreateCopy = () => {
    toast({
      title: "Template Duplicated",
      description: "A copy of this template has been created for customization",
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "Your customized template has been saved",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting Video",
      description: "Your video is being prepared for export",
    });

    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your video has been successfully exported",
      });
    }, 2000);
  };

  const handleAddTitle = () => {
    const newTitle = `Title ${Date.now()}`;
    setTextTitle(newTitle);
    toast({
      title: "Title Added",
      description: "Title has been added to your video",
    });
  };

  const handleMusicVolumeChange = (value: number[]) => {
    setMusicVolume(value[0]);
    toast({
      title: "Music Volume Updated",
      description: `Music volume set to ${value[0]}%`,
    });
  };

  const handleVoiceVolumeChange = (value: number[]) => {
    setVoiceVolume(value[0]);
    toast({
      title: "Voice Volume Updated",
      description: `Voice volume set to ${value[0]}%`,
    });
  };

  const handleTrimStartChange = (value: number[]) => {
    setTrimStart(value[0]);
    if (value[0] >= trimEnd) {
      setTrimEnd(value[0] + 5);
    }
    toast({
      title: "Trim Applied",
      description: `Video trimmed from ${value[0]}% to ${trimEnd}%`,
    });
  };

  const handleTrimEndChange = (value: number[]) => {
    setTrimEnd(value[0]);
    if (value[0] <= trimStart) {
      setTrimStart(Math.max(0, value[0] - 5));
    }
    toast({
      title: "Trim Applied",
      description: `Video trimmed from ${trimStart}% to ${value[0]}%`,
    });
  };

  const handleSelectTransition = (transition: string) => {
    setSelectedTransition(transition);
    toast({
      title: "Transition Applied",
      description: `${transition} transition has been applied`,
    });
  };

  const handleSelectFilter = () => {
    toast({
      title: "Filter Applied",
      description: "The selected filter has been applied to your video",
    });
  };

  // Video player controls
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Video Paused" : "Video Playing",
      description: isPlaying ? "Video playback paused" : "Video playback started",
    });
  };

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    setCurrentTime(newTime);
    toast({
      title: "Video Seeked",
      description: `Seeked to ${Math.floor(newTime)}s`,
    });
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    toast({
      title: "Volume Changed",
      description: `Volume set to ${value[0]}%`,
    });
  };

  const handleSkipBack = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
    toast({
      title: "Skipped Back",
      description: "Skipped back 10 seconds",
    });
  };

  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    setCurrentTime(newTime);
    toast({
      title: "Skipped Forward",
      description: "Skipped forward 10 seconds",
    });
  };

  const handleStickerSelect = (sticker: Sticker) => {
    setAddedStickers(prev => [...prev, sticker]);
    toast({
      title: "Sticker Added",
      description: `${sticker.name} sticker added to your video`,
    });
  };

  const handleGifSelect = (gif: GifItem) => {
    setAddedGifs(prev => [...prev, gif]);
    toast({
      title: "GIF Added",
      description: `${gif.title} GIF added to replace shapes`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <DashboardLayout pageTitle="Video Editing">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Video Editing Studio</h2>
        <p className="text-gray-600">Create professional videos for your social media and marketing.</p>
      </div>
      
      <Tabs defaultValue={editingMode ? "editor" : "templates"} onValueChange={(value) => {
        if (value === "templates") {
          setEditingMode(false);
        }
      }}>
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="editor" disabled={!editingMode && !selectedTemplate}>Video Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>Select a pre-designed template or start from scratch</CardDescription>
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
                type="video"
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
                      <DialogTitle>Create Custom Video</DialogTitle>
                      <DialogDescription>
                        Set your desired dimensions and format for a custom video project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Width (px)</label>
                          <Input type="number" defaultValue={1920} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Height (px)</label>
                          <Input type="number" defaultValue={1080} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preset</label>
                        <Select defaultValue="16:9">
                          <SelectTrigger>
                            <SelectValue placeholder="Select aspect ratio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                            <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                            <SelectItem value="1:1">1:1 (Square)</SelectItem>
                            <SelectItem value="4:5">4:5 (Instagram)</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Frame Rate</label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue placeholder="Select frame rate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24">24 fps (Cinematic)</SelectItem>
                            <SelectItem value="30">30 fps (Standard)</SelectItem>
                            <SelectItem value="60">60 fps (Smooth)</SelectItem>
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
                          description: "You can now start editing your custom video"
                        });
                      }}>
                        Create Project
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline">
                  <FileVideo className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
                
                <Button disabled={!selectedTemplate} onClick={handleUseTemplate}>
                  <PlaySquare className="h-4 w-4 mr-2" />
                  Use Selected Template
                </Button>
              </div>
            </CardContent>
          </Card>
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
                <CardHeader className="pb-3 flex flex-row justify-between items-center">
                  <CardTitle>Preview</CardTitle>
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
                  <div className="flex-grow bg-black rounded-md flex items-center justify-center relative">
                    {videoPreview ? (
                      <img 
                        src={videoPreview} 
                        alt="Video preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Video className="h-16 w-16 text-white opacity-20" />
                    )}
                    {textTitle && (
                      <div className="absolute bottom-4 left-0 right-0 text-center">
                        <h2 className="text-white text-xl font-bold bg-black bg-opacity-50 inline-block px-4 py-2">{textTitle}</h2>
                      </div>
                    )}
                    {addedStickers.map((sticker, index) => (
                      <div 
                        key={`sticker-${index}`}
                        className="absolute text-4xl cursor-move"
                        style={{ 
                          top: `${20 + (index * 10)}%`, 
                          left: `${20 + (index * 10)}%`
                        }}
                      >
                        {sticker.url}
                      </div>
                    ))}
                    {addedGifs.map((gif, index) => (
                      <div 
                        key={`gif-${index}`}
                        className="absolute cursor-move"
                        style={{ 
                          top: `${30 + (index * 10)}%`, 
                          right: `${20 + (index * 10)}%`,
                          width: '80px',
                          height: '80px'
                        }}
                      >
                        <img 
                          src={gif.preview} 
                          alt={gif.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleSkipBack}>
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleSkipForward}>
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2 ml-4">
                        <Volume2 className="h-4 w-4" />
                        <Slider 
                          value={[volume]} 
                          max={100} 
                          step={1} 
                          className="w-20"
                          onValueChange={handleVolumeChange}
                        />
                      </div>
                    </div>
                    <div className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Slider 
                      value={[(currentTime / duration) * 100]} 
                      max={100} 
                      step={0.1}
                      onValueChange={handleSeek}
                    />
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
                  <Tabs defaultValue={selectedTabInEditor} onValueChange={setSelectedTabInEditor}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="trim" className="text-xs">
                        <Scissors className="h-4 w-4 mb-1" />
                        <span>Trim</span>
                      </TabsTrigger>
                      <TabsTrigger value="text" className="text-xs">
                        <Type className="h-4 w-4 mb-1" />
                        <span>Text</span>
                      </TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-3 mt-2">
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
                      <TabsTrigger value="stickers" className="text-xs">
                        <Smile className="h-4 w-4 mb-1" />
                        <span>Stickers</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="trim" className="pt-4 space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Start Time</label>
                          <span className="text-xs">{trimStart}%</span>
                        </div>
                        <Slider 
                          value={[trimStart]} 
                          max={100} 
                          step={1} 
                          onValueChange={handleTrimStartChange} 
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">End Time</label>
                          <span className="text-xs">{trimEnd}%</span>
                        </div>
                        <Slider 
                          value={[trimEnd]} 
                          max={100} 
                          step={1} 
                          onValueChange={handleTrimEndChange} 
                        />
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
                        <Button variant="outline" className="w-full justify-start" onClick={handleAddTitle}>
                          <span>Add title</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <span>Add subtitle</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <span>Add call to action</span>
                        </Button>
                      </div>
                      
                      {textTitle && (
                        <div className="mt-4 space-y-2">
                          <label className="text-sm font-medium">Edit Title</label>
                          <Input 
                            value={textTitle} 
                            onChange={(e) => setTextTitle(e.target.value)} 
                          />
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Text animations</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm">Fade In</p>
                          </div>
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm">Slide Up</p>
                          </div>
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm">Pop</p>
                          </div>
                          <div className="p-2 border rounded-md text-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm">Bounce</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="music" className="pt-4 space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Music Volume</label>
                          <span className="text-xs">{musicVolume}%</span>
                        </div>
                        <Slider 
                          value={[musicVolume]} 
                          max={100} 
                          step={1} 
                          onValueChange={handleMusicVolumeChange} 
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm">Voice Volume</label>
                          <span className="text-xs">{voiceVolume}%</span>
                        </div>
                        <Slider 
                          value={[voiceVolume]} 
                          max={100} 
                          step={1} 
                          onValueChange={handleVoiceVolumeChange} 
                        />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Background Music</h4>
                        <div className="space-y-2">
                          <div className="p-2 border rounded-md flex items-center cursor-pointer hover:bg-gray-100">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <Music className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-sm">Upbeat Pop</span>
                          </div>
                          <div className="p-2 border rounded-md flex items-center cursor-pointer hover:bg-gray-100">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <Music className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-sm">Corporate</span>
                          </div>
                          <div className="p-2 border rounded-md flex items-center cursor-pointer hover:bg-gray-100">
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
                          <div 
                            className={`p-2 border rounded-md text-center cursor-pointer ${selectedTransition === 'Fade' ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-100'}`}
                            onClick={() => handleSelectTransition('Fade')}
                          >
                            <p className="text-sm">Fade</p>
                          </div>
                          <div 
                            className={`p-2 border rounded-md text-center cursor-pointer ${selectedTransition === 'Dissolve' ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-100'}`}
                            onClick={() => handleSelectTransition('Dissolve')}
                          >
                            <p className="text-sm">Dissolve</p>
                          </div>
                          <div 
                            className={`p-2 border rounded-md text-center cursor-pointer ${selectedTransition === 'Slide' ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-100'}`}
                            onClick={() => handleSelectTransition('Slide')}
                          >
                            <p className="text-sm">Slide</p>
                          </div>
                          <div 
                            className={`p-2 border rounded-md text-center cursor-pointer ${selectedTransition === 'Wipe' ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-100'}`}
                            onClick={() => handleSelectTransition('Wipe')}
                          >
                            <p className="text-sm">Wipe</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Filters</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="aspect-square bg-gray-200 rounded-md cursor-pointer" onClick={handleSelectFilter}></div>
                          <div className="aspect-square bg-gray-300 rounded-md cursor-pointer" onClick={handleSelectFilter}></div>
                          <div className="aspect-square bg-gray-400 rounded-md cursor-pointer" onClick={handleSelectFilter}></div>
                          <div className="aspect-square bg-gray-500 rounded-md cursor-pointer" onClick={handleSelectFilter}></div>
                          <div className="aspect-square bg-gray-600 rounded-md cursor-pointer" onClick={handleSelectFilter}></div>
                          <div className="aspect-square bg-gray-700 rounded-md cursor-pointer" onClick={handleSelectFilter}></div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Replace Shapes with GIFs</h4>
                        <GifLibrary onGifSelect={handleGifSelect} />
                      </div>
                    </TabsContent>

                    <TabsContent value="stickers" className="pt-4">
                      <StickerLibrary onStickerSelect={handleStickerSelect} />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="pt-6 flex justify-between">
                    <Button variant="outline" onClick={handleSaveTemplate}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Template
                    </Button>
                    <Button onClick={handleExport} className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
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
