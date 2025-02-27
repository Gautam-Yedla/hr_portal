import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("Error: Department ID is undefined");
      return;
    }

    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `https://hr-sample-backend.onrender.com/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://hr-sample-backend.onrender.com/api/department/${id}`,
        department,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>{depLoading ? (
      <div className="flex justify-center items-center h-screen text-3xl">Loading...</div>
    ) : (
      <div className="min-h-screen flex flex-col px-6 py-4 bg-gradient-to-br from-teal-50 to-indigo-100">
        <motion.div
          className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-4xl font-semibold text-gray-800 mb-6">Edit Department</h3>
          <form onSubmit={handlesubmit} className="space-y-6">
            {/* Department Name */}
            <div>
              <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                id="dep_name"
                name="dep_name"
                onChange={handleChange}
                value={department.dep_name}
                placeholder="Enter department name"
                className="mt-2 block w-full p-2 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-all duration-300 transform hover:scale-105"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter department description"
                onChange={handleChange}
                value={department.description}
                className="mt-2 block w-full p-5 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-all duration-300 transform hover:scale-105"
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-teal-600 text-white py-5 px-6 rounded-md font-semibold shadow-md hover:bg-teal-700 focus:ring-4 focus:ring-teal-500 transform transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Department
            </motion.button>
          </form>
        </motion.div>
      </div>
    )}</>
  );
};

export default EditDepartment;








