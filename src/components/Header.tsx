import React from 'react';
import { ThemeMode } from '../types';
import { Sun, Moon, Menu } from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-semibold text-blue-500 dark:text-blue-400">
            TG Video Feed
          </h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;