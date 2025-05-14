import React from 'react';
import Header from './components/Header';
import VideoFeed from './components/VideoFeed';
import { videos } from './data/videos';
import { useTheme } from './hooks/useTheme';
import './styles/animations.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <VideoFeed initialVideos={videos} />
    </div>
  );
}

export default App;