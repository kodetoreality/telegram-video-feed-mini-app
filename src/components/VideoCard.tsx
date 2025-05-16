import React, { useEffect } from 'react';
import { Video } from '../types';
import VideoPlayer from './VideoPlayer';
import { Share2 } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { useAppContext } from '../context/AppContext';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onOpenGame: (gameUrl: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, onOpenGame }) => {
  const { shareGame } = useTelegram();
  const { dispatch } = useAppContext();
  
  const handleDoubleTap = () => {
    if (video.gameUrl) {
      dispatch({ type: 'OPEN_GAME_MODAL', payload: 'https://effortless-cendol-31ac0e.netlify.app/' });
    }
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.gameUrl) {
      shareGame('https://effortless-cendol-31ac0e.netlify.app/');
    }
  };
  
  return (
    <div className="relative w-full h-full bg-black">
      <VideoPlayer
        src={video.url}
        isActive={isActive}
        onDoubleTap={handleDoubleTap}
      />
      
      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm opacity-80">Double-tap to play game</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={handleShare}
              className="bg-gray-800 bg-opacity-50 p-2 rounded-full transition-transform hover:scale-110"
              aria-label="Share game"
            >
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;