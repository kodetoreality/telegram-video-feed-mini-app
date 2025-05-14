import { Video } from "../types";
import { VIDEOS } from "../constants";

// Generate a unique ID for each video
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Get a batch of videos from the CDN list
export const getVideoBatch = (startIndex: number, batchSize: number): Video[] => {
  const videos: Video[] = [];
  
  for (let i = 0; i < batchSize; i++) {
    const index = (startIndex + i) % VIDEOS.length;
    videos.push({
      id: generateId(),
      url: VIDEOS[index],
    });
  }
  
  return videos;
};

// Create a deep link for sharing
export const createShareLink = (videoId: string): string => {
  // In a real app, this would create a deep link that could be shared via the Telegram bot
  // For this MVP, we'll just create a mock URL
  return `https://t.me/YourBot?start=video_${videoId}`;
};

// Check if the device is iOS
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

// Check if the device is Android
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

// Format time for video player (mm:ss)
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Handle Telegram WebApp initialization
export const initTelegramWebApp = (): void => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

// Share content via Telegram
export const shareViaTelegram = (text: string): void => {
  if (window.Telegram && window.Telegram.WebApp) {
    // In a real implementation, this would integrate with the Telegram Bot API
    window.Telegram.WebApp.openLink(`https://t.me/share/url?url=${encodeURIComponent(text)}`);
  }
};