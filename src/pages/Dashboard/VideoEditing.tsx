
import React, { useState, useRef } from "react";
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
  Volume2,
  Upload,
  Trash2
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

interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'image' | 'audio';
  url: string;
  duration?: string;
  size?: string;
}

interface AudioTrack {
  id: string;
  name: string;
  type: 'background' | 'voiceover';
  volume: number;
  url: string;
}

const VideoEditing: React.FC = () => {
  const { toast } = useToast();
  const videoFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);
  
  // Template and editing state
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState<Template | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [selectedTabInEditor, setSelectedTabInEditor] = useState<string>("trim");
  
  // Media assets state
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([
    { id: "1", name: "intro_clip.mp4", type: "video", url: "", duration: "00:12", size: "720p" },
    { id: "2", name: "product_demo.mp4", type: "video", url: "", duration: "00:25", size: "1080p" },
    { id: "3", name: "background_music.mp3", type: "audio", url: "", duration: "01:42" },
    { id: "4", name: "voice_over.mp3", type: "audio", url: "", duration: "00:35" },
  ]);
  
  // Video player state
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(35);
  const [volume, setVolume] = useState(50);
  
  // Editing tools state
  const [textElements, setTextElements] = useState<Array<{id: string, text: string, style: string}>>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([
    { id: "1", name: "Background Music", type: "background", volume: 50, url: "" },
    { id: "2", name: "Voice Over", type: "voiceover", volume: 80, url: "" }
  ]);
  const [selectedTransition, setSelectedTransition] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(100);
  const [addedStickers, setAddedStickers] = useState<Sticker[]>([]);
  const [addedGifs, setAddedGifs] = useState<GifItem[]>([]);
  
  // Template categories and templates data
  const categories = ["All", "Business", "Story", "Promo", "Social Media"];
  const [activeCategory, setActiveCategory] = useState("All");
  
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

  // File upload handlers
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        name: file.name,
        type: 'video',
        url: url,
        duration: "00:00",
        size: "Unknown"
      };
      setMediaAssets(prev => [...prev, newAsset]);
      setVideoPreview(url);
      toast({
        title: "Video Uploaded",
        description: `${file.name} has been added to your media assets`,
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        name: file.name,
        type: 'image',
        url: url,
        size: `${Math.round(file.size / 1024)}KB`
      };
      setMediaAssets(prev => [...prev, newAsset]);
      toast({
        title: "Image Uploaded",
        description: `${file.name} has been added to your media assets`,
      });
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        name: file.name,
        type: 'audio',
        url: url,
        duration: "00:00"
      };
      setMediaAssets(prev => [...prev, newAsset]);
      const newTrack: AudioTrack = {
        id: Date.now().toString(),
        name: file.name,
        type: 'background',
        volume: 50,
        url: url
      };
      setAudioTracks(prev => [...prev, newTrack]);
      toast({
        title: "Audio Uploaded",
        description: `${file.name} has been added to your media assets`,
      });
    }
  };

  const handleDeleteAsset = (assetId: string) => {
    setMediaAssets(prev => prev.filter(asset => asset.id !== assetId));
    toast({
      title: "Asset Deleted",
      description: "Media asset has been removed",
    });
  };

  // Text editing functions
  const handleAddText = (textType: string) => {
    const newText = {
      id: Date.now().toString(),
      text: `${textType} Text`,
      style: textType
    };
    setTextElements(prev => [...prev, newText]);
    toast({
      title: "Text Added",
      description: `${textType} has been added to your video`,
    });
  };

  const handleUpdateText = (id: string, newText: string) => {
    setTextElements(prev => 
      prev.map(element => 
        element.id === id ? { ...element, text: newText } : element
      )
    );
  };

  const handleDeleteText = (id: string) => {
    setTextElements(prev => prev.filter(element => element.id !== id));
    toast({
      title: "Text Removed",
      description: "Text element has been deleted",
    });
  };

  // Audio controls
  const handleAudioVolumeChange = (trackId: string, volume: number) => {
    setAudioTracks(prev => 
      prev.map(track => 
        track.id === trackId ? { ...track, volume } : track
      )
    );
    toast({
      title: "Audio Volume Updated",
      description: `Volume set to ${volume}%`,
    });
  };

  const handleDeleteAudioTrack = (trackId: string) => {
    setAudioTracks(prev => prev.filter(track => track.id !== trackId));
    toast({
      title: "Audio Track Removed",
      description: "Audio track has been deleted",
    });
  };

  // Transition and effects
  const handleSelectTransition = (transition: string) => {
    setSelectedTransition(transition);
    toast({
      title: "Transition Applied",
      description: `${transition} transition has been applied`,
    });
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    toast({
      title: "Filter Applied",
      description: `${filter} filter has been applied`,
    });
  };

  // Trimming controls
  const handleTrimStartChange = (value: number[]) => {
    const newStart = value[0];
    setTrimStart(newStart);
    if (newStart >= trimEnd) {
      setTrimEnd(Math.min(100, newStart + 5));
    }
    toast({
      title: "Trim Updated",
      description: `Video trimmed from ${newStart}% to ${trimEnd}%`,
    });
  };

  const handleTrimEndChange = (value: number[]) => {
    const newEnd = value[0];
    setTrimEnd(newEnd);
    if (newEnd <= trimStart) {
      setTrimStart(Math.max(0, newEnd - 5));
    }
    toast({
      title: "Trim Updated",
      description: `Video trimmed from ${trimStart}% to ${newEnd}%`,
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
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleSkipBack = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    setCurrentTime(newTime);
  };

  // Sticker and GIF handlers
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
      description: `${gif.title} GIF added to your video`,
    });
  };

  const handleDeleteSticker = (index: number) => {
    setAddedStickers(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Sticker Removed",
      description: "Sticker has been removed from your video",
    });
  };

  const handleDeleteGif = (index: number) => {
    setAddedGifs(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "GIF Removed",
      description: "GIF has been removed from your video",
    });
  };

  // Template handlers
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
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Hidden file inputs
  const hiddenFileInputs = (
    <>
      <input
        type="file"
        ref={videoFileRef}
        onChange={handleVideoUpload}
        accept="video/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={imageFileRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={audioFileRef}
        onChange={handleAudioUpload}
        accept="audio/*"
        style={{ display: 'none' }}
      />
    </>
  );
  
  return (
    <DashboardLayout pageTitle="Video Editing">
      {hiddenFileInputs}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Video Editing Studio</h2>
        <p className="text-gray-600">Create professional videos with full editing capabilities.</p>
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
                <Button variant="outline" onClick={() => videoFileRef.current?.click()}>
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
                        {mediaAssets.filter(asset => asset.type === 'video').map((asset) => (
                          <div key={asset.id} className="p-3 border rounded-md flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                              <FileVideo className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="overflow-hidden flex-grow">
                              <p className="text-sm font-medium truncate">{asset.name}</p>
                              <p className="text-xs text-gray-500">{asset.duration} • {asset.size}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAsset(asset.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" onClick={() => videoFileRef.current?.click()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Video
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="images" className="pt-4">
                      <div className="grid grid-cols-2 gap-2">
                        {mediaAssets.filter(asset => asset.type === 'image').map((asset) => (
                          <div key={asset.id} className="relative">
                            <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                              {asset.url ? (
                                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover rounded-md" />
                              ) : (
                                <Image className="h-6 w-6 text-gray-400" />
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-1 right-1"
                              onClick={() => handleDeleteAsset(asset.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" onClick={() => imageFileRef.current?.click()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Images
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="audio" className="pt-4">
                      <div className="space-y-2">
                        {mediaAssets.filter(asset => asset.type === 'audio').map((asset) => (
                          <div key={asset.id} className="p-3 border rounded-md flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                              <Music className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="overflow-hidden flex-grow">
                              <p className="text-sm font-medium truncate">{asset.name}</p>
                              <p className="text-xs text-gray-500">{asset.duration}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAsset(asset.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" onClick={() => audioFileRef.current?.click()}>
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
                      <Badge variant="secondary">{customTemplate.title}</Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="flex-grow bg-black rounded-md flex items-center justify-center relative min-h-[300px]">
                    {videoPreview ? (
                      <img 
                        src={videoPreview} 
                        alt="Video preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Video className="h-16 w-16 text-white opacity-20" />
                    )}
                    
                    {/* Text overlays */}
                    {textElements.map((element, index) => (
                      <div 
                        key={element.id}
                        className="absolute text-white cursor-move"
                        style={{ 
                          top: `${20 + (index * 8)}%`, 
                          left: `${20 + (index * 5)}%`,
                          fontSize: element.style === 'Title' ? '24px' : '16px',
                          fontWeight: element.style === 'Title' ? 'bold' : 'normal'
                        }}
                      >
                        {element.text}
                      </div>
                    ))}
                    
                    {/* Sticker overlays */}
                    {addedStickers.map((sticker, index) => (
                      <div 
                        key={`sticker-${index}`}
                        className="absolute text-4xl cursor-move group"
                        style={{ 
                          top: `${20 + (index * 10)}%`, 
                          left: `${20 + (index * 10)}%`
                        }}
                      >
                        {sticker.url}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteSticker(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    {/* GIF overlays */}
                    {addedGifs.map((gif, index) => (
                      <div 
                        key={`gif-${index}`}
                        className="absolute cursor-move group"
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteGif(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Video controls */}
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
                  
                  {/* Progress bar */}
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
                    
                    {/* Trim tab */}
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
                      
                      <Button variant="outline" className="w-full">
                        <Scissors className="h-4 w-4 mr-2" />
                        Apply Trim
                      </Button>
                    </TabsContent>
                    
                    {/* Text tab */}
                    <TabsContent value="text" className="pt-4">
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => handleAddText('Title')}
                        >
                          <span>Add Title</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleAddText('Subtitle')}
                        >
                          <span>Add Subtitle</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleAddText('Call to Action')}
                        >
                          <span>Add Call to Action</span>
                        </Button>
                      </div>
                      
                      {/* Text elements list */}
                      {textElements.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium">Text Elements</h4>
                          {textElements.map((element) => (
                            <div key={element.id} className="flex items-center gap-2">
                              <Input 
                                value={element.text} 
                                onChange={(e) => handleUpdateText(element.id, e.target.value)}
                                className="flex-grow"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteText(element.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    {/* Audio tab */}
                    <TabsContent value="music" className="pt-4 space-y-4">
                      {audioTracks.map((track) => (
                        <div key={track.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">{track.name}</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAudioTrack(track.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Volume</span>
                            <span className="text-xs">{track.volume}%</span>
                          </div>
                          <Slider 
                            value={[track.volume]} 
                            max={100} 
                            step={1} 
                            onValueChange={(value) => handleAudioVolumeChange(track.id, value[0])} 
                          />
                        </div>
                      ))}
                      
                      <Button className="w-full" onClick={() => audioFileRef.current?.click()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Audio Track
                      </Button>
                    </TabsContent>
                    
                    {/* Effects tab */}
                    <TabsContent value="effects" className="pt-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Transitions</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {['Fade', 'Dissolve', 'Slide', 'Wipe'].map((transition) => (
                            <div 
                              key={transition}
                              className={`p-2 border rounded-md text-center cursor-pointer ${selectedTransition === transition ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-100'}`}
                              onClick={() => handleSelectTransition(transition)}
                            >
                              <p className="text-sm">{transition}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Filters</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {['Vintage', 'Bright', 'Dark', 'Blur', 'Sharp', 'Sepia'].map((filter) => (
                            <div 
                              key={filter}
                              className={`aspect-square rounded-md cursor-pointer border-2 flex items-center justify-center text-xs ${selectedFilter === filter ? 'border-purple-300 bg-purple-100' : 'border-gray-200 bg-gray-100 hover:bg-gray-200'}`}
                              onClick={() => handleSelectFilter(filter)}
                            >
                              {filter}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Add GIFs</h4>
                        <GifLibrary onGifSelect={handleGifSelect} />
                      </div>
                    </TabsContent>

                    {/* Stickers tab */}
                    <TabsContent value="stickers" className="pt-4">
                      <StickerLibrary onStickerSelect={handleStickerSelect} />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="pt-6 flex justify-between">
                    <Button variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save Project
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
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default VideoEditing;
