import React from 'react';
import { motion } from 'framer-motion';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <motion.div 
      className="flex rounded-lg shadow-lg overflow-hidden bg-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left: Icon Section */}
      <div className={`text-4xl flex justify-center items-center ${color} text-white w-16`}>
        {icon}
      </div>

      {/* Right: Text Section */}
      <div className="pl-4 py-4">
        <p className="text-lg font-semibold text-gray-700">{text}</p>
        <p className="text-xl font-bold text-gray-900">{number}</p>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
