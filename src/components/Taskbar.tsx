import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TaskbarProps {
  onStartMenuToggle: () => void;
  isStartMenuOpen: boolean;
  openWindows: string[];
}

export const Taskbar: FC<TaskbarProps> = ({
  onStartMenuToggle,
  isStartMenuOpen,
  openWindows,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 xp-taskbar px-2 py-1 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <button
          className={`xp-start-button flex items-center gap-1 px-3 py-1 ${
            isStartMenuOpen ? 'bg-[#1e5bc6]' : ''
          }`}
          onClick={onStartMenuToggle}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="transparent"/>
            <path d="M2 2 L14 8 L2 14 Z" fill="white"/>
          </svg>
          <span className="text-xs font-bold">start</span>
        </button>

        <div className="hidden sm:flex gap-1">
          {openWindows.map((windowName, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-[#1e4db5] border border-[#0831d9] text-white text-xs flex items-center gap-2 max-w-[150px]"
              style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
            >
              <span className="truncate">{windowName}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-[#0c3db5] border border-[#0831d9]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 3 L9 6 L12 7 L9 8 L7 11 L5 8 L2 7 L5 6 Z" fill="#4ecdc4"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="2" width="10" height="10" fill="none" stroke="#ffd700" strokeWidth="1.5"/>
            <path d="M4 4 L10 10 M10 4 L4 10" stroke="#ffd700" strokeWidth="1.5"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" fill="none" stroke="#ff6b6b" strokeWidth="1.5"/>
            <path d="M5 5 L9 9 M9 5 L5 9" stroke="#ff6b6b" strokeWidth="1"/>
          </svg>
        </div>

        <div className="px-2 sm:px-3 py-1 bg-[#0c3db5] border border-[#0831d9] flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1 L8 6 L13 7 L8 8 L7 13 L6 8 L1 7 L6 6 Z" fill="#ffd700"/>
          </svg>
          <span className="text-white text-xs" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
