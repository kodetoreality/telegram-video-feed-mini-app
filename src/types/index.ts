export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  gameUrl?: string;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface AppState {
  videos: Video[];
  currentVideoIndex: number;
  isGameModalOpen: boolean;
  currentGame: string | null;
  user: TelegramUser | null;
}