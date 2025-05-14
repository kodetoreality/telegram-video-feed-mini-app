// List of video URLs from CDN
export const VIDEOS: string[] = [
  "https://d1uz400jez5i0o.cloudfront.net/1725406911composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725416899composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725418700composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725421263composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725483901composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725485800composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725736110composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725743026composited_video.m4v",
  "https://d1uz400jez5i0o.cloudfront.net/1725745717composited_video.m4v",
];

// Game URL to be loaded in iframe
export const GAME_URL = "https://magenta-cendol-1287e0.netlify.app/";

// Number of videos to load at once
export const BATCH_SIZE = 3;

// Intersection observer options
export const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: "100px",
  threshold: 0.1,
};

// Function to get a batch of videos starting from a specific index
export const getVideoBatch = (startIndex: number, batchSize: number) => {
  const videos = [];
  for (let i = 0; i < batchSize; i++) {
    const index = (startIndex + i) % VIDEOS.length;
    videos.push({
      id: `video-${startIndex + i}`,
      url: VIDEOS[index]
    });
  }
  return videos;
};