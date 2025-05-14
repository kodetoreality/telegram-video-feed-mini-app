import React, { useRef, useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { Loader } from "lucide-react";

const VideoFeed: React.FC = () => {
  const {
    videos,
    loadMore,
    currentIndex,
    setCurrentIndex,
    lastVideoRef,
  } = useInfiniteScroll();
  
  const feedRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll to determine current video
  useEffect(() => {
    const handleScroll = () => {
      if (!feedRef.current) return;
      
      setIsScrolling(true);
      
      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set a timeout to detect when scrolling has stopped
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        
        // Find the video that is most visible in the viewport
        const videoElements = feedRef.current?.querySelectorAll('video') || [];
        let maxVisibleArea = 0;
        let mostVisibleIndex = currentIndex;
        
        videoElements.forEach((video) => {
          const rect = video.getBoundingClientRect();
          const videoIndex = parseInt(video.getAttribute('data-index') || '0', 10);
          
          // Calculate how much of the video is visible in the viewport
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          const visibleArea = visibleHeight > 0 ? visibleHeight / rect.height : 0;
          
          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            mostVisibleIndex = videoIndex;
          }
        });
        
        setCurrentIndex(mostVisibleIndex);
      }, 150);
    };
    
    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (feedElement) {
        feedElement.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentIndex, setCurrentIndex]);

  return (
    <div 
      ref={feedRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          ref={index === videos.length - 1 ? lastVideoRef : undefined}
          className="h-full w-full snap-start snap-always"
        >
          <VideoPlayer
            video={video}
            isActive={currentIndex === index && !isScrolling}
            index={index}
          />
        </div>
      ))}
      
      {/* Loading indicator */}
      {videos.length > 0 && (
        <div className="flex justify-center items-center py-4">
          <Loader className="animate-spin text-white" size={24} />
        </div>
      )}
    </div>
  );
};

export default VideoFeed;