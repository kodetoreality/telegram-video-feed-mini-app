import React, { useRef, useState, useEffect } from 'react';
import { Video } from '../types';
import { formatNumber, formatDuration } from '../utils/formatter';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  index: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use intersection observer to auto-play when in view
  const [containerRef, isInView] = useIntersectionObserver<HTMLDivElement>(
    { threshold: 0.7 },
    () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Auto-play was prevented
        });
        setIsPlaying(true);
      }
    }
  );

  useEffect(() => {
    if (!isInView && isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isInView, isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Playback prevented by browser
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleGameLink = () => {
    window.open('https://magenta-cendol-1287e0.netlify.app/', '_blank');
  };

  const hasEvenIndex = index % 2 === 0;
  const animationClass = hasEvenIndex 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-6 ${animationClass}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={video.url}
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Video controls overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-between items-center">
            <div className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm">
              {formatDuration(video.duration)}
            </div>
            <button 
              onClick={handleGameLink}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 rounded-full text-white text-sm hover:bg-blue-600 transition-colors"
            >
              <ExternalLink size={16} />
              Play Game
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePlayPause}
              className="rounded-full p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              {isPlaying ? <Pause size={20} color="white" /> : <Play size={20} color="white" />}
            </button>

            <button 
              onClick={handleMuteToggle}
              className="rounded-full p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-blue-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{video.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{video.description}</p>
        
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span className="text-red-500">❤</span> {formatNumber(video.likes)}
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span> {formatNumber(video.views)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;