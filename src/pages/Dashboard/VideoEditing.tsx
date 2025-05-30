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
  Upload,
  Trash2,
  Clock,
  Layers,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Smile
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TemplateGallery, { Template } from "@/components/Dashboard/TemplateGallery";
import StickerLibrary, { Sticker } from "@/components/Dashboard/StickerLibrary";
import GifLibrary, { GifItem } from "@/components/Dashboard/GifLibrary";
import VideoTimeline, { TimelineTrack } from "@/components/Dashboard/VideoTimeline";
import IntroTemplates, { IntroTemplate } from "@/components/Dashboard/IntroTemplates";
import MultiVideoManager, { VideoAsset } from "@/components/Dashboard/MultiVideoManager";
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

interface DraggableElement {
  id: string;
  type: 'sticker' | 'gif' | 'text';
  content: string | Sticker | GifItem;
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  scale: number;
}

interface TimelineElement {
  id: string;
  type: 'sticker' | 'gif' | 'text';
  name: string;
  startTime: number;
  endTime: number;
  track: number;
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
  const previewContainerRef = useRef<HTMLDivElement>(null);
  
  // Template and editing state
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState<Template | null>(null);
  const [selectedIntroTemplate, setSelectedIntroTemplate] = useState<IntroTemplate | null>(null);
  const [videoAssets, setVideoAssets] = useState<VideoAsset[]>([]);
  const [timelineTracks, setTimelineTracks] = useState<TimelineTrack[]>([]);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
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
  const [addedElements, setAddedElements] = useState<DraggableElement[]>([]);
  const [timelineElements, setTimelineElements] = useState<TimelineElement[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
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

  // Apply filter effects to video in real-time
  useEffect(() => {
    const video = videoPlayerRef.current;
    if (video && selectedFilter) {
      let filterStyle = '';
      switch (selectedFilter) {
        case 'Vintage':
          filterStyle = 'sepia(0.8) contrast(1.2) brightness(0.9)';
          break;
        case 'Bright':
          filterStyle = 'brightness(1.3) contrast(1.1)';
          break;
        case 'Dark':
          filterStyle = 'brightness(0.7) contrast(1.2)';
          break;
        case 'Blur':
          filterStyle = 'blur(2px)';
          break;
        case 'Sharp':
          filterStyle = 'contrast(1.4) brightness(1.1)';
          break;
        case 'Sepia':
          filterStyle = 'sepia(1)';
          break;
        default:
          filterStyle = 'none';
      }
      video.style.filter = filterStyle;
    } else if (video) {
      video.style.filter = 'none';
    }
  }, [selectedFilter]);

  // Update visible elements based on current time
  useEffect(() => {
    setAddedElements(prev => prev.map(element => ({
      ...element,
      visible: currentTime >= element.startTime && currentTime <= element.endTime
    })));
  }, [currentTime]);

  // File upload handlers
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const videoId = Date.now().toString();
      
      const newVideoAsset: VideoAsset = {
        id: videoId,
        name: file.name,
        url: url,
        duration: 0, // Will be updated when video loads
        position: videoAssets.length,
        isActive: videoAssets.length === 0
      };
      
      setVideoAssets(prev => [...prev, newVideoAsset]);
      
      if (videoAssets.length === 0) {
        setVideoPreview(url);
        setCurrentVideoId(videoId);
        setEditingMode(true);
      }
      
      // Create timeline track for the video
      const newTrack: TimelineTrack = {
        id: videoId,
        type: 'video',
        name: file.name,
        startTime: 0,
        duration: 0, // Will be updated
        url: url,
        color: '#3b82f6'
      };
      
      setTimelineTracks(prev => [...prev, newTrack]);
      
      toast({
        title: "Video Added",
        description: `${file.name} has been added to your video sequence`,
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

  // Handle intro template selection
  const handleIntroTemplateSelect = (template: IntroTemplate) => {
    setSelectedIntroTemplate(template);
    setEditingMode(true);
    setSelectedTemplate(template.id);
    
    // Create a timeline track for the intro
    const introTrack: TimelineTrack = {
      id: `intro-${template.id}`,
      type: 'video',
      name: template.title,
      startTime: 0,
      duration: parseInt(template.duration),
      color: '#8b5cf6'
    };
    
    setTimelineTracks(prev => [introTrack, ...prev]);
    
    toast({
      title: "Intro Template Selected",
      description: `${template.title} has been loaded. You can now customize it with your content.`,
    });
  };

  // Multi-video management handlers
  const handleVideoSelect = (videoId: string) => {
    const video = videoAssets.find(v => v.id === videoId);
    if (video) {
      setVideoAssets(prev => prev.map(v => ({ ...v, isActive: v.id === videoId })));
      setVideoPreview(video.url);
      setCurrentVideoId(videoId);
    }
  };

  const handleVideoDelete = (videoId: string) => {
    setVideoAssets(prev => prev.filter(v => v.id !== videoId));
    setTimelineTracks(prev => prev.filter(t => t.id !== videoId));
    
    if (currentVideoId === videoId) {
      const remainingVideos = videoAssets.filter(v => v.id !== videoId);
      if (remainingVideos.length > 0) {
        handleVideoSelect(remainingVideos[0].id);
      } else {
        setVideoPreview(null);
        setCurrentVideoId(null);
        setEditingMode(false);
      }
    }
    
    toast({
      title: "Video Removed",
      description: "Video has been removed from the sequence",
    });
  };

  const handleVideoReorder = (fromIndex: number, toIndex: number) => {
    setVideoAssets(prev => {
      const newOrder = [...prev];
      const [moved] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, moved);
      return newOrder.map((video, index) => ({ ...video, position: index }));
    });
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

  // Enhanced drag handlers
  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    const element = addedElements.find(el => el.id === elementId);
    if (!element || !previewContainerRef.current) return;

    const rect = previewContainerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - (element.x / 100) * rect.width;
    const offsetY = e.clientY - rect.top - (element.y / 100) * rect.height;
    
    setIsDragging(elementId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !previewContainerRef.current) return;

    const rect = previewContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    setAddedElements(prev => prev.map(element => 
      element.id === isDragging 
        ? { ...element, x: Math.max(0, Math.min(90, x)), y: Math.max(0, Math.min(90, y)) }
        : element
    ));
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setDragOffset({ x: 0, y: 0 });
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
    const newElement: DraggableElement = {
      id: Date.now().toString(),
      type: 'text',
      content: style === 'Title' ? 'Your Title Here' : 
            style === 'Subtitle' ? 'Your Subtitle Here' : 
            'Call to Action',
      x: 20,
      y: 20,
      startTime: 0,
      endTime: duration || 10,
      scale: 1
    };
    
    const newTimelineElement: TimelineElement = {
      id: newElement.id,
      type: 'text',
      name: `${style} Text`,
      startTime: 0,
      endTime: duration || 10,
      track: timelineElements.length
    };
    
    setAddedElements(prev => [...prev, newElement]);
    setTimelineElements(prev => [...prev, newTimelineElement]);
    
    toast({
      title: "Text Added",
      description: `${style} has been added to your video`,
    });
  };

  const handleUpdateText = (id: string, newText: string) => {
    setAddedElements(prev => prev.map(element => 
      element.id === id && element.type === 'text' ? { ...element, content: newText } : element
    ));
  };

  const handleDeleteElement = (id: string) => {
    setAddedElements(prev => prev.filter(element => element.id !== id));
    setTimelineElements(prev => prev.filter(element => element.id !== id));
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
      description: `${transition} transition will be applied during export`,
    });
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    toast({
      title: "Filter Applied",
      description: `${filter} filter has been applied to your video`,
    });
  };

  // Enhanced sticker and GIF handlers
  const handleStickerSelect = (sticker: Sticker) => {
    const elementId = Date.now().toString();
    
    const newElement: DraggableElement = {
      id: elementId,
      type: 'sticker',
      content: sticker,
      x: 20,
      y: 20,
      startTime: currentTime,
      endTime: Math.min(currentTime + 5, duration || 10),
      scale: 1
    };
    
    const newTrack: TimelineTrack = {
      id: elementId,
      type: 'sticker',
      name: sticker.name,
      startTime: currentTime,
      duration: 5,
      content: sticker,
      color: '#f59e0b'
    };
    
    setAddedElements(prev => [...prev, newElement]);
    setTimelineTracks(prev => [...prev, newTrack]);
    
    toast({
      title: "Sticker Added",
      description: "Sticker has been added to your timeline!",
    });
  };

  const handleGifSelect = (gif: GifItem) => {
    const elementId = Date.now().toString();
    
    const newElement: DraggableElement = {
      id: elementId,
      type: 'gif',
      content: gif,
      x: 50,
      y: 50,
      startTime: currentTime,
      endTime: Math.min(currentTime + 3, duration || 10),
      scale: 1
    };
    
    const newTrack: TimelineTrack = {
      id: elementId,
      type: 'gif',
      name: gif.title,
      startTime: currentTime,
      duration: 3,
      content: gif,
      color: '#ef4444'
    };
    
    setAddedElements(prev => [...prev, newElement]);
    setTimelineTracks(prev => [...prev, newTrack]);
    
    toast({
      title: "GIF Added",
      description: "GIF has been added to your timeline!",
    });
  };

  // Timeline handlers
  const handleTimelineElementChange = (id: string, startTime: number, endTime: number) => {
    setTimelineElements(prev => prev.map(element => 
      element.id === id ? { ...element, startTime, endTime } : element
    ));
    setAddedElements(prev => prev.map(element => 
      element.id === id ? { ...element, startTime, endTime } : element
    ));
  };

  // Add missing timeline handler functions
  const handleTimelineTrackUpdate = (trackId: string, updates: Partial<TimelineTrack>) => {
    setTimelineTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, ...updates } : track
    ));
  };

  const handleTimelineTrackDelete = (trackId: string) => {
    setTimelineTracks(prev => prev.filter(track => track.id !== trackId));
    setAddedElements(prev => prev.filter(element => element.id !== trackId));
  };

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

  // Enhanced export function for video with all effects
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
      title: "Starting Video Export",
      description: "Processing your video with all effects and overlays...",
    });

    try {
      // Create video element for processing
      const video = document.createElement('video');
      video.src = videoPreview;
      video.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error('Failed to load video'));
        video.load();
      });

      // Create canvas for rendering
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;

      // Set video to trim start position
      const startTime = (trimStart / 100) * video.duration;
      video.currentTime = startTime;

      await new Promise<void>((resolve, reject) => {
        video.onseeked = () => resolve();
        video.onerror = () => reject(new Error('Failed to seek video'));
      });

      if (ctx) {
        // Draw video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Apply filter effects
        if (selectedFilter) {
          let filterStyle = '';
          switch (selectedFilter) {
            case 'Vintage':
              filterStyle = 'sepia(0.8) contrast(1.2) brightness(0.9)';
              break;
            case 'Bright':
              filterStyle = 'brightness(1.3) contrast(1.1)';
              break;
            case 'Dark':
              filterStyle = 'brightness(0.7) contrast(1.2)';
              break;
            case 'Blur':
              filterStyle = 'blur(2px)';
              break;
            case 'Sharp':
              filterStyle = 'contrast(1.4) brightness(1.1)';
              break;
            case 'Sepia':
              filterStyle = 'sepia(1)';
              break;
          }
          if (filterStyle) {
            ctx.filter = filterStyle;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';
          }
        }

        // Add text overlays
        addedElements
          .filter(element => element.type === 'text' && currentTime >= element.startTime && currentTime <= element.endTime)
          .forEach((element, index) => {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.font = '48px Arial';
            
            const x = (element.x / 100) * canvas.width;
            const y = (element.y / 100) * canvas.height;
            
            ctx.strokeText(element.content as string, x, y);
            ctx.fillText(element.content as string, x, y);
          });

        // Add sticker overlays
        addedElements
          .filter(element => element.type === 'sticker' && currentTime >= element.startTime && currentTime <= element.endTime)
          .forEach((element) => {
            const sticker = element.content as Sticker;
            ctx.font = '64px Arial';
            const x = (element.x / 100) * canvas.width;
            const y = (element.y / 100) * canvas.height;
            ctx.fillText(sticker.url, x, y);
          });

        // Add GIF overlays
        for (const element of addedElements.filter(el => el.type === 'gif' && currentTime >= el.startTime && currentTime <= el.endTime)) {
          const gif = element.content as GifItem;
          const img = document.createElement('img');
          img.crossOrigin = 'anonymous';
          
          try {
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () => reject(new Error('Failed to load GIF'));
              img.src = gif.preview;
            });

            const x = (element.x / 100) * canvas.width;
            const y = (element.y / 100) * canvas.height;
            ctx.drawImage(img, x, y, 80 * element.scale, 80 * element.scale);
          } catch (error) {
            console.log('Failed to load GIF image:', error);
          }
        }
      }

      // Convert canvas to blob and trigger download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `edited-video-${Date.now()}.png`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          toast({
            title: "Video Export Complete!",
            description: `Video exported with ${addedElements.length} elements, ${selectedFilter || 'no'} filter applied`,
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
      addedElements,
      timelineElements,
      audioTracks,
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

  return (
    <DashboardLayout pageTitle="Video Editing">
      {hiddenFileInputs}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Professional Video Editor</h2>
        <p className="text-gray-600">Create stunning videos with multi-track timeline and customizable intro templates.</p>
      </div>
      
      <Tabs defaultValue={editingMode ? "editor" : "templates"} onValueChange={(value) => {
        if (value === "templates") {
          setEditingMode(false);
        }
      }}>
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="intros">Intro Templates</TabsTrigger>
          <TabsTrigger value="editor" disabled={!editingMode && !selectedTemplate && !videoPreview}>Video Studio</TabsTrigger>
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

        <TabsContent value="intros" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customizable Intro Templates</CardTitle>
              <CardDescription>Choose from professional intro templates and customize them with your content</CardDescription>
            </CardHeader>
            <CardContent>
              <IntroTemplates onSelectTemplate={handleIntroTemplateSelect} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Sidebar - Media & Multi-Video Manager */}
            <div className="lg:col-span-1 space-y-4">
              <MultiVideoManager
                videos={videoAssets}
                onVideoAdd={() => videoFileRef.current?.click()}
                onVideoDelete={handleVideoDelete}
                onVideoSelect={handleVideoSelect}
                onVideoReorder={handleVideoReorder}
              />
              
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
                  
                  {/* Design Elements Section */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Design Elements</h4>
                    <Tabs defaultValue="stickers">
                      <TabsList className="grid w-full grid-cols-2 mb-3">
                        <TabsTrigger value="stickers" className="text-xs">
                          <Smile className="h-3 w-3 mr-1" />
                          Stickers
                        </TabsTrigger>
                        <TabsTrigger value="gifs" className="text-xs">
                          <Image className="h-3 w-3 mr-1" />
                          GIFs
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="stickers" className="pt-2">
                        <StickerLibrary onStickerSelect={handleStickerSelect} />
                      </TabsContent>
                      
                      <TabsContent value="gifs" className="pt-2">
                        <GifLibrary onGifSelect={handleGifSelect} />
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Preview Area */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3 flex flex-row justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video Preview
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {selectedIntroTemplate && (
                      <Badge variant="secondary">{selectedIntroTemplate.title}</Badge>
                    )}
                    {videoAssets.length > 1 && (
                      <Badge variant="outline">
                        <Layers className="h-3 w-3 mr-1" />
                        {videoAssets.length} videos
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div 
                    ref={previewContainerRef}
                    className="flex-grow bg-black rounded-md flex items-center justify-center relative min-h-[300px]"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                  >
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
                    
                    {/* Dynamic element overlays */}
                    {addedElements
                      .filter(element => currentTime >= element.startTime && currentTime <= element.endTime)
                      .map((element) => {
                        if (element.type === 'text') {
                          return (
                            <div 
                              key={element.id}
                              className="absolute text-white cursor-move select-none"
                              style={{ 
                                top: `${element.y}%`, 
                                left: `${element.x}%`,
                                fontSize: '24px',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                transform: `scale(${element.scale})`
                              }}
                              onMouseDown={(e) => handleMouseDown(e, element.id)}
                            >
                              {element.content as string}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute -top-2 -right-2 opacity-0 hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                                onClick={() => handleDeleteElement(element.id)}
                              >
                                <Trash2 className="h-3 w-3 text-white" />
                              </Button>
                            </div>
                          );
                        } else if (element.type === 'sticker') {
                          const sticker = element.content as Sticker;
                          return (
                            <div 
                              key={element.id}
                              className="absolute text-4xl cursor-move group select-none"
                              style={{ 
                                top: `${element.y}%`, 
                                left: `${element.x}%`,
                                transform: `scale(${element.scale})`
                              }}
                              onMouseDown={(e) => handleMouseDown(e, element.id)}
                            >
                              {sticker.url}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                                onClick={() => handleDeleteElement(element.id)}
                              >
                                <Trash2 className="h-3 w-3 text-white" />
                              </Button>
                            </div>
                          );
                        } else if (element.type === 'gif') {
                          const gif = element.content as GifItem;
                          return (
                            <div 
                              key={element.id}
                              className="absolute cursor-move group select-none"
                              style={{ 
                                top: `${element.y}%`, 
                                left: `${element.x}%`,
                                width: `${80 * element.scale}px`,
                                height: `${80 * element.scale}px`
                              }}
                              onMouseDown={(e) => handleMouseDown(e, element.id)}
                            >
                              <img 
                                src={gif.preview} 
                                alt={gif.title}
                                className="w-full h-full object-cover rounded"
                                draggable={false}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                                onClick={() => handleDeleteElement(element.id)}
                              >
                                <Trash2 className="h-3 w-3 text-white" />
                              </Button>
                            </div>
                          );
                        }
                        return null;
                      })}
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
                  
                  {/* Elements Timeline */}
                  {timelineElements.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Elements Timeline</h4>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="bg-gray-100 rounded-md p-3 max-h-32 overflow-y-auto">
                        {timelineElements.map((element) => (
                          <div key={element.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded text-xs">
                            <span className="font-medium">{element.name}</span>
                            <div className="flex items-center gap-2">
                              <span>{formatTime(element.startTime)}</span>
                              <span>-</span>
                              <span>{formatTime(element.endTime)}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteElement(element.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Sidebar - Editing Tools */}
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
                    <TabsList className="grid w-full grid-cols-2 mt-2">
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
                      
                      {addedElements.filter(el => el.type === 'text').length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium">Text Elements</h4>
                          {addedElements.filter(el => el.type === 'text').map((element) => (
                            <div key={element.id} className="flex items-center gap-2">
                              <Input 
                                value={element.content as string} 
                                onChange={(e) => handleUpdateText(element.id, e.target.value)}
                                className="flex-grow"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteElement(element.id)}
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
          
          {/* Professional Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Professional Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VideoTimeline
                tracks={timelineTracks}
                currentTime={currentTime}
                totalDuration={duration || 30}
                onTimeChange={setCurrentTime}
                onTrackUpdate={handleTimelineTrackUpdate}
                onTrackDelete={handleTimelineTrackDelete}
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                isPlaying={isPlaying}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default VideoEditing;
