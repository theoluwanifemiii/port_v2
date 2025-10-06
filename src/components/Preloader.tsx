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
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-neutral-100 flex flex-col items-center justify-center transition-all duration-700 ${
        isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-black/10 rounded-full animate-spin-slow border-t-black"></div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-5xl tracking-tight mb-1">
            OLU
          </h1>
          <p className="[font-family:'Sometype_Mono',Helvetica] text-xs text-gray-500 tracking-wider uppercase">
            Product Designer
          </p>
        </div>
      </div>
    </div>
  );
};
