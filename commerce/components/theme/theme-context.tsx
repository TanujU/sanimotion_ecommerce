'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get initial theme
function getInitialTheme(): Theme {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
  } catch (error) {
    console.warn('Error getting initial theme:', error);
  }
  return 'light';
}

// Helper function to apply theme
function applyTheme(theme: Theme) {
  try {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    if (!root) return;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Persist to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
  } catch (error) {
    console.error('Error applying theme:', error);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // Apply theme immediately when component mounts
  useEffect(() => {
    try {
      applyTheme(theme);
      setMounted(true);
    } catch (error) {
      console.error('Error in initial theme effect:', error);
      setMounted(true);
    }
  }, []);

  // Apply theme when theme changes
  useEffect(() => {
    if (!mounted) return;
    try {
      applyTheme(theme);
    } catch (error) {
      console.error('Error in theme change effect:', error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
