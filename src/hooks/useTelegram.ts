import { useEffect, useState } from 'react';
import { TelegramUser } from '../types';

interface TelegramWebApp {
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
  isExpanded: boolean;
  sendData: (data: any) => void;
  openTelegramLink: (url: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function useTelegram() {
  // Always initialize state hooks unconditionally
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [params, setParams] = useState<any>(null);

  // Single useEffect to handle all Telegram-related logic
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      // Initialize Telegram WebApp
      tg.ready();
      tg.expand();
      
      // Set user data if available
      if (tg.initDataUnsafe.user) {
        setUser({
          id: tg.initDataUnsafe.user.id,
          first_name: tg.initDataUnsafe.user.first_name,
          last_name: tg.initDataUnsafe.user.last_name,
          username: tg.initDataUnsafe.user.username,
          photo_url: tg.initDataUnsafe.user.photo_url,
        });
      }
      
      // Set start parameters if available
      const startParam = tg.initDataUnsafe?.start_param;
      if (startParam) {
        setParams(startParam);
      }
    } else {
      // Set mock data for development
      setUser({
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser',
      });
    }
    
    // Always set ready state last
    setIsReady(true);
  }, []); // Empty dependency array ensures effect runs once

  const shareGame = (gameUrl: string) => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(
          "https://t.me/simpleminiapp_bot/myapp?startapp=auto"
        )}&text=${encodeURIComponent("Try this game for fun!")}`
      );
    } else {
      console.log('Share game:', gameUrl);
    }
  };

  return { user, isReady, shareGame, params };
}