import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WindowControlsProps {
  title: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export const WindowControls: React.FC<WindowControlsProps> = ({
  title,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  const navigate = useNavigate();
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    } else {
      const sound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHGmi78OScTgwOUKbh8LZjGwY5kdfy0HgoBS6Czf==');
      sound.play().catch(() => {});
    }
  };

  const handleMaximize = () => {
    if (onMaximize) {
      onMaximize();
    } else {
      setIsMaximized(!isMaximized);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="xp-title-bar">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
        <span className="text-white font-bold text-sm" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
          {title}
        </span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={handleMinimize}
          className="w-6 h-5 bg-[#2c5fdb] hover:bg-[#2050c0] active:bg-[#1a4db5] border border-[#1a4db5] text-white text-xs font-bold transition-colors focus:outline focus:outline-2 focus:outline-white focus:outline-offset-1"
          title="Minimize"
        >
          _
        </button>
        <button
          onClick={handleMaximize}
          className="w-6 h-5 bg-[#2c5fdb] hover:bg-[#2050c0] active:bg-[#1a4db5] border border-[#1a4db5] text-white text-xs font-bold transition-colors focus:outline focus:outline-2 focus:outline-white focus:outline-offset-1"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? "❐" : "□"}
        </button>
        <button
          onClick={handleClose}
          className="w-6 h-5 bg-[#d93831] hover:bg-[#c02820] active:bg-[#a01810] border border-[#b02018] text-white text-xs font-bold transition-colors focus:outline focus:outline-2 focus:outline-white focus:outline-offset-1"
          title="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};
