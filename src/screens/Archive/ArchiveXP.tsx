import { FC, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { StartMenu } from "../../components/StartMenu";
import { XPWindow } from "../../components/XPWindow";
import { PinballGame } from "../../components/PinballGame";
import { WallpaperSwitcher } from "../../components/WallpaperSwitcher";
import { Taskbar } from "../../components/Taskbar";
import { useSoundEffects } from "../../hooks/useSoundEffects";

interface DesktopIconProps {
  icon: string;
  label: string;
  to: string;
  id: string;
  position: { x: number; y: number };
  onDragEnd: (id: string, position: { x: number; y: number }) => void;
  onClick?: () => void;
}

const DesktopIcon: FC<DesktopIconProps> = ({ icon, label, to, id, position, onDragEnd, onClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState(position);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "A") return;
    e.preventDefault();
    setIsDragging(true);
    const rect = iconRef.current?.getBoundingClientRect();
    if (rect) setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setCurrentPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleMouseUp = () => {
    if (isDragging) { setIsDragging(false); onDragEnd(id, currentPos); }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, currentPos]);

  const inner = (
    <>
      <div className="w-16 h-16 flex items-center justify-center text-4xl bg-white/10 backdrop-blur-sm border border-white/20 rounded shadow-lg group-hover:bg-white/20 select-none">
        {icon}
      </div>
      <span className="text-white text-xs text-center font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
        {label}
      </span>
    </>
  );

  return (
    <div
      ref={iconRef}
      className="absolute flex flex-col items-center gap-2 p-3 hover:bg-[#0054e3]/30 rounded transition-colors group w-24"
      style={{ left: `${currentPos.x}px`, top: `${currentPos.y}px`, cursor: isDragging ? "grabbing" : "grab", zIndex: isDragging ? 1000 : 1 }}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {to === "#"
        ? <div className="flex flex-col items-center gap-2 cursor-pointer">{inner}</div>
        : <Link to={to} className="flex flex-col items-center gap-2 no-underline pointer-events-auto" onClick={(e) => { if (isDragging) e.preventDefault(); }}>{inner}</Link>
      }
    </div>
  );
};

const wallpaperStyles: Record<string, string> = {
  "xp-blue": "linear-gradient(180deg, #5a7fdc 0%, #4169e1 100%)",
  bliss:     "linear-gradient(180deg, #87CEEB 0%, #90EE90 50%, #228B22 100%)",
  dark:      "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
  sunset:    "linear-gradient(180deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)",
};

export const ArchiveXP: FC = () => {
  const [iconPositions, setIconPositions] = useState([
    { id: "work",     icon: "📁", label: "My Work",      to: "/work",         position: { x: 20, y: 20 } },
    { id: "about",    icon: "👤", label: "About Me",     to: "/about",        position: { x: 20, y: 140 } },
    { id: "contact",  icon: "💼", label: "Work With Me", to: "/work-with-me", position: { x: 20, y: 260 } },
    { id: "pinball",  icon: "🎮", label: "3D Pinball",   to: "#",             position: { x: 20, y: 380 } },
    { id: "settings", icon: "⚙️", label: "Settings",     to: "#",             position: { x: 20, y: 500 } },
  ]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState("xp-blue");
  const sounds = useSoundEffects(true);

  const handleDragEnd = (id: string, pos: { x: number; y: number }) =>
    setIconPositions((prev) => prev.map((icon) => (icon.id === id ? { ...icon, position: pos } : icon)));

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none" style={{ background: wallpaperStyles[wallpaper] ?? wallpaperStyles["xp-blue"] }}>
      {/* Back link */}
      <Link
        to="/archive"
        className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full border border-white/20 no-underline hover:bg-black/60 transition-colors"
        style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
      >
        ← Back to Archive
      </Link>

      {/* Photo frame */}
      <div className="absolute top-4 right-4 hidden sm:block">
        <div className="w-48 h-56 bg-white border-4 border-[#003da8] shadow-2xl overflow-hidden">
          <div className="h-6 bg-gradient-to-r from-[#0997ff] to-[#0053ee] flex items-center px-2">
            <div className="w-3 h-3 bg-white/30 rounded-sm" />
            <span className="text-white text-[10px] ml-1 font-bold" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>Olu.jpg</span>
          </div>
          <div className="p-1">
            <img src="/IMG_7861 2.jpg" alt="Olu" className="w-full h-44 object-cover border border-gray-300" />
          </div>
          <div className="bg-[#ece9d8] border-t border-[#b4b4b4] p-1 text-center">
            <p className="text-black text-[9px]" style={{ fontFamily: "Sometype Mono, monospace" }}>Product Designer</p>
          </div>
        </div>
      </div>

      <div className="relative min-h-[calc(100vh-60px)]">
        {iconPositions.map((icon) => (
          <DesktopIcon
            key={icon.id}
            {...icon}
            onDragEnd={handleDragEnd}
            onClick={icon.to === "#" ? () => { setOpenApp(icon.id); sounds.playClick(); } : undefined}
          />
        ))}
      </div>

      <Taskbar
        onStartMenuToggle={() => { setIsStartMenuOpen(!isStartMenuOpen); sounds.playClick(); }}
        isStartMenuOpen={isStartMenuOpen}
        openWindows={openApp ? [openApp] : []}
      />

      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenApp={(appName) => { setOpenApp(appName); sounds.playClick(); }}
      />

      {openApp === "pinball" && (
        <XPWindow title="3D Pinball for Windows - Space Cadet" icon="🎮" onClose={() => setOpenApp(null)} onMinimize={() => setOpenApp(null)} defaultSize={{ width: 600, height: 700 }}>
          <PinballGame />
        </XPWindow>
      )}

      {openApp === "settings" && (
        <XPWindow title="Display Properties" icon="⚙️" onClose={() => setOpenApp(null)} defaultSize={{ width: 500, height: 500 }}>
          <WallpaperSwitcher currentWallpaper={wallpaper} onWallpaperChange={setWallpaper} onClose={() => setOpenApp(null)} />
        </XPWindow>
      )}
    </div>
  );
};
