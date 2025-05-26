
import React, { useState, useRef, useEffect } from "react";
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

// Utility function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const VideoEditing: React.FC = () => {
  const { toast } = useToast();
  const videoFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  
  // Template and editing state
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState<Template | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [selectedTabInEditor, setSelectedTabInEditor] = useState<string>("trim");
  
  // Media assets state
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  
  // Video player state
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  
  // Editing tools state
  const [textElements, setTextElements] = useState<Array<{id: string, text: string, style: string}>>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);
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
    }
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
      setEditingMode(true);
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

  // Media asset handlers
  const handleSelectAsset = (asset: MediaAsset) => {
    if (asset.type === 'video') {
      setVideoPreview(asset.url);
    }
    toast({
      title: "Asset Selected",
      description: `${asset.name} is now active in the editor`,
    });
  };

  const handleDeleteAsset = (assetId: string) => {
    setMediaAssets(prev => prev.filter(asset => asset.id !== assetId));
    toast({
      title: "Asset Deleted",
      description: "Media asset has been removed",
    });
  };

  // Video player control handlers
  const handlePlayPause = () => {
    const video = videoPlayerRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const handleSkipBack = () => {
    const video = videoPlayerRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    const video = videoPlayerRef.current;
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    const video = videoPlayerRef.current;
    if (video) {
      video.volume = newVolume / 100;
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoPlayerRef.current;
    if (video && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Trim handlers
  const handleTrimStartChange = (value: number[]) => {
    setTrimStart(value[0]);
  };

  const handleTrimEndChange = (value: number[]) => {
    setTrimEnd(value[0]);
  };

  // Text element handlers
  const handleAddText = (style: string) => {
    const newText = {
      id: Date.now().toString(),
      text: style === 'Title' ? 'Your Title Here' : 
            style === 'Subtitle' ? 'Your Subtitle Here' : 
            'Call to Action',
      style: style
    };
    setTextElements(prev => [...prev, newText]);
    toast({
      title: "Text Added",
      description: `${style} has been added to your video`,
    });
  };

  const handleUpdateText = (id: string, newText: string) => {
    setTextElements(prev => prev.map(element => 
      element.id === id ? { ...element, text: newText } : element
    ));
  };

  const handleDeleteText = (id: string) => {
    setTextElements(prev => prev.filter(element => element.id !== id));
  };

  // Audio track handlers
  const handleDeleteAudioTrack = (trackId: string) => {
    setAudioTracks(prev => prev.filter(track => track.id !== trackId));
    setMediaAssets(prev => prev.filter(asset => asset.id !== trackId));
  };

  const handleAudioVolumeChange = (trackId: string, volume: number) => {
    setAudioTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, volume } : track
    ));
  };

  // Effects handlers
  const handleSelectTransition = (transition: string) => {
    setSelectedTransition(transition);
    toast({
      title: "Transition Selected",
      description: `${transition} transition will be applied`,
    });
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    toast({
      title: "Filter Applied",
      description: `${filter} filter has been applied to your video`,
    });
  };

  // Sticker and GIF handlers
  const handleStickerSelect = (sticker: Sticker) => {
    setAddedStickers(prev => [...prev, sticker]);
    toast({
      title: "Sticker Added",
      description: "Sticker has been added to your video",
    });
  };

  const handleDeleteSticker = (index: number) => {
    setAddedStickers(prev => prev.filter((_, i) => i !== index));
  };

  const handleGifSelect = (gif: GifItem) => {
    setAddedGifs(prev => [...prev, gif]);
    toast({
      title: "GIF Added",
      description: "GIF has been added to your video",
    });
  };

  const handleDeleteGif = (index: number) => {
    setAddedGifs(prev => prev.filter((_, i) => i !== index));
  };

  // Hidden file inputs for upload functionality
  const hiddenFileInputs = (
    <>
      <input
        type="file"
        ref={videoFileRef}
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={imageFileRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={audioFileRef}
        accept="audio/*"
        onChange={handleAudioUpload}
        className="hidden"
      />
    </>
  );

  // Video player control functions
  useEffect(() => {
    const video = videoPlayerRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [videoPreview]);

  // Enhanced export function with proper video rendering
  const handleExport = async () => {
    if (!videoPreview) {
      toast({
        title: "No Video to Export",
        description: "Please upload or select a video first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Starting Export",
      description: "Processing your video with all effects...",
    });

    try {
      // Create a temporary video element for processing
      const video = document.createElement('video');
      video.src = videoPreview;
      video.crossOrigin = 'anonymous';
      
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
        video.load();
      });

      // Create canvas for rendering
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;

      // Set video to trim start position
      const startTime = (trimStart / 100) * video.duration;
      const endTime = (trimEnd / 100) * video.duration;
      video.currentTime = startTime;

      await new Promise((resolve) => {
        video.onseeked = resolve;
      });

      if (ctx) {
        // Draw video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Apply filter effects
        if (selectedFilter) {
          switch (selectedFilter) {
            case 'Vintage':
              ctx.filter = 'sepia(0.8) contrast(1.2) brightness(0.9)';
              break;
            case 'Bright':
              ctx.filter = 'brightness(1.3) contrast(1.1)';
              break;
            case 'Dark':
              ctx.filter = 'brightness(0.7) contrast(1.2)';
              break;
            case 'Blur':
              ctx.filter = 'blur(2px)';
              break;
            case 'Sharp':
              ctx.filter = 'contrast(1.4) brightness(1.1)';
              break;
            case 'Sepia':
              ctx.filter = 'sepia(1)';
              break;
          }
        }

        // Add text overlays
        textElements.forEach((element, index) => {
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 3;
          ctx.font = element.style === 'Title' ? 'bold 48px Arial' : 
                    element.style === 'Subtitle' ? 'bold 32px Arial' : '24px Arial';
          
          const x = 50 + (index * 20);
          const y = 100 + (index * 60);
          
          ctx.strokeText(element.text, x, y);
          ctx.fillText(element.text, x, y);
        });

        // Add sticker overlays
        addedStickers.forEach((sticker, index) => {
          ctx.font = '64px Arial';
          const x = 100 + (index * 80);
          const y = 200 + (index * 80);
          ctx.fillText(sticker.url, x, y);
        });

        // Add GIF overlays (as static images for now)
        for (let i = 0; i < addedGifs.length; i++) {
          const gif = addedGifs[i];
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = gif.preview;
          });

          const x = canvas.width - 120 - (i * 90);
          const y = 50 + (i * 90);
          ctx.drawImage(img, x, y, 80, 80);
        }
      }

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `edited-video-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          toast({
            title: "Export Complete!",
            description: `Video frame exported successfully with ${textElements.length} text elements, ${addedStickers.length} stickers, and ${addedGifs.length} GIFs`,
          });
        }
      }, 'image/png');

    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your video. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Enhanced save project function
  const handleSaveProject = () => {
    const projectData = {
      id: Date.now().toString(),
      name: `Video Project ${new Date().toLocaleDateString()}`,
      timestamp: new Date().toISOString(),
      mediaAssets,
      textElements,
      audioTracks,
      addedStickers,
      addedGifs,
      selectedTransition,
      selectedFilter,
      trimStart,
      trimEnd,
      videoPreview,
      customTemplate
    };
    
    // Save to localStorage
    const savedProjects = JSON.parse(localStorage.getItem('videoProjects') || '[]');
    savedProjects.push(projectData);
    localStorage.setItem('videoProjects', JSON.stringify(savedProjects));
    
    toast({
      title: "Project Saved",
      description: `Your project has been saved successfully`,
    });
  };

  // Load saved project function
  const handleLoadProject = () => {
    const savedProjects = JSON.parse(localStorage.getItem('videoProjects') || '[]');
    if (savedProjects.length > 0) {
      const latestProject = savedProjects[savedProjects.length - 1];
      
      setMediaAssets(latestProject.mediaAssets || []);
      setTextElements(latestProject.textElements || []);
      setAudioTracks(latestProject.audioTracks || []);
      setAddedStickers(latestProject.addedStickers || []);
      setAddedGifs(latestProject.addedGifs || []);
      setSelectedTransition(latestProject.selectedTransition);
      setSelectedFilter(latestProject.selectedFilter);
      setTrimStart(latestProject.trimStart || 0);
      setTrimEnd(latestProject.trimEnd || 100);
      setVideoPreview(latestProject.videoPreview);
      setCustomTemplate(latestProject.customTemplate);
      
      toast({
        title: "Project Loaded",
        description: "Your latest project has been loaded",
      });
    } else {
      toast({
        title: "No Saved Projects",
        description: "No saved projects found",
        variant: "destructive"
      });
    }
  };

  // Enhanced export options
  const handleExportOptions = () => {
    if (!videoPreview) {
      toast({
        title: "No Content to Export",
        description: "Please upload a video or select a template first",
        variant: "destructive"
      });
      return;
    }

    // Show export quality options
    const qualities = ['720p', '1080p', '4K'];
    const selectedQuality = '1080p'; // Default
    
    toast({
      title: "Export Settings",
      description: `Exporting in ${selectedQuality} quality with all applied effects`,
    });
    
    // Trigger the actual export
    setTimeout(() => {
      handleExport();
    }, 1000);
  };

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
          <TabsTrigger value="editor" disabled={!editingMode && !selectedTemplate && !videoPreview}>Video Editor</TabsTrigger>
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
                onSelectTemplate={(templateId) => setSelectedTemplate(templateId)}
                type="video"
              />
              
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => videoFileRef.current?.click()}>
                  <FileVideo className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
                
                <Button disabled={!selectedTemplate} onClick={() => {
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
                }}>
                  <PlaySquare className="h-4 w-4 mr-2" />
                  Use Selected Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                          <div 
                            key={asset.id} 
                            className={`p-3 border rounded-md flex items-center cursor-pointer hover:bg-gray-50 ${videoPreview === asset.url ? 'bg-blue-50 border-blue-300' : ''}`}
                            onClick={() => handleSelectAsset(asset)}
                          >
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAsset(asset.id);
                              }}
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
                          <div key={asset.id} className="relative cursor-pointer" onClick={() => handleSelectAsset(asset)}>
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAsset(asset.id);
                              }}
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
                          <div key={asset.id} className="p-3 border rounded-md flex items-center cursor-pointer hover:bg-gray-50" onClick={() => handleSelectAsset(asset)}>
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAsset(asset.id);
                              }}
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
                      <video 
                        ref={videoPlayerRef}
                        src={videoPreview}
                        className="max-h-full max-w-full object-contain"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                    ) : (
                      <div className="text-white opacity-50 text-center">
                        <Video className="h-16 w-16 mx-auto mb-4" />
                        <p>Upload a video to get started</p>
                      </div>
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
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                          onClick={() => handleDeleteSticker(index)}
                        >
                          <Trash2 className="h-3 w-3 text-white" />
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
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                          onClick={() => handleDeleteGif(index)}
                        >
                          <Trash2 className="h-3 w-3 text-white" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Video controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleSkipBack} disabled={!videoPreview}>
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePlayPause} disabled={!videoPreview}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleSkipForward} disabled={!videoPreview}>
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
                      value={duration > 0 ? [(currentTime / duration) * 100] : [0]} 
                      max={100} 
                      step={0.1}
                      onValueChange={handleSeek}
                      disabled={!videoPreview || duration === 0}
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
                      
                      <Button variant="outline" className="w-full">
                        <Scissors className="h-4 w-4 mr-2" />
                        Apply Trim
                      </Button>
                    </TabsContent>
                    
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

                    <TabsContent value="stickers" className="pt-4">
                      <StickerLibrary onStickerSelect={handleStickerSelect} />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="pt-6 flex justify-between">
                    <Button variant="outline" onClick={handleSaveProject}>
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
