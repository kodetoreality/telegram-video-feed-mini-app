export interface Video {
  id: string;
  url: string;
  title?: string;
  description?: string;
  likes: number;
  views: number;
  duration: number;
}

export type ThemeMode = 'light' | 'dark';