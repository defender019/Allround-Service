import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Undo2, 
  Redo2, 
  Download, 
  Trash2,
  Smartphone,
  Tablet,
  Monitor,
  Check
} from 'lucide-react';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';

const Toolbar = ({ previewMode, setPreviewMode }) => {
  const { 
    canUndo, 
    canRedo, 
    undo, 
    redo, 
    exportWebsite, 
    clearWebsite, 
    isDirty,
    components 
  } = useWebsiteBuilder();
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const previewModes = [
    { key: 'mobile', icon: Smartphone, label: 'Mobile', width: 'w-80' },
    { key: 'tablet', icon: Tablet, label: 'Tablet', width: 'w-96' },
    { key: 'desktop', icon: Monitor, label: 'Desktop', width: 'w-full' },
  ];

  const handleClearWebsite = () => {
    clearWebsite();
    setShowClearConfirm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Undo/Redo */}
        <div className="flex items-center space-x-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`toolbar-item ${!canUndo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title="Undo"
          >
            <Undo2 size={18} />
          </button>
          
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`toolbar-item ${!canRedo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title="Redo"
          >
            <Redo2 size={18} />
          </button>
        </div>

        {/* Center - Preview Mode Selector */}
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {previewModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.key}
                onClick={() => setPreviewMode(mode.key)}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  previewMode === mode.key
                    ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                title={mode.label}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Save indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {isDirty ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>Unsaved changes</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                <Check size={14} />
                <span>Saved</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <button
            onClick={exportWebsite}
            disabled={components.length === 0}
            className={`btn-primary flex items-center space-x-2 ${
              components.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Export Website"
          >
            <Download size={16} />
            <span>Export</span>
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={components.length === 0}
            className={`btn-secondary flex items-center space-x-2 ${
              components.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Clear Website"
          >
            <Trash2 size={16} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Clear confirmation modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-strong"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Clear Website?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will remove all components and cannot be undone. Are you sure you want to continue?
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearWebsite}
                  className="btn-primary flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
                >
                  Clear Website
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toolbar; 