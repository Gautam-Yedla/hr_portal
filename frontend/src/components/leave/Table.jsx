// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { columns, LeaveButtons } from '../../utils/LeaveHelper';
// import DataTable from 'react-data-table-component';

// const Table = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [filteredLeaves, setFilteredLeaves] = useState(null);

//   // Fetch leave data
//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get('https://hr-sample-backend.onrender.com/api/leave', {
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (response.data.success) {
//         let sno = 1;
//         const data = response.data.leaves.map((leave) => ({
//           _id: leave._id,
//           sno: sno++,
//           employeeId: leave.employeeId.employeeId,
//           name: leave.employeeId.userId.name,
//           leaveType: leave.leaveType,
//           department: leave.employeeId.department.dep_name,
//           days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)),
//           status: leave.status,
//           action: (<LeaveButtons id={leave._id} />),
//         }));
//         setLeaves(data);
//         setFilteredLeaves(data);
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         alert(error.response.data.error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   // Filter by input
//   const filterByInput = (e) => {
//     const data = leaves.filter((leave) =>
//       leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredLeaves(data);
//   };

//   // Filter by button status
//   const filterByButton = (status) => {
//     const data = leaves.filter((leave) =>
//       leave.status.toLowerCase().includes(status.toLowerCase())
//     );
//     setFilteredLeaves(data);
//   };

//   return (
//     <>
//       {filteredLeaves ? (
//         <div className="p-6 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-xl transform transition-all duration-500 ease-in-out mt-12">
//           <div className="text-center mb-4">
//             <h3 className="text-3xl font-bold text-white drop-shadow-md tracking-wide uppercase text-shadow-animation">
//               Manage Leaves
//             </h3>
//           </div>

//           {/* Filter section */}
//           <div className="flex justify-between items-center mb-6 space-x-4">
//             {/* Search bar */}
//             <input
//               type="text"
//               placeholder="Search by Employee ID"
//               className="px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition duration-500 ease-in-out transform hover:scale-105 w-1/3 bg-gray-200 text-gray-700 hover:border-teal-500 border-2 border-transparent"
//               onChange={filterByInput}
//             />

//             {/* Filter buttons */}
//             <div className="space-x-4">
//               <button
//                 className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl"
//                 onClick={() => filterByButton("Approved")}
//               >
//                 Approved
//               </button>
//               <button
//                 className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl"
//                 onClick={() => filterByButton("Rejected")}
//               >
//                 Rejected
//               </button>
//               <button
//                 className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl"
//                 onClick={() => filterByButton("Pending")}
//               >
//                 Pending
//               </button>
//             </div>
//           </div>

//           {/* Table Component */}
//           <DataTable
//             columns={columns}
//             data={filteredLeaves}
//             pagination
//             customStyles={{
//               rows: {
//                 style: {
//                   transition: 'transform 0.3s ease-out',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
//                     cursor: 'pointer',
//                   },
//                 },
//               },
//               headCells: {
//                 style: {
//                   backgroundColor: '#2D3748',
//                   color: 'white',
//                   fontWeight: 'bold',
//                   textTransform: 'uppercase',
//                   padding: '16px 20px', 
//                   textAlign: 'center', 
//                 },
//               },
//               cells: {
//                 style: {
//                   padding: '12px 20px', 
//                   fontSize: '16px',
//                   textAlign: 'center', 
//                 },
//               },
//             }}
//           />
//         </div>
//       ) : (
//         <div className="text-center text-xl text-teal-600 animate-pulse">Loading leave tables...</div>
//       )}
//     </>
//   );
// };

// export default Table;













import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';
import { FaSearch } from 'react-icons/fa';

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [page, setPage] = useState(1); // For pagination in infinite scroll
  const ITEMS_PER_PAGE = 10; // Adjust as needed

  // Fetch leave data with pagination for infinite scroll
  const fetchLeaves = async (currentPage) => {
    try {
      const response = await axios.get(`https://hr-sample-backend.onrender.com/api/leave?page=${currentPage}&limit=${ITEMS_PER_PAGE}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        let sno = leaves.length + 1;
        const newLeaves = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)),
          status: leave.status,
          action: (<LeaveButtons id={leave._id} />),
        }));

        setLeaves((prevLeaves) => [...prevLeaves, ...newLeaves]);
        setFilteredLeaves((prevLeaves) => [...prevLeaves, ...newLeaves]);
        setHasMore(newLeaves.length === ITEMS_PER_PAGE); // If less data, no more to load
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setHasMore(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(page);
  }, [page]);

  // Intersection Observer for Infinite Scroll
  const lastLeaveElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Filter by input
  const filterByInput = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(searchText)
    );
    setFilteredLeaves(filtered);
  };

  // Filter by button status
  const filterByButton = (status) => {
    const filtered = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(filtered);
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg mt-12 max-w-full xl:max-w-7xl mx-auto border border-gray-200 overflow-hidden">
      <div className="text-center mb-6">
        <h3 className="text-4xl font-extrabold text-gray-800 tracking-wider uppercase">
          Manage Leaves
        </h3>
      </div>

      {/* Filter section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        {/* Search bar */}
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by Employee ID"
            className="w-full px-5 py-3 pl-12 rounded-lg shadow-md border border-gray-300 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all"
            onChange={filterByInput}
          />
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-4">
          {['Approved', 'Rejected', 'Pending'].map((status) => (
            <button
              key={status}
              className={`px-5 py-3 rounded-lg font-medium text-white transition-transform transform hover:scale-105 shadow-md ${
                status === 'Approved' ? 'bg-teal-600 hover:bg-teal-700' :
                status === 'Rejected' ? 'bg-red-600 hover:bg-red-700' :
                'bg-yellow-500 hover:bg-yellow-600'
              }`}
              onClick={() => filterByButton(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* DataTable with Infinite Scroll */}
      <div className="overflow-x-hidden">
        <DataTable
          columns={columns}
          data={filteredLeaves}
          highlightOnHover
          striped
          responsive
          noHeader
          customStyles={{
            rows: {
              style: {
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f0fdf4',
                },
              },
            },
            headCells: {
              style: {
                backgroundColor: '#1f2937',
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '14px',
                padding: '14px',
                textAlign: 'center',
              },
            },
            cells: {
              style: {
                padding: '12px',
                fontSize: '15px',
                textAlign: 'center',
              },
            },
          }}
        />

        {/* Infinite Scroll Trigger */}
        <div ref={lastLeaveElementRef} className="text-center py-4">
          {loading && (
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          )}
          {!hasMore && !loading && (
            <p className="text-gray-500">No more leaves to load.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;






