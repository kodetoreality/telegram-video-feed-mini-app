import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Share2 } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

const GameModal: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { shareGame } = useTelegram();
  
  useEffect(() => {
    if (state.isGameModalOpen) {
      document.body.style.overflow = 'hidden';
      if (iframeRef.current) {
        iframeRef.current.src = state.currentGame || '';
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [state.isGameModalOpen, state.currentGame]);
  
  const handleClose = () => {
    dispatch({ type: 'CLOSE_GAME_MODAL' });
  };
  
  const handleIframeLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  };
  
  const handleShare = () => {
    if (state.currentGame) {
      shareGame(state.currentGame);
    }
  };
  
  if (!state.isGameModalOpen) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Loading game...</p>
            </div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleIframeLoad}
          title="Game"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        
        <div className="absolute top-4 right-4 z-20 flex space-x-4">
          <button 
            onClick={handleShare}
            className="bg-gray-800 hover:bg-gray-700 bg-opacity-70 p-2 rounded-full text-white transition-colors duration-200"
            aria-label="Share game"
          >
            <Share2 size={24} />
          </button>
          <button 
            onClick={handleClose}
            className="bg-gray-800 hover:bg-gray-700 bg-opacity-70 p-2 rounded-full text-white transition-colors duration-200"
            aria-label="Close game"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;