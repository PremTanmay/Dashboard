import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarDataValues } from '../Data/SidebarValues';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 bg-gradient-to-b from-white via-blue-50 to-pink-100 h-full w-60 flex flex-col items-center justify-center z-10">
      <div className="w-28 mt-8">
        <AnimatePresence>
          {SidebarDataValues.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
              className="flex items-center space-x-4 py-3 font-serif text-sm font-normal hover:shadow-lg shadow-slate-500/50 rounded-lg"
            >
              {item.icon}
              <h1>{item.name}</h1>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
