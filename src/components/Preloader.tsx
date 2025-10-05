import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md px-8">
        <div className="mb-8 text-center">
          <h1 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-6xl sm:text-7xl tracking-tight mb-2">
            OLU
          </h1>
          <p className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-500 tracking-wider">
            PRODUCT DESIGNER
          </p>
        </div>

        <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-black rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-center">
          <span className="[font-family:'Sometype_Mono',Helvetica] text-xs text-gray-400 tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
