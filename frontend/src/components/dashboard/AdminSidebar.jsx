// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Paper, Box } from '@mui/material';
// import { motion } from 'framer-motion';
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   Business as BusinessIcon,
//   EventNote as EventNoteIcon,
//   MonetizationOn as MonetizationOnIcon,
//   Settings as SettingsIcon
// } from '@mui/icons-material';

// const navItems = [
//   { to: "/admin-dashboard", icon: <DashboardIcon />, label: "Dashboard" },
//   { to: "/admin-dashboard/employees", icon: <PeopleIcon />, label: "Employees" },
//   { to: "/admin-dashboard/departments", icon: <BusinessIcon />, label: "Departments" },
//   { to: "/admin-dashboard/leaves", icon: <EventNoteIcon />, label: "Leave Requests" },
//   { to: "/admin-dashboard/salary", icon: <MonetizationOnIcon />, label: "Salaries" },
//   { to: "/admin-dashboard/setting", icon: <SettingsIcon />, label: "Settings" },
// ];

// const AdminSidebar = () => {
//   return (
//     <Paper
//       component={motion.div}
//       initial={{ x: -80, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 120 }}
//       elevation={5}
//       className="bg-gray-900 text-gray-300 h-screen fixed left-0 top-0 bottom-0 w-64 shadow-2xl hover:shadow-2xl transition-all duration-300 ease-in-out"
//     >
//       {/* Sidebar Header */}
//       <Box className="bg-gradient-to-r from-purple-600 to-indigo-500 h-16 flex items-center justify-center shadow-md">
//         <h3 className="text-xl font-semibold tracking-wide text-white">HR Portal</h3>
//       </Box>

//       {/* Navigation Links */}
//       <Box className="mt-4 px-4 space-y-2">
//         {navItems.map(({ to, icon, label }, index) => (
//           <NavLink 
//             key={index}
//             to={to}
//             className={({ isActive }) =>
//               `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-300 relative
//               ${isActive ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md pulse-animation' : 'hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-700 hover:text-white'}`
//             }
//             end
//           >
//             <motion.div 
//               whileHover={{ scale: 1.15, rotate: 10 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="text-xl"
//             >
//               {icon}
//             </motion.div>
//             <span className="text-sm font-medium">{label}</span>
//           </NavLink>
//         ))}
//       </Box>
//     </Paper>
//   );
// };

// export default AdminSidebar;















import React from 'react';
import { NavLink } from 'react-router-dom';
import { Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  EventNote as EventNoteIcon,
  MonetizationOn as MonetizationOnIcon,
  Notifications as NotificationsIcon, // 📢 New Icon for Announcements
  Settings as SettingsIcon
} from '@mui/icons-material';

const navItems = [
  { to: "/admin-dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/admin-dashboard/employees", icon: <PeopleIcon />, label: "Employees" },
  { to: "/admin-dashboard/departments", icon: <BusinessIcon />, label: "Departments" },
  { to: "/admin-dashboard/leaves", icon: <EventNoteIcon />, label: "Leave Requests" },
  { to: "/admin-dashboard/salary", icon: <MonetizationOnIcon />, label: "Salaries" },
  { to: "/admin-dashboard/announcements", icon: <NotificationsIcon />, label: "Announcements" }, // 🟢 New Menu Item
  { to: "/admin-dashboard/setting", icon: <SettingsIcon />, label: "Settings" },
];

const AdminSidebar = () => {
  return (
    <Paper
      component={motion.div}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      elevation={5}
      className="bg-gray-900 text-gray-300 h-screen fixed left-0 top-0 bottom-0 w-64 shadow-2xl hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      {/* Sidebar Header */}
      <Box className="bg-gradient-to-r from-purple-600 to-indigo-500 h-16 flex items-center justify-center shadow-md">
        <h3 className="text-xl font-semibold tracking-wide text-white">HR Portal</h3>
      </Box>

      {/* Navigation Links */}
      <Box className="mt-4 px-4 space-y-2">
        {navItems.map(({ to, icon, label }, index) => (
          <NavLink
            key={index}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-300 relative
              ${isActive ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md pulse-animation' : 'hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-700 hover:text-white'}`
            }
            end
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-xl"
            >
              {icon}
            </motion.div>
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </Box>
    </Paper>
  );
};

export default AdminSidebar;
