import { useState, useEffect } from 'react';
import { ThemeMode } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    // Check if user has a preferred theme
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Update the document when theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save the theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};