import React, { useRef, useEffect, useState } from 'react';
import { useDoubleTap } from '../hooks/useDoubleTap';

interface VideoPlayerProps {
  src: string;
  isActive: boolean;
  onDoubleTap: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, isActive, onDoubleTap }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { onTap } = useDoubleTap({ onDoubleTap });

  // Handle video visibility and playback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let playAttemptTimeout: NodeJS.Timeout;

    if (isActive) {
      // Delay play attempt slightly to ensure DOM is ready
      playAttemptTimeout = setTimeout(() => {
        if (videoElement) {
          const playPromise = videoElement.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(error => {
                console.error('Auto-play was prevented:', error);
                setIsPlaying(false);
              });
          }
        }
      }, 100);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }

    // Cleanup function
    return () => {
      clearTimeout(playAttemptTimeout);
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, [isActive]);

  // Load handler
  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden" 
      onClick={onTap}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        className={`absolute inset-0 w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        playsInline
        muted
        loop
        onLoadedData={handleLoadedData}
      />
      {!isActive && isLoaded && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <span className="text-white text-lg">Paused</span>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;