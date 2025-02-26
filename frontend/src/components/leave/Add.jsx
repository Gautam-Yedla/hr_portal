// import React, { useState } from 'react'
// import { useAuth } from '../../context/authContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Add = () => {
//     const {user} = useAuth();
//     const [leave, setLeave] = useState({
//       userId: user._id,
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setLeave((prevData) => ({...prevData, [name] : value}));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(
//                 `http://localhost:5000/api/leave/add`, leave,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );
//             if (response.data.success) {
//                 navigate(`/employee-dashboard/leaves/${user._id}`);
//             }
//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);

//             if (error.response && !error.response.data.success) {
//                 alert(error.response.data.error);
//             }
//         }
//     };

//     return (
//         <div className='max-w-4xl mx-auto mt-10 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 p-8 rounded-md shadow-xl transform hover:scale-105 transition-all'>
//             <h2 className='text-3xl font-bold mb-6 text-center text-white'>
//                 Leave Request Form
//             </h2>
//             <form onSubmit={handleSubmit}>
//                 <div className='flex flex-col space-y-4'>
//                     <div>
//                         <label className='block text-sm font-medium text-white'>
//                             Type Of Leave
//                         </label>
//                         <select
//                             name='leaveType'
//                             onChange={handleChange}
//                             className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transform transition-all hover:scale-105'
//                             required
//                         >
//                             <option value=''>Select Leave Type</option>
//                             <option value='Sick Leave'>Sick Leave</option>
//                             <option value='Casual Leave'>Casual Leave</option>
//                             <option value='Maternity Leave'>Maternity Leave</option>
//                             <option value='Paternity Leave'>Paternity Leave</option>
//                             <option value='Emergency Leave'>Emergency Leave</option>
//                             <option value='Annual Leave'>Annual Leave</option>
//                         </select>
//                     </div>

//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                         <div>
//                             <label className='block text-sm font-medium text-white'>
//                                 From Date
//                             </label>
//                             <input 
//                                 type="date"
//                                 name='startDate'
//                                 onChange={handleChange}
//                                 className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transform transition-all hover:scale-105'
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className='block text-sm font-medium text-white'>
//                                 To Date
//                             </label>
//                             <input 
//                                 type="date"
//                                 name='endDate'
//                                 onChange={handleChange}
//                                 className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transform transition-all hover:scale-105'
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className='block text-sm font-medium text-white'>
//                                 Reason
//                             </label>
//                             <textarea
//                                 name='reason'
//                                 placeholder='Describe here.....'
//                                 onChange={handleChange}
//                                 rows='3'
//                                 className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transform transition-all hover:scale-105'
//                             ></textarea>
//                         </div>

//                         <button 
//                             type='submit'
//                             className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transform transition-all hover:scale-105'>
//                             Submit Leave Request
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Add;









import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaRegFileAlt, FaAlignLeft } from 'react-icons/fa';

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/leave/add`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Leave Request Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Leave Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type Of Leave</label>
            <div className="relative">
              <FaRegFileAlt className="absolute left-3 top-3 text-teal-500" />
              <select
                name="leaveType"
                onChange={handleChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
                <option value="Emergency Leave">Emergency Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-teal-500" />
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          </div>

          {/* End Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-teal-500" />
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          </div>

          {/* Reason */}
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <div className="relative">
              <FaAlignLeft className="absolute left-3 top-3 text-teal-500" />
              <textarea
                name="reason"
                placeholder="Describe your reason here..."
                onChange={handleChange}
                rows="4"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-full shadow-md"
            >
              Submit Leave Request
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Add;
