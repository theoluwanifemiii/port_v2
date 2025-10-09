import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-all duration-700 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
            <circle cx="75" cy="75" r="60" fill="#0054e3" opacity="0.2"/>
            <circle cx="75" cy="75" r="45" fill="#0054e3" opacity="0.4"/>
            <circle cx="75" cy="75" r="30" fill="#0054e3" opacity="0.6"/>
            <rect x="50" y="60" width="50" height="35" rx="3" fill="#ece9d8"/>
            <rect x="50" y="60" width="50" height="12" rx="3" fill="url(#xp-gradient)"/>
            <rect x="55" y="75" width="40" height="3" fill="#c0c0c0"/>
            <rect x="55" y="82" width="40" height="3" fill="#c0c0c0"/>
            <defs>
              <linearGradient id="xp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0997ff"/>
                <stop offset="100%" stopColor="#0053ee"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-bold text-white text-4xl mb-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            Microsoft Windows XP
          </h1>
          <p className="text-white text-sm" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            Professional
          </p>
        </div>

        <div className="w-64 h-3 bg-[#003da8] rounded-full overflow-hidden border border-[#002d7a]">
          <div className="h-full bg-gradient-to-r from-[#0054e3] via-[#5a7fdc] to-[#0054e3] animate-[windowsXpLoad_2s_ease-in-out_infinite]"></div>
        </div>

        <p className="mt-8 text-white text-xs" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
          Loading Olu's Portfolio...
        </p>
      </div>
    </div>
  );
};
