import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ComponentBlock = ({ template, onAdd }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="component-block p-3 group cursor-pointer"
      onClick={onAdd}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
          {template.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {template.name}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {template.description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 h-6 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Plus size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentBlock; 