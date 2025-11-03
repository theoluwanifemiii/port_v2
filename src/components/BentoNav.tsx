import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface BentoNavProps {
  onNavClick?: (section: string) => void;
}

export const BentoNav: FC<BentoNavProps> = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Work', id: 'work' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="font-bold text-gray-900 hidden sm:inline">Olu</span>
          </motion.div>

          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ color: '#2563eb' }}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                onClick={() => onNavClick?.(item.id)}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Hire Me
            </motion.button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-gray-200"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50"
                onClick={() => {
                  onNavClick?.(item.id);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <button className="w-full mx-4 my-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
              Hire Me
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
