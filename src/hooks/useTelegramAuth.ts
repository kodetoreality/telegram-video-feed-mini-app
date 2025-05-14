import { useState, useEffect } from "react";
import { TelegramUser } from "../types";
import { initTelegramWebApp } from "../utils";

// Custom hook to handle Telegram WebApp authentication
const useTelegramAuth = (): { user: TelegramUser | null; isLoading: boolean } => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        // Initialize Telegram WebApp
        initTelegramWebApp();
        
        // Get user data from Telegram WebApp
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
          setUser(window.Telegram.WebApp.initDataUnsafe.user);
        } else {
          // For development outside of Telegram, create a mock user
          setUser({
            id: 12345,
            first_name: "Test",
            last_name: "User",
            username: "testuser",
          });
        }
      } catch (error) {
        console.error("Failed to initialize Telegram WebApp:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  return { user, isLoading };
};

export default useTelegramAuth;