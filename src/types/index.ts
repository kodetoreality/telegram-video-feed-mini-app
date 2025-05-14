export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface AppContextType {
  currentVideo: Video | null;
  setCurrentVideo: (video: Video | null) => void;
  isGameModalOpen: boolean;
  openGameModal: () => void;
  closeGameModal: () => void;
  user: TelegramUser | null;
  isLoading: boolean;
}

// Declare the Telegram WebApp global interface
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        openLink: (url: string) => void;
        showAlert: (message: string) => void;
      };
    };
  }
}