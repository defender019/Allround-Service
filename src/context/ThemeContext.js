import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [colorPalette, setColorPalette] = useState(() => {
    const saved = localStorage.getItem('colorPalette');
    return saved ? JSON.parse(saved) : 'blue';
  });

  // Helper function to adjust color brightness
  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const colorPalettes = {
    blue: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#38bdf8',
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
    },
    green: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
    },
    red: {
      primary: '#ef4444',
      secondary: '#dc2626',
      accent: '#f87171',
    },
    orange: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
    },
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', JSON.stringify(isDark));
  }, [isDark]);

  // Initialize color palette on mount
  useEffect(() => {
    const colors = colorPalettes[colorPalette];
    const root = document.documentElement;
    
    // Set main color variables
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    
    // Generate and set color palette variations
    const primaryColor = colors.primary;
    
    // Generate lighter and darker variations
    root.style.setProperty('--color-primary-50', adjustBrightness(primaryColor, 0.9));
    root.style.setProperty('--color-primary-100', adjustBrightness(primaryColor, 0.8));
    root.style.setProperty('--color-primary-200', adjustBrightness(primaryColor, 0.6));
    root.style.setProperty('--color-primary-300', adjustBrightness(primaryColor, 0.4));
    root.style.setProperty('--color-primary-400', adjustBrightness(primaryColor, 0.2));
    root.style.setProperty('--color-primary-700', adjustBrightness(primaryColor, -0.2));
    root.style.setProperty('--color-primary-800', adjustBrightness(primaryColor, -0.4));
    root.style.setProperty('--color-primary-900', adjustBrightness(primaryColor, -0.6));
  }, []); // Only run on mount

  useEffect(() => {
    localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
    
    // Apply CSS custom properties to document root
    const root = document.documentElement;
    const colors = colorPalettes[colorPalette];
    
    // Set main color variables
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    
    // Generate and set color palette variations
    const primaryColor = colors.primary;
    const secondaryColor = colors.secondary;
    
    // Generate lighter and darker variations
    root.style.setProperty('--color-primary-50', adjustBrightness(primaryColor, 0.9));
    root.style.setProperty('--color-primary-100', adjustBrightness(primaryColor, 0.8));
    root.style.setProperty('--color-primary-200', adjustBrightness(primaryColor, 0.6));
    root.style.setProperty('--color-primary-300', adjustBrightness(primaryColor, 0.4));
    root.style.setProperty('--color-primary-400', adjustBrightness(primaryColor, 0.2));
    root.style.setProperty('--color-primary-700', adjustBrightness(primaryColor, -0.2));
    root.style.setProperty('--color-primary-800', adjustBrightness(primaryColor, -0.4));
    root.style.setProperty('--color-primary-900', adjustBrightness(primaryColor, -0.6));
  }, [colorPalette, colorPalettes]);

  const toggleTheme = () => setIsDark(!isDark);

  const value = {
    isDark,
    toggleTheme,
    colorPalette,
    setColorPalette,
    colorPalettes,
    currentColors: colorPalettes[colorPalette],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 