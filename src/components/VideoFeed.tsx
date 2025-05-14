import React, { useState, useCallback, useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import { Video } from '../types';
import { Loader } from 'lucide-react';

interface VideoFeedProps {
  initialVideos: Video[];
}

const VideoFeed: React.FC<VideoFeedProps> = ({ initialVideos }) => {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  // Simulate loading more videos with reduced timeout
  const loadMoreVideos = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    
    // Reduced timeout from 1500ms to 300ms for faster loading
    setTimeout(() => {
      const newVideos = [...initialVideos].map((video) => ({
        ...video,
        id: `${video.id}-${Date.now()}`,
      }));
      
      setVideos(prevVideos => [...prevVideos, ...newVideos]);
      setLoading(false);
    }, 300);
  }, [loading, initialVideos]);
  
  // Set up intersection observer for infinite scrolling
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [loadMoreVideos, loading]);
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {videos.map((video, index) => (
        <VideoPlayer key={video.id} video={video} index={index} />
      ))}
      
      <div 
        ref={loaderRef} 
        className="flex justify-center items-center py-8"
      >
        {loading && (
          <div className="flex flex-col items-center">
            <Loader size={24} className="text-blue-500 animate-spin" />
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Loading more videos...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;