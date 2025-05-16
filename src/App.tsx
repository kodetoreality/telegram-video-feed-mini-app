import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import VideoFeed from './components/VideoFeed';
import GameModal from './components/GameModal';
import Header from './components/Header';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const { isReady } = useTelegram();

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <VideoFeed />
        <GameModal />
      </div>
    </AppProvider>
  );
}

export default App