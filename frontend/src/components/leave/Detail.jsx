// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'

// const Detail = () => {
//     const {id} = useParams();
//     const [leave, setLeave] = useState(null)
//     const navigate = useNavigate()

//     useEffect(() => {

//        if (!id) {
//          console.error("Error: Leave ID is undefined");
//          return;
//        }

//       const fetchLeave = async () => {
//         try {
//           const response = await axios.get(
//             `https://hr-sample-backend.onrender.com/api/leave/detail/${id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
//           if (response.data.success) {
//             setLeave(response.data.leave); 
//           }
//         } catch (error) {
//           console.error(error);
//           if (error.response && !error.response.data.success) {
//             alert(error.response.data.error);
//           }
//         }
//       };
      

//       fetchLeave();
//     }, [id]);


//     const changeStatus = async (id, status) => {
//       try {
//         const response = await axios.put(
//           `https://hr-sample-backend.onrender.com/api/leave/${id}`, {status},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (response.data.success) {
//           navigate('/admin-dashboard/leaves')
//         }
//       } catch (error) {
//         console.error(error);
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       }
//     }

//   return (
//     <>{leave ? (
//       <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
//           <h2 className='text-2xl font-bold mb-8 text-center'>
//             Leave Details
//           </h2>
//           <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//               <div>
//                 <img 
//                   src={`https://hr-sample-backend.onrender.com/${leave.employeeId.userId.profileImage}`} alt=''
//                   className='rounded-full border w-72'
//                 />
//               </div>
//               <div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Name:</p>
//                       <p className='font-medium'>{leave.employeeId.userId.name}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Employee ID:</p>
//                       <p className='font-medium'>{leave.employeeId.employeeId}</p>
//                   </div>
                  
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Leave Type:</p>
//                       <p className='font-medium'>
//                         {leave.leaveType}
//                       </p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Reason:</p>
//                       <p className='font-medium'>{leave.reason}</p>
//                   </div>
                  
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Department:</p>
//                       <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Start Date:</p>
//                       <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>End Date:</p>
//                       <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-2'>
//                       <p className='text-lg font-bold'>
//                         {leave.status === "Pending" ? "Action:" : "Status:"}
//                       </p>
//                       {leave.status === "Pending" ? (
//                         <div className='flex space-x-2'>
//                           <button className='px-2 py-0.5 bg-teal-300 hover:bg-teal-400'
//                           onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
//                           <button className='px-2 py-0.5 bg-red-300 hover:bg-teal-400'
//                           onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
//                         </div>
//                       ) :
//                         <p className='font-medium'>{leave.status}</p>
//                       }
//                   </div>

//               </div>
//           </div>
//       </div>

//     ): <div>Loading leave details.....</div>}</>
//   )
// }

// export default Detail






// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'

// const Detail = () => {
//     const {id} = useParams();
//     const [leave, setLeave] = useState(null)
//     const navigate = useNavigate()

//     useEffect(() => {

//        if (!id) {
//          console.error("Error: Leave ID is undefined");
//          return;
//        }

//       const fetchLeave = async () => {
//         try {

//           console.log("Fetching leave details for ID:", id);

//           if (!id || id.length !== 24) { // MongoDB ObjectId must be 24 chars long
//             console.error("Invalid leave ID:", id);
//             return;
//           }

//           console.log("Leave Detail ID:", id);

//           const response = await axios.get(
//             `https://hr-sample-backend.onrender.com/api/leave/detail/${id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
//           if (response.data.success) {
//             setLeave(response.data.leave); 
//           } else {
//             console.error("Failed to fetch leave details:", response.data.message);
//           }
//         } catch (error) {
//           console.error(error);
//           if (error.response && !error.response.data.success) {
//             alert(error.response.data.error);
//           }
//         }
//       };
      
//       fetchLeave();
//     }, [id]);

//     const changeStatus = async (id, status) => {
//       try {
//         const response = await axios.put(
//           `https://hr-sample-backend.onrender.com/api/leave/${id}`, {status},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (response.data.success) {
//           navigate('/admin-dashboard/leaves')
//         }
//       } catch (error) {
//         console.error(error);
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       }
//     }

//   return (
//     <>{leave ? (
//       <div className='max-w-3xl mx-auto mt-10 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-8 rounded-md shadow-xl transform hover:scale-105 transition-all'>
//           <h2 className='text-2xl font-bold mb-8 text-center text-white'>
//             Leave Details
//           </h2>
//           <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//               <div className='flex justify-center'>
//               <img
//                 src={leave?.employeeId?.userId?.profileImage ? 
//                   `https://hr-sample-backend.onrender.com/${leave.employeeId.userId.profileImage}` : "/default-avatar.png"}
//                 alt="Profile"
//                 className="rounded-full border w-72 transform transition-all hover:scale-105"
//               />

//               </div>
//               <div className='text-white'>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Name:</p>
//                       <p className='font-medium'>{leave.employeeId.userId.name}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Employee ID:</p>
//                       <p className='font-medium'>{leave.employeeId.employeeId}</p>
//                   </div>
//                    <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Leave Type:</p>
//                       <p className='font-medium'>
//                         {leave.leaveType}
//                       </p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Reason:</p>
//                       <p className='font-medium'>{leave.reason}</p>
//                   </div>
                  
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Department:</p>
//                       <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>Start Date:</p>
//                       <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-5'>
//                       <p className='text-lg font-bold'>End Date:</p>
//                       <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>
//                   </div>
//                   <div className='flex space-x-3 mb-2'>
//                       <p className='text-lg font-bold'>
//                         {leave.status === "Pending" ? "Action:" : "Status:"}
//                       </p>
//                       {leave.status === "Pending" ? (
//                         <div className='flex space-x-2'>
//                           <button className='px-4 py-2 bg-green-500 text-white rounded-lg transform hover:scale-105 transition-all hover:bg-green-600'
//                           onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
//                           <button className='px-4 py-2 bg-red-500 text-white rounded-lg transform hover:scale-105 transition-all hover:bg-red-600'
//                           onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
//                         </div>
//                       ) :
//                         <p className='font-medium'>{leave.status}</p>
//                       }
//                   </div>

//               </div>
//           </div>
//       </div>

//     ): <div className="text-center text-xl text-white mt-10">Loading leave details.....</div>}</>
//   )
// }

// export default Detail
