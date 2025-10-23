import { FC } from 'react';
import { Link } from 'react-router-dom';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appName: string) => void;
}

export const StartMenu: FC<StartMenuProps> = ({ isOpen, onClose, onOpenApp }) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: '🎮', label: 'Pinball', action: 'pinball' },
    { icon: '📁', label: 'My Work', to: '/work' },
    { icon: '👤', label: 'About Me', to: '/about' },
    { icon: '💼', label: 'Work With Me', to: '/work-with-me' },
    { type: 'separator' },
    { icon: '⚙️', label: 'Settings', action: 'settings' },
    { icon: '❓', label: 'Help', action: 'help' },
  ];

  const handleItemClick = (item: any) => {
    if (item.action) {
      onOpenApp(item.action);
    }
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div
        className="fixed bottom-12 left-0 z-50 w-80 bg-gradient-to-b from-[#245edb] to-[#3f8cf3] border-2 border-[#0831d9] shadow-2xl"
        style={{
          fontFamily: 'Tahoma, Arial, sans-serif',
        }}
      >
        <div className="flex">
          <div className="w-12 bg-gradient-to-b from-[#5a7fdc] to-[#3f51b5] flex flex-col items-center py-4 text-white text-xs font-bold writing-mode-vertical">
            <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              Olu Portfolio
            </span>
          </div>

          <div className="flex-1">
            <div className="bg-white/95 p-3 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">Olu</p>
                  <p className="text-xs text-gray-600">Product Designer</p>
                </div>
              </div>
            </div>

            <div className="bg-white">
              {menuItems.map((item, index) => {
                if (item.type === 'separator') {
                  return (
                    <div
                      key={index}
                      className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1"
                    />
                  );
                }

                if (item.to) {
                  return (
                    <Link
                      key={index}
                      to={item.to}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#3d7cf4] hover:text-white transition-colors cursor-pointer no-underline text-gray-800"
                      onClick={onClose}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#3d7cf4] hover:text-white transition-colors cursor-pointer text-gray-800"
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#3d7cf4] p-2 flex items-center justify-between">
              <button
                className="flex items-center gap-2 px-3 py-1 hover:bg-[#5a96f5] transition-colors text-white text-xs rounded"
                onClick={onClose}
              >
                <span>🔌</span>
                <span>Log Off</span>
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1 hover:bg-[#c93838] transition-colors text-white text-xs rounded"
                onClick={onClose}
              >
                <span>⏻</span>
                <span>Shut Down</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
