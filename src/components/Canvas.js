import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import WebsiteComponent from './WebsiteComponent';
import { Plus, Move } from 'lucide-react';

const Canvas = ({ previewMode }) => {
  const { 
    components, 
    moveComponent, 
    selectedComponent, 
    setSelectedComponent 
  } = useWebsiteBuilder();
  
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    
    if (fromIndex !== toIndex) {
      moveComponent(fromIndex, toIndex);
    }
    
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const handleCanvasClick = (e) => {
    // Only deselect if clicking directly on canvas, not on components
    if (e.target === e.currentTarget) {
      setSelectedComponent(null);
    }
  };

  if (components.length === 0) {
    return (
      <div 
        className="canvas-area flex-1 flex items-center justify-center p-8"
        onClick={handleCanvasClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Start Building Your Website
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Drag components from the sidebar to start creating your website. Choose from hero sections, text blocks, galleries, and more.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            💡 Tip: Try loading a starter template to get started quickly!
          </div>
        </motion.div>
      </div>
    );
  }

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
        return 'w-full';
      default:
        return 'w-full';
    }
  };

  return (
    <div 
      className="canvas-area flex-1 overflow-auto p-8"
      onClick={handleCanvasClick}
    >
      <div className={`${getPreviewWidth()} transition-all duration-300`}>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="canvas">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-full transition-all duration-200 ${
                snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <AnimatePresence>
                {components.map((component, index) => (
                  <Draggable
                    key={component.id}
                    draggableId={component.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`relative group ${
                          snapshot.isDragging ? 'z-50' : ''
                        }`}
                      >
                        {/* Component */}
                        <div
                          className={`relative ${
                            selectedComponent?.id === component.id
                              ? 'ring-2 ring-primary-500 ring-offset-2'
                              : ''
                          }`}
                          onClick={() => handleComponentClick(component)}
                        >
                          <WebsiteComponent 
                            component={component} 
                            isSelected={selectedComponent?.id === component.id}
                          />
                        </div>

                        {/* Drag Handle */}
                        <div
                          {...provided.dragHandleProps}
                          className={`absolute top-2 right-2 z-10 ${
                            selectedComponent?.id === component.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          } transition-opacity duration-200`}
                        >
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-medium border border-gray-200 dark:border-gray-700 cursor-move hover:bg-gray-50 dark:hover:bg-gray-700">
                            <Move size={16} className="text-gray-500" />
                          </div>
                        </div>

                        {/* Component Actions */}
                        {selectedComponent?.id === component.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-2 left-2 z-10 flex space-x-2"
                          >
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-medium border border-gray-200 dark:border-gray-700">
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </AnimatePresence>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>

      {/* Drag overlay indicator */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500/50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-medium">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  Drop component here
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Canvas; 