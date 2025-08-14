import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Palette, 
  User, 
  Settings, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TopNavigation = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDark, toggleTheme, colorPalette, setColorPalette, colorPalettes } = useTheme();
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const colorOptions = [
    { name: 'Blue', value: 'blue', color: '#0ea5e9' },
    { name: 'Purple', value: 'purple', color: '#8b5cf6' },
    { name: 'Green', value: 'green', color: '#10b981' },
    { name: 'Red', value: 'red', color: '#ef4444' },
    { name: 'Orange', value: 'orange', color: '#f97316' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-soft"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">WB</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                Website Builder
              </h1>
            </div>
          </div>

          {/* Right side - Theme and User */}
          <div className="flex items-center space-x-2">
            {/* Color Palette Selector */}
            <div className="relative">
              <button
                onClick={() => setShowColorMenu(!showColorMenu)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Palette size={18} />
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: colorPalettes[colorPalette].primary }}
                ></div>
              </button>

              <AnimatePresence>
                {showColorMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-strong border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setColorPalette(option.value);
                          setShowColorMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200"
                      >
                        <div 
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: option.color }}
                        ></div>
                        <span className="text-gray-700 dark:text-gray-300">{option.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium">User</span>
                <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-strong border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200">
                      <User size={16} className="text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200">
                      <Settings size={16} className="text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">Settings</span>
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200 text-red-600 dark:text-red-400">
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menus */}
      {(showColorMenu || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowColorMenu(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </motion.nav>
  );
};

export default TopNavigation; 