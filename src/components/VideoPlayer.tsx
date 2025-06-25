import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Play, Pause, Volume2, Volume1, VolumeX, Fullscreen, Settings, Subtitles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format time from seconds to MM:SS or HH:MM:SS
const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds)) {
    return '00:00';
  }
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return `${formattedMinutes}:${formattedSeconds}`;
};


interface SubtitleTrack {
  src: string;
  lang: string;
  label: string;
  default?: boolean;
}

interface VideoQuality {
  label: string;
  src: string;
}

interface VideoPlayerProps {
  sources: VideoQuality[];
  poster?: string;
  subtitles?: SubtitleTrack[];
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  initialTime?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  poster,
  subtitles = [],
  onTimeUpdate,
  onEnded,
  initialTime = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [activeQuality, setActiveQuality] = useState(sources[0]);

  console.log('VideoPlayer loaded');

  // Effect to handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        if (onTimeUpdate) {
            onTimeUpdate(video.currentTime);
        }
    };
    const handleVideoEnd = () => {
        setIsPlaying(false);
        if (onEnded) onEnded();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    // Set initial time
    video.currentTime = initialTime;

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [onTimeUpdate, onEnded, initialTime, activeQuality.src]); // Re-run if source changes

  // Control visibility timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const container = playerContainerRef.current;
    if (!container) return;
    
    const showControls = () => {
      setIsControlsVisible(true);
      clearTimeout(timeoutId);
      if (isPlaying) {
        timeoutId = setTimeout(() => setIsControlsVisible(false), 3000);
      }
    };

    container.addEventListener('mousemove', showControls);
    return () => container.removeEventListener('mousemove', showControls);
  }, [isPlaying]);


  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(e => console.error("Error playing video:", e));
      } else {
        video.pause();
      }
    }
  }, []);

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (video) {
      const newTime = (value[0] / 100) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (video) {
      const newVolume = value[0];
      video.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
      const video = videoRef.current;
      if (video) {
          video.muted = !isMuted;
          setIsMuted(!isMuted);
          if(!isMuted) setVolume(0); else setVolume(video.volume > 0 ? video.volume : 0.5);
      }
  }

  const toggleFullScreen = () => {
    const container = playerContainerRef.current;
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  const handleQualityChange = (quality: VideoQuality) => {
    if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        setActiveQuality(quality);
        // We need to re-apply the time after the source changes
        setTimeout(() => {
            if(videoRef.current) {
                videoRef.current.currentTime = currentTime;
                if(isPlaying) videoRef.current.play();
            }
        }, 100);
    }
  };


  return (
    <div ref={playerContainerRef} className="relative w-full aspect-video bg-black group" onMouseLeave={() => isPlaying && setIsControlsVisible(false)}>
      <video
        ref={videoRef}
        src={activeQuality.src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlayPause}
        onDoubleClick={toggleFullScreen}
      >
        {subtitles.map((track) => (
          <track
            key={track.lang}
            kind="subtitles"
            src={track.src}
            srcLang={track.lang}
            label={track.label}
            default={track.default}
          />
        ))}
        Your browser does not support the video tag.
      </video>

      <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300", isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100')}>
         <Button variant="ghost" size="icon" className="w-20 h-20" onClick={togglePlayPause}>
            {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
         </Button>
      </div>

      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300',
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress Bar */}
        <Slider
          value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
          onValueChange={handleSeek}
          className="w-full h-2 cursor-pointer"
        />

        {/* Controls */}
        <div className="flex items-center justify-between mt-2 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : volume > 0.5 ? <Volume2 className="w-6 h-6" /> : <Volume1 className="w-6 h-6" />}
                </Button>
                <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.05}
                    className="w-24"
                />
            </div>
            <span className="text-sm font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon"><Settings className="w-6 h-6" /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 bg-black/80 border-gray-700 text-white">
                    <div className="grid gap-4">
                       <div className="space-y-2">
                           <h4 className="font-medium leading-none text-sm">Quality</h4>
                           <div className="flex flex-col items-start">
                           {sources.map(q => (
                               <Button key={q.label} variant="ghost" className={cn("w-full justify-start", activeQuality.label === q.label && "font-bold text-primary")} onClick={() => handleQualityChange(q)}>{q.label}</Button>
                           ))}
                           </div>
                       </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
              <Fullscreen className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;