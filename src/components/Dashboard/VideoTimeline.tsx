
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Scissors, Trash2, Move } from 'lucide-react';

export interface TimelineTrack {
  id: string;
  type: 'video' | 'audio' | 'text' | 'sticker' | 'gif';
  name: string;
  startTime: number;
  duration: number;
  url?: string;
  content?: any;
  color: string;
}

interface VideoTimelineProps {
  tracks: TimelineTrack[];
  currentTime: number;
  totalDuration: number;
  onTimeChange: (time: number) => void;
  onTrackUpdate: (trackId: string, updates: Partial<TimelineTrack>) => void;
  onTrackDelete: (trackId: string) => void;
  onPlay: () => void;
  onPause: () => void;
  isPlaying: boolean;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({
  tracks,
  currentTime,
  totalDuration,
  onTimeChange,
  onTrackUpdate,
  onTrackDelete,
  onPlay,
  onPause,
  isPlaying
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [draggedTrack, setDraggedTrack] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeFromPosition = (x: number): number => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const percentage = (x - rect.left) / rect.width;
    return Math.max(0, Math.min(totalDuration, percentage * totalDuration));
  };

  const getPositionFromTime = (time: number): number => {
    return (time / totalDuration) * 100;
  };

  const handleTrackDragStart = (e: React.MouseEvent, trackId: string) => {
    e.preventDefault();
    const track = tracks.find(t => t.id === trackId);
    if (!track || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackStartX = (track.startTime / totalDuration) * rect.width;
    
    setDraggedTrack(trackId);
    setDragOffset(clickX - trackStartX);
  };

  const handleTrackDrag = (e: React.MouseEvent) => {
    if (!draggedTrack || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset;
    const newStartTime = Math.max(0, (newX / rect.width) * totalDuration);

    onTrackUpdate(draggedTrack, { startTime: newStartTime });
  };

  const handleTrackDragEnd = () => {
    setDraggedTrack(null);
    setDragOffset(0);
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (draggedTrack) return;
    const newTime = getTimeFromPosition(e.clientX);
    onTimeChange(newTime);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedTrack) {
        handleTrackDrag(e as any);
      }
    };

    const handleMouseUp = () => {
      handleTrackDragEnd();
    };

    if (draggedTrack) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedTrack]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPlay}
            className="text-white hover:bg-gray-700"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={isPlaying ? onPause : onPlay}
            className="text-white hover:bg-gray-700"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPause}
            className="text-white hover:bg-gray-700"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-sm">
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </div>
      </div>

      {/* Time Ruler */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i}>{formatTime((i / 10) * totalDuration)}</span>
          ))}
        </div>
        <div className="h-2 bg-gray-700 rounded relative">
          {Array.from({ length: 11 }, (_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-full bg-gray-500"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Timeline Tracks */}
      <div 
        ref={timelineRef}
        className="relative bg-gray-800 rounded min-h-[200px] p-2 cursor-pointer"
        onClick={handleTimelineClick}
        style={{ userSelect: 'none' }}
      >
        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
          style={{ left: `${getPositionFromTime(currentTime)}%` }}
        />

        {/* Track Lanes */}
        {Array.from({ length: 5 }, (_, laneIndex) => (
          <div key={laneIndex} className="relative h-12 border-b border-gray-700 last:border-b-0">
            <div className="absolute left-0 top-2 text-xs text-gray-400 w-16">
              Track {laneIndex + 1}
            </div>
            
            {tracks
              .filter(track => Math.floor(track.startTime / 20) % 5 === laneIndex)
              .map(track => (
                <div
                  key={track.id}
                  className={`absolute top-1 h-10 rounded cursor-move flex items-center px-2 text-xs font-medium shadow-lg ${
                    draggedTrack === track.id ? 'opacity-70' : ''
                  }`}
                  style={{
                    left: `${getPositionFromTime(track.startTime)}%`,
                    width: `${(track.duration / totalDuration) * 100}%`,
                    backgroundColor: track.color,
                    minWidth: '60px'
                  }}
                  onMouseDown={(e) => handleTrackDragStart(e, track.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate flex-1">{track.name}</span>
                    <div className="flex items-center gap-1 ml-2">
                      <Move className="h-3 w-3" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-black/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTrackDelete(track.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}

        {/* Grid Lines */}
        {Array.from({ length: 21 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gray-600 opacity-30"
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Timeline Scrubber */}
      <div className="mt-4">
        <Slider
          value={[currentTime]}
          max={totalDuration}
          step={0.1}
          onValueChange={(value) => onTimeChange(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VideoTimeline;
