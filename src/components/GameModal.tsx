import React, { useRef, useEffect, useState } from "react";
import { X, Share2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { GAME_URL } from "../constants";
import { shareViaTelegram, createShareLink } from "../utils";

const GameModal: React.FC = () => {
  const { isGameModalOpen, closeGameModal, currentVideo } = useAppContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Handle iframe load event
  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (!iframe) return;
    
    const handleLoad = () => {
      setIsLoading(false);
    };
    
    iframe.addEventListener('load', handleLoad);
    
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [isGameModalOpen]);
  
  // Reset loading state when modal is opened
  useEffect(() => {
    if (isGameModalOpen) {
      setIsLoading(true);
    }
  }, [isGameModalOpen]);
  
  // Share the game via Telegram
  const handleShare = () => {
    if (currentVideo) {
      const shareLink = createShareLink(currentVideo.id);
      shareViaTelegram(`Challenge me in this game! ${shareLink}`);
    }
  };
  
  if (!isGameModalOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h2 className="text-lg font-bold">Game Challenge</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-blue-600 text-white"
            aria-label="Share"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={closeGameModal}
            className="p-2 rounded-full bg-gray-700 text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Game Container */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white">Loading game...</p>
            </div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          src={GAME_URL}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GameModal;