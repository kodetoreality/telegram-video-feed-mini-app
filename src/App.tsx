import React from "react";
import { AppProvider } from "./context/AppContext";
import { useAppContext } from "./context/AppContext";
import VideoFeed from "./components/VideoFeed";
import GameModal from "./components/GameModal";
import LoadingScreen from "./components/LoadingScreen";

// Main App wrapper component
const AppContent: React.FC = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <VideoFeed />
      <GameModal />
    </div>
  );
};

// Root component with provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;