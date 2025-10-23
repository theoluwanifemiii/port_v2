import { FC, ReactNode, useState, useRef, useEffect } from 'react';

interface XPWindowProps {
  title: string;
  icon?: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isMaximized?: boolean;
}

export const XPWindow: FC<XPWindowProps> = ({
  title,
  icon = '📄',
  children,
  onClose,
  onMinimize,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 500 },
  isMaximized: initialMaximized = false,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(initialMaximized);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isMaximized) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const windowStyle = isMaximized
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
      }
    : {
        position: 'fixed' as const,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      };

  return (
    <div
      ref={windowRef}
      className="z-50 bg-[#ece9d8] border-2 border-[#0054e3] shadow-2xl flex flex-col"
      style={windowStyle}
    >
      <div
        className="bg-gradient-to-r from-[#0997ff] to-[#0053ee] px-2 py-1 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span
            className="text-white text-sm font-bold"
            style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
          >
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {onMinimize && (
            <button
              className="w-6 h-6 bg-[#3d95ff] hover:bg-[#5fa3ff] border border-white/30 flex items-center justify-center text-white font-bold"
              onClick={onMinimize}
            >
              <span className="text-xs">_</span>
            </button>
          )}
          <button
            className="w-6 h-6 bg-[#3d95ff] hover:bg-[#5fa3ff] border border-white/30 flex items-center justify-center text-white font-bold"
            onClick={handleMaximize}
          >
            <span className="text-xs">□</span>
          </button>
          <button
            className="w-6 h-6 bg-[#ff4757] hover:bg-[#ff6b7a] border border-white/30 flex items-center justify-center text-white font-bold"
            onClick={onClose}
          >
            <span className="text-xs">×</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>

      <div
        className="bg-[#ece9d8] border-t border-gray-400 px-2 py-1 text-xs text-gray-600"
        style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
      >
        {title}
      </div>
    </div>
  );
};
