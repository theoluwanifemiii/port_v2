import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md px-8 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-4 border-white/20 rounded-full animate-spin-slow border-t-white"></div>
          </div>
        </div>

        <div className="text-center">
          <p className="[font-family:'Neue_Montreal',Helvetica] font-bold text-white text-sm tracking-[0.2em] mb-2">
            DAILYMINIMAL
          </p>
          <p className="[font-family:'Neue_Montreal',Helvetica] text-white text-2xl font-bold tracking-wider">
            NO. 202
          </p>
          <p className="[font-family:'Neue_Montreal',Helvetica] text-white/60 text-xs tracking-[0.3em] mt-1">
            SERIE 2
          </p>
        </div>
      </div>
    </div>
  );
};
