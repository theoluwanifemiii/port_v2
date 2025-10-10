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
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-all duration-700 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12 relative">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="animate-pulse">
            <defs>
              <linearGradient id="flag-red" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0000"/>
                <stop offset="100%" stopColor="#cc0000"/>
              </linearGradient>
              <linearGradient id="flag-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff00"/>
                <stop offset="100%" stopColor="#00cc00"/>
              </linearGradient>
              <linearGradient id="flag-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0000ff"/>
                <stop offset="100%" stopColor="#0000cc"/>
              </linearGradient>
              <linearGradient id="flag-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffff00"/>
                <stop offset="100%" stopColor="#cccc00"/>
              </linearGradient>
            </defs>

            <rect x="40" y="40" width="60" height="60" fill="url(#flag-red)"/>
            <rect x="100" y="40" width="60" height="60" fill="url(#flag-green)"/>
            <rect x="40" y="100" width="60" height="60" fill="url(#flag-blue)"/>
            <rect x="100" y="100" width="60" height="60" fill="url(#flag-yellow)"/>
          </svg>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-bold text-white text-4xl mb-2 tracking-wide" style={{ fontFamily: 'Tahoma, Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Microsoft<sup style={{ fontSize: '0.6em' }}>®</sup> Windows<sup style={{ fontSize: '0.6em' }}>®</sup> XP
          </h1>
          <p className="text-white text-base font-normal" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            Professional
          </p>
        </div>

        <div className="w-72 bg-[#1e4db5] h-4 rounded-sm overflow-hidden border border-[#002d7a] shadow-lg relative">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-gradient-to-r from-[#0054e3] to-[#5a7fdc] animate-[windowsXpLoad_2.5s_ease-in-out_infinite]" style={{ width: '33%' }}></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>

        <p className="mt-10 text-white text-sm tracking-wide" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
          Please wait...
        </p>
      </div>
    </div>
  );
};
