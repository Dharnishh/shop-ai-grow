
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileVideo, Plus, Trash2, Eye, Move, Clock } from 'lucide-react';

export interface VideoAsset {
  id: string;
  name: string;
  url: string;
  duration: number;
  thumbnail?: string;
  position: number;
  isActive: boolean;
}

interface MultiVideoManagerProps {
  videos: VideoAsset[];
  onVideoAdd: () => void;
  onVideoDelete: (videoId: string) => void;
  onVideoSelect: (videoId: string) => void;
  onVideoReorder: (fromIndex: number, toIndex: number) => void;
}

const MultiVideoManager: React.FC<MultiVideoManagerProps> = ({
  videos,
  onVideoAdd,
  onVideoDelete,
  onVideoSelect,
  onVideoReorder
}) => {
  const [draggedVideo, setDraggedVideo] = useState<string | null>(null);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDragStart = (e: React.DragEvent, videoId: string) => {
    setDraggedVideo(videoId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetVideoId: string) => {
    e.preventDefault();
    if (!draggedVideo || draggedVideo === targetVideoId) return;

    const draggedIndex = videos.findIndex(v => v.id === draggedVideo);
    const targetIndex = videos.findIndex(v => v.id === targetVideoId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      onVideoReorder(draggedIndex, targetIndex);
    }

    setDraggedVideo(null);
  };

  const totalDuration = videos.reduce((total, video) => total + video.duration, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileVideo className="h-5 w-5" />
            Video Sequence
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {formatDuration(totalDuration)} total
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              draggable
              onDragStart={(e) => handleDragStart(e, video.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, video.id)}
              className={`
                p-3 border rounded-md flex items-center justify-between transition-all cursor-move
                ${video.isActive ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}
                ${draggedVideo === video.id ? 'opacity-50' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {index + 1}
                  </Badge>
                  <Move className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="w-12 h-8 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <FileVideo className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium truncate">{video.name}</p>
                  <p className="text-xs text-gray-500">{formatDuration(video.duration)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVideoSelect(video.id)}
                  className={`h-8 w-8 p-0 ${video.isActive ? 'bg-blue-100' : ''}`}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVideoDelete(video.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {videos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileVideo className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No videos added yet</p>
              <p className="text-xs">Add videos to start creating your sequence</p>
            </div>
          )}
        </div>
        
        {/* Add Video Button */}
        <Button
          onClick={onVideoAdd}
          className="w-full"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Video to Sequence
        </Button>
        
        {/* Sequence Info */}
        {videos.length > 0 && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <p>Video sequence: {videos.length} clip{videos.length !== 1 ? 's' : ''}</p>
            <p>Total duration: {formatDuration(totalDuration)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MultiVideoManager;
