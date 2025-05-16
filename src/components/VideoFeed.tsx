import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import VideoCard from './VideoCard';
import { useTelegram } from '../hooks/useTelegram';
import { getMoreVideos } from '../data/videos';

const VideoFeed: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { params, isReady } = useTelegram();
  const [height, setHeight] = useState<number>(window.innerHeight);
  const feedRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!feedRef.current) return;
      
      const scrollTop = feedRef.current.scrollTop;
      const itemHeight = height;
      const index = Math.round(scrollTop / itemHeight);
      
      if (index !== state.currentVideoIndex && index >= 0 && index < state.videos.length) {
        dispatch({ type: 'SET_CURRENT_VIDEO_INDEX', payload: index });
      }

      // Load more videos when near the bottom
      const scrollHeight = feedRef.current.scrollHeight;
      const clientHeight = feedRef.current.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - (clientHeight * 0.5) && !isLoading) {
        setIsLoading(true);
        const newVideos = getMoreVideos();
        dispatch({ type: 'ADD_VIDEOS', payload: newVideos });
        setIsLoading(false);
      }
    };
    
    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
      return () => feedElement.removeEventListener('scroll', handleScroll);
    }
  }, [state.currentVideoIndex, state.videos.length, height, dispatch, isLoading]);
  
  const handleOpenGame = (gameUrl: string) => {
    dispatch({ type: 'OPEN_GAME_MODAL', payload: gameUrl });
  };

  useEffect(() => {
    console.log(params, 'params')
    if (isReady && params === 'auto') {
      dispatch({ type: 'OPEN_GAME_MODAL', payload: 'https://effortless-cendol-31ac0e.netlify.app' });
    }
  }, [isReady, params]);
  
  return (
    <div 
      ref={feedRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {state.videos.map((video, index) => (
        <div 
          key={video.id}
          className="w-full snap-start snap-always"
          style={{ height: `${height}px` }}
        >
          <VideoCard
            video={video}
            isActive={index === state.currentVideoIndex}
            onOpenGame={handleOpenGame}
          />
        </div>
      ))}
      {isLoading && (
        <div className="w-full h-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;