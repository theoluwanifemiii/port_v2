import { FC, useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: FC<BootSequenceProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 2000);
    const timer3 = setTimeout(() => setStage(3), 3500);
    const timer4 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {stage >= 0 && (
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-blue-500 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect width="35" height="35" fill="#f25022"/>
                  <rect x="45" width="35" height="35" fill="#7fba00"/>
                  <rect y="45" width="35" height="35" fill="#00a4ef"/>
                  <rect x="45" y="45" width="35" height="35" fill="#ffb900"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        {stage >= 1 && (
          <div className="text-white font-mono">
            <p className="text-2xl mb-4" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              Microsoft Windows XP
            </p>
            <p className="text-sm text-gray-400">
              Professional Edition
            </p>
          </div>
        )}

        {stage >= 2 && (
          <div className="mt-8">
            <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-white text-xs mt-4" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              Starting Windows{dots}
            </p>
          </div>
        )}

        {stage >= 3 && (
          <div className="mt-8 text-gray-500 text-xs animate-pulse">
            <p>Copyright © Microsoft Corporation</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};
