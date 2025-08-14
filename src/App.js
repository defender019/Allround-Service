import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from './components/TopNavigation';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import { WebsiteBuilderProvider } from './context/WebsiteBuilderContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState('desktop');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400 font-poppins">
            Website Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Loading your creative workspace...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WebsiteBuilderProvider>
        <div className="h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
          <TopNavigation 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
          
          <div className="flex h-full pt-16">
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  key="sidebar"
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-80 flex-shrink-0"
                >
                  <Sidebar />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Toolbar previewMode={previewMode} setPreviewMode={setPreviewMode} />
              <Canvas previewMode={previewMode} />
            </div>
          </div>
        </div>
      </WebsiteBuilderProvider>
    </ThemeProvider>
  );
}

export default App; 