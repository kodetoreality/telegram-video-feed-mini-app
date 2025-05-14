import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-white text-xl font-bold mb-2">Loading</h1>
        <p className="text-gray-300">Preparing your video experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;