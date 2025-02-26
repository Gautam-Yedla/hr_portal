import React from "react";
import { useAuth } from "../../context/authContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion"; 

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* Navbar */}
      <motion.div
        className="fixed top-0 left-64 right-0 h-16 bg-gradient-to-r from-teal-500 to-blue-500 text-gray-200 flex items-center justify-between px-8 py-4 shadow-2xl z-10 rounded-b-xl transition-all duration-300 ease-in-out hover:shadow-xl"
        initial={{ y: -100 }} 
        animate={{ y: 0 }}    
        transition={{ type: "spring", stiffness: 100, damping: 25 }} 
      >
        {/* Left: User Welcome */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaUserCircle className="text-3xl text-teal-100 hover:text-teal-300 transition-all duration-300 ease-in-out transform hover:scale-125" />
          </motion.div>
          <motion.p 
            className="text-lg font-semibold tracking-wide text-teal-100"
            whileHover={{ scale: 1.05, color: "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            Welcome, <span className="text-white">{user?.name || "User"}</span>
          </motion.p>
        </div>

        {/* Right: Logout Button */}
        <motion.button
          className="flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 text-white px-5 py-2 rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSignOutAlt className="mr-2 text-lg" />
          Logout
        </motion.button>
      </motion.div>

      {/* Main Content (Add padding-top to avoid overlap) */}
      <div className="pt-16">
        {/* Your page content here */}
      </div>
    </div>
  );
};

export default Navbar;
