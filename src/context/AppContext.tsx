import React, { createContext, useState, useContext, ReactNode } from "react";
import { AppContextType, Video, TelegramUser } from "../types";
import useTelegramAuth from "../hooks/useTelegramAuth";

// Create context with default values
const AppContext = createContext<AppContextType>({
  currentVideo: null,
  setCurrentVideo: () => {},
  isGameModalOpen: false,
  openGameModal: () => {},
  closeGameModal: () => {},
  user: null,
  isLoading: true,
});

// Hook to use the app context
export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState<boolean>(false);
  const { user, isLoading } = useTelegramAuth();

  const openGameModal = () => {
    setIsGameModalOpen(true);
  };

  const closeGameModal = () => {
    setIsGameModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentVideo,
        setCurrentVideo,
        isGameModalOpen,
        openGameModal,
        closeGameModal,
        user,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};