import { FC } from 'react';

interface WallpaperSwitcherProps {
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
  onClose: () => void;
}

export const WallpaperSwitcher: FC<WallpaperSwitcherProps> = ({
  currentWallpaper,
  onWallpaperChange,
  onClose,
}) => {
  const wallpapers = [
    {
      id: 'xp-blue',
      name: 'Windows XP Blue',
      preview: 'linear-gradient(180deg, #5a7fdc 0%, #4169e1 100%)',
    },
    {
      id: 'bliss',
      name: 'Bliss',
      preview: 'linear-gradient(180deg, #87CEEB 0%, #90EE90 50%, #228B22 100%)',
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      preview: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
    },
    {
      id: 'sunset',
      name: 'Sunset',
      preview: 'linear-gradient(180deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)',
    },
  ];

  return (
    <div className="p-6 min-h-[400px]">
      <h2
        className="text-xl font-bold mb-4 text-[#003da8]"
        style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
      >
        Desktop Background
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Choose a background for your desktop:
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.id}
            className={`border-2 ${
              currentWallpaper === wallpaper.id
                ? 'border-[#0054e3] shadow-lg'
                : 'border-gray-300 hover:border-[#0054e3]'
            } cursor-pointer transition-all p-2`}
            onClick={() => onWallpaperChange(wallpaper.id)}
          >
            <div
              className="h-32 rounded mb-2"
              style={{ background: wallpaper.preview }}
            />
            <p
              className="text-xs text-center"
              style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
            >
              {wallpaper.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button className="xp-button px-4 py-2" onClick={onClose}>
          OK
        </button>
        <button className="xp-button px-4 py-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
