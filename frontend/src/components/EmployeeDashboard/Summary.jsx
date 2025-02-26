import React, { useEffect, useState } from 'react';
import { FaUser, FaBell, FaClock, FaExclamationTriangle, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import { fetchAnnouncements } from '../../utils/AnnouncementHelper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Summary = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    toast.success(`🎉 Welcome back, ${user.name}!`, { autoClose: 3000 });

    const loadAnnouncements = async () => {
      const data = await fetchAnnouncements();
      setAnnouncements(data);

      // Trigger different styled toasts based on announcement type
      data.forEach((ann) => {
        const isNew = new Date(ann.createdAt) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // Last 2 days

        if (ann.isImportant) {
          toast.error(`⚡ Important: ${ann.title}`, {
            autoClose: 5000,
            style: { backgroundColor: '#F87171', color: 'white' },
            icon: <FaExclamationTriangle />,
          });
        } else if (isNew) {
          toast.success(`🆕 New Announcement: ${ann.title}`, {
            autoClose: 5000,
            style: { backgroundColor: '#4ADE80', color: 'white' },
            icon: <FaCheckCircle />,
          });
        } else {
          toast.info(`📢 ${ann.title}`, {
            autoClose: 5000,
            style: { backgroundColor: '#60A5FA', color: 'white' },
            icon: <FaBell />,
          });
        }
      });
    };

    loadAnnouncements();
  }, [user.name]);

  // Format relative time
  const formatRelativeTime = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    return diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : `${diff} days ago`;
  };

  // Filter Announcements
  const filteredAnnouncements = announcements.filter((ann) => {
    if (filter === 'latest') {
      return new Date(ann.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
    }
    if (filter === 'important') {
      return ann.isImportant;
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* User Greeting */}
      <div className="flex rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-blue-400 text-white hover:shadow-2xl transition-all ease-in-out">
        <div className="text-4xl flex justify-center items-center w-20 bg-indigo-600">
          <FaUser />
        </div>
        <div className="pl-5 py-4">
          <p className="text-lg">Hello,</p>
          <p className="text-2xl font-bold">{user.name}</p>
          <p className="text-sm opacity-80 mt-1">Welcome back to the HR Portal!</p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center text-gray-700">
            <FaBell className="mr-2" /> Notifications
          </h2>

          {/* Filter Options */}
          <div className="space-x-2">
            {['all', 'latest', 'important'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Announcement List */}
        {filteredAnnouncements.length > 0 ? (
          <ul className="space-y-4">
            {filteredAnnouncements.map((ann) => (
              <li
                key={ann._id}
                className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                  ann.isImportant ? 'border-red-400' : 'border-gray-200'
                }`}
                onClick={() => navigate(`/employee-dashboard/announcements/${ann._id}`)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    {ann.isImportant ? (
                      <FaExclamationTriangle className="text-xl text-red-500" />
                    ) : (
                      <FaBell className="text-xl text-blue-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold text-gray-800">{ann.title}</p>
                      {ann.isImportant && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Important</span>
                      )}
                      {new Date(ann.createdAt) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{ann.description.slice(0, 60)}...</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <FaClock className="mr-1" /> {formatRelativeTime(ann.createdAt)}
                    </p>
                  </div>
                </div>

                <FaChevronRight className="text-gray-400" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center py-6">No announcements found.</div>
        )}
      </div>
    </div>
  );
};

export default Summary;
