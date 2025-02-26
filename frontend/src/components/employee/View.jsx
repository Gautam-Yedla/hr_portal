// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'

// const View = () => {
//     const { id } = useParams()
//     const [employee, setEmployee] = useState(null)

//     useEffect(() => {
//       const fetchEmployee = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/employee/${id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
//           if (response.data.success) {
//             setEmployee(response.data.employee);
//           }
//         } catch (error) {
//           if (error.response && !error.response.data.success) {
//             alert(error.response.data.error);
//           }
//         }
//       };
//       fetchEmployee();
//     }, [id]);

//     return (
//       <>
//         {employee ? (
//           <div className='max-w-4xl mx-auto mt-10 bg-gradient-to-b from-blue-400 to-purple-600 p-8 rounded-xl shadow-3xl transform transition-all hover:scale-105 hover:shadow-2xl'>
//             <h2 className='text-3xl font-bold mb-8 text-center text-gray-900 tracking-wider transform transition-all hover:scale-105 hover:text-white hover:drop-shadow-2xl'>
//               Employee Details
//             </h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//               {/* Profile Picture */}
//               <div className='flex justify-center items-center'>
//                 <div className='relative'>
//                   <img 
//                     src={`http://localhost:5000/${employee.userId.profileImage}`} 
//                     alt='Profile' 
//                     className='rounded-full border-8 border-teal-500 shadow-xl w-72 h-72 object-cover transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-1'
//                   />
//                 </div>
//               </div>
              
//               {/* Employee Details */}
//               <div className='space-y-4'>
//                 <div className='flex items-center space-x-4 group'>
//                   <p className='text-lg font-semibold text-gray-800 drop-shadow-lg group-hover:scale-105 group-hover:text-gray-100 transition-all duration-300'>
//                     Name:
//                   </p>
//                   <p className='font-medium text-gray-700 group-hover:text-gray-100 transition-all duration-300'>
//                     {employee.userId.name}
//                   </p>
//                 </div>
//                 <div className='flex items-center space-x-4 group'>
//                   <p className='text-lg font-semibold text-gray-800 drop-shadow-lg group-hover:scale-105 group-hover:text-gray-100 transition-all duration-300'>
//                     Employee ID:
//                   </p>
//                   <p className='font-medium text-gray-700 group-hover:text-gray-100 transition-all duration-300'>
//                     {employee.employeeId}
//                   </p>
//                 </div>
//                 <div className='flex items-center space-x-4 group'>
//                   <p className='text-lg font-semibold text-gray-800 drop-shadow-lg group-hover:scale-105 group-hover:text-gray-100 transition-all duration-300'>
//                     Date of Birth:
//                   </p>
//                   <p className='font-medium text-gray-700 group-hover:text-gray-100 transition-all duration-300'>
//                     {new Date(employee.dob).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className='flex items-center space-x-4 group'>
//                   <p className='text-lg font-semibold text-gray-800 drop-shadow-lg group-hover:scale-105 group-hover:text-gray-100 transition-all duration-300'>
//                     Gender:
//                   </p>
//                   <p className='font-medium text-gray-700 group-hover:text-gray-100 transition-all duration-300'>
//                     {employee.gender}
//                   </p>
//                 </div>
//                 <div className='flex items-center space-x-4 group'>
//                   <p className='text-lg font-semibold text-gray-800 drop-shadow-lg group-hover:scale-105 group-hover:text-gray-100 transition-all duration-300'>
//                     Department:
//                   </p>
//                   <p className='font-medium text-gray-700 group-hover:text-gray-100 transition-all duration-300'>
//                     {employee.department.dep_name}
//                   </p>
//                 </div>
//                 <div className='flex items-center space-x-4 group'>
//                   <p className='text-lg font-semibold text-gray-800 drop-shadow-lg group-hover:scale-105 group-hover:text-gray-100 transition-all duration-300'>
//                     Marital Status:
//                   </p>
//                   <p className='font-medium text-gray-700 group-hover:text-gray-100 transition-all duration-300'>
//                     {employee.maritalStatus}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Hover effect button */}
//             <div className='text-center mt-8'>
//               <button className='px-6 py-2 bg-teal-600 text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300'>
//                 View More
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className='text-center text-xl text-teal-600 font-semibold'>
//             Loading...
//           </div>
//         )}
//       </>
//     )
// }

// export default View










import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          setError(response.data.error || 'Employee not found');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 mx-auto"></div>
        <p className="text-teal-600 mt-4">Loading Employee...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-b from-blue-400 to-purple-600 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Employee Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000/${employee.userId.profileImage}`}
            alt="Profile"
            className="rounded-full border-8 border-teal-500 w-72 h-72 object-cover"
          />
        </div>

        {/* Employee Info */}
        <div className="space-y-4 text-white">
          <p><strong>Name:</strong> {employee.userId.name}</p>
          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Department:</strong> {employee.department.dep_name}</p>
          <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>

          {showMore && (
            <>
              <p><strong>Email:</strong> {employee.userId.email}</p>
              <p><strong>Salary:</strong> ₹{employee.salary}</p>
            </>
          )}

          <button
            className="mt-4 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'View Less' : 'View More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
