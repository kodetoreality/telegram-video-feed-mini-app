import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Video } from "../types";
import { formatTime } from "../utils";
import { useAppContext } from "../context/AppContext";

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  index: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const { setCurrentVideo, openGameModal } = useAppContext();
  const lastTapTimeRef = useRef<number>(0);
  
  // Handle video playback based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isActive && videoRef.current.paused) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.error("Video play error:", error));
      } else if (!isActive && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  // Update current time and duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.error("Video play error:", error));
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle progress bar change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle tap for double tap detection
  const handleTap = (e: React.TouchEvent) => {
    e.preventDefault();
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapTimeRef.current;
    
    if (timeSinceLastTap < 300) {
      // Double tap detected
      if (isActive) {
        setCurrentVideo(video);
        openGameModal();
      }
    }
    
    lastTapTimeRef.current = currentTime;
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        loop
        onTouchEnd={handleTap}
        data-index={index}
      />
      
      {/* Overlay controls */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
        
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>

      {/* Double-tap instructions */}
      <div className="absolute top-4 right-4 bg-black/30 text-white text-xs px-2 py-1 rounded-full">
        Double-tap to play game
      </div>
    </div>
  );
};

export default VideoPlayer;