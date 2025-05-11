import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 2;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-lifelink-600 to-health-600 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex-1 flex flex-col items-center">
          <p className="font-medium">
            <span className="hidden sm:inline">⚠️ Please note: </span>
            Our database may take up to 50 seconds to load donor and request data.
            <span className="hidden sm:inline"> Thank you for your patience!</span>
          </p>
          
          <div className="w-full max-w-md mt-1 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
        
        <button 
          onClick={() => setVisible(false)}
          className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;