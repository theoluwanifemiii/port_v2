import { FC } from "react";
import { Link } from "react-router-dom";

interface DesktopIconProps {
  icon: string;
  label: string;
  to: string;
}

const DesktopIcon: FC<DesktopIconProps> = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex flex-col items-center gap-2 p-3 hover:bg-[#0054e3]/30 rounded transition-colors group w-24 no-underline"
  >
    <div className="w-16 h-16 flex items-center justify-center text-4xl bg-white/10 backdrop-blur-sm border border-white/20 rounded shadow-lg group-hover:bg-white/20">
      {icon}
    </div>
    <span
      className="text-white text-xs text-center font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
      style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
    >
      {label}
    </span>
  </Link>
);

export const Home: FC = () => {
  const desktopIcons: DesktopIconProps[] = [
    { icon: "📁", label: "My Work", to: "/work" },
    { icon: "👤", label: "About Me", to: "/about" },
    { icon: "💼", label: "Work With Me", to: "/work-with-me" },
    { icon: "🖼️", label: "My Photo", to: "/about" },
  ];

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #5a7fdc 0%, #4169e1 100%)',
      }}
    >
      <div className="absolute top-4 right-4">
        <div className="w-48 h-56 bg-white border-4 border-[#003da8] shadow-2xl overflow-hidden">
          <div className="h-6 bg-gradient-to-r from-[#0997ff] to-[#0053ee] flex items-center px-2">
            <div className="w-3 h-3 bg-white/30 rounded-sm"></div>
            <span className="text-white text-[10px] ml-1 font-bold" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              Olu.jpg
            </span>
          </div>
          <div className="p-1">
            <img
              src="/IMG_7861 2.jpg"
              alt="Olu"
              className="w-full h-44 object-cover border border-gray-300"
            />
          </div>
          <div className="bg-[#ece9d8] border-t border-[#b4b4b4] p-1 text-center">
            <p className="text-black text-[9px]" style={{ fontFamily: 'Sometype Mono, monospace' }}>
              Product Designer
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 content-start min-h-[calc(100vh-60px)]">
        {desktopIcons.map((icon, index) => (
          <DesktopIcon key={index} {...icon} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 xp-taskbar px-2 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="xp-start-button flex items-center gap-1 px-3 py-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect width="16" height="16" fill="transparent"/>
              <path d="M2 2 L14 8 L2 14 Z" fill="white"/>
            </svg>
            <span className="text-xs">start</span>
          </button>

          <div className="flex gap-1">
            <Link
              to="/work"
              className="px-3 py-1 bg-[#1e4db5] hover:bg-[#2c5fdb] border border-[#0831d9] text-white text-xs no-underline flex items-center gap-2"
              style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
            >
              <span>📁</span>
              <span>My Work</span>
            </Link>
            <Link
              to="/about"
              className="px-3 py-1 bg-[#1e4db5] hover:bg-[#2c5fdb] border border-[#0831d9] text-white text-xs no-underline flex items-center gap-2"
              style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
            >
              <span>👤</span>
              <span>About</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-[#0c3db5] border border-[#0831d9] flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1 L8 6 L13 7 L8 8 L7 13 L6 8 L1 7 L6 6 Z" fill="#ffd700"/>
            </svg>
            <span className="text-white text-xs" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
