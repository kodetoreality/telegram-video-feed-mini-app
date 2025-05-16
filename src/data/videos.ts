import { Video } from '../types';

const generateId = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 1].replace('composited_video.m4v', '');
};

const videoUrls = [
  'https://d1uz400jez5i0o.cloudfront.net/1725406911composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725416899composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725418700composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725421263composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725483901composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725485800composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725736110composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725743026composited_video.m4v',
  'https://d1uz400jez5i0o.cloudfront.net/1725745717composited_video.m4v',
];

export const videos: Video[] = videoUrls.map((url) => ({
  id: generateId(url),
  url,
  gameUrl: '/games/game1.html', // All videos now point to the working game
}));

// Function to get more videos (reuses the same videos for infinite scroll)
export const getMoreVideos = (): Video[] => {
  return videoUrls.map((url) => ({
    id: generateId(url) + Date.now(), // Add timestamp to ensure unique IDs
    url,
    gameUrl: '/games/game1.html',
  }));
};