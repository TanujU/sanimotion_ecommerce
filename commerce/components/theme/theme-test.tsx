'use client';

import { useTheme } from './theme-context';
import { useEffect, useState } from 'react';

export default function ThemeTest() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [htmlClasses, setHtmlClasses] = useState<string>('');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setHtmlClasses(document.documentElement.classList.toString());
      
      const observer = new MutationObserver(() => {
        setHtmlClasses(document.documentElement.classList.toString());
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      return () => observer.disconnect();
    }
  }, []);

  if (!mounted) {
    return <div className="p-4 bg-gray-200 dark:bg-gray-800">Loading theme...</div>;
  }

  return (
    <div className="space-y-4 p-4 border-2 border-gray-300 dark:border-gray-600">
      <h3 className="text-lg font-semibold">Theme Test Component</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-500 dark:bg-blue-500 text-white rounded">
          <p>Tailwind Test: RED → BLUE</p>
        </div>
        
        <div className="p-4 bg-green-500 dark:bg-orange-500 text-white rounded">
          <p>Tailwind Test: GREEN → ORANGE</p>
        </div>
        
        <div className="p-4 bg-yellow-500 dark:bg-purple-500 text-black dark:text-white rounded">
          <p>Tailwind Test: YELLOW → PURPLE</p>
        </div>
        
        <div className="p-4 bg-pink-500 dark:bg-cyan-500 text-white rounded">
          <p>Tailwind Test: PINK → CYAN</p>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p><strong>Current Theme:</strong> {theme}</p>
        <p><strong>HTML Classes:</strong> {htmlClasses}</p>
        <p><strong>Has 'dark' class:</strong> {htmlClasses.includes('dark') ? 'Yes' : 'No'}</p>
      </div>
      
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Toggle Theme (Component)
      </button>
    </div>
  );
}
