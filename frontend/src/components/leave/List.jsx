// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/authContext";

// const List = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [filteredLeaves, setFilteredLeaves] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   let sno = 1;
//   const { id } = useParams();
//   const { user } = useAuth();

//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/leave/${id}/${user.role}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         setLeaves(response.data.leaves);
//         setFilteredLeaves(response.data.leaves);
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         alert(error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, [id]);

//   // ✅ Search Filter Function
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     const query = e.target.value.toLowerCase();
//     const filtered = leaves.filter((leave) =>
//       leave.leaveType.toLowerCase().includes(query)
//     );
//     setFilteredLeaves(filtered);
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen rounded-xl shadow-2xl">
//       {/* ✅ Title with Effect */}
//       <div className="text-center mb-6">
//         <h3 className="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 drop-shadow-md">
//           Manage Leaves
//         </h3>
//       </div>

//       {/* ✅ Search & Button */}
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search by Leave Type..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="px-4 py-2 rounded-lg shadow-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out"
//         />

//         {user.role === "employee" && (
//           <Link
//             to="/employee-dashboard/add-leave"
//             className="px-5 py-2 bg-teal-500 hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-full text-white font-semibold"
//           >
//             + Add Leave
//           </Link>
//         )}
//       </div>

//       {/* ✅ Table */}
//       {filteredLeaves.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left text-gray-300 rounded-lg shadow-lg">
//             <thead className="text-xs uppercase bg-gray-800 text-gray-400">
//               <tr className="border-b border-gray-700">
//                 <th className="px-6 py-3">SNO</th>
//                 <th className="px-6 py-3">Leave Type</th>
//                 <th className="px-6 py-3">From</th>
//                 <th className="px-6 py-3">To</th>
//                 <th className="px-6 py-3">Reason</th>
//                 <th className="px-6 py-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLeaves.map((leave) => (
//                 <tr
//                   key={leave._id}
//                   className="bg-gray-900 border-b border-gray-700 hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   <td className="px-6 py-3">{sno++}</td>
//                   <td className="px-6 py-3 font-semibold text-teal-400">
//                     {leave.leaveType}
//                   </td>
//                   <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
//                   <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
//                   <td className="px-6 py-3 text-gray-300">{leave.reason}</td>
//                   <td className="px-6 py-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold ${
//                         leave.status === "Approved"
//                           ? "bg-green-500 text-white"
//                           : leave.status === "Pending"
//                           ? "bg-yellow-500 text-white"
//                           : "bg-red-500 text-white"
//                       }`}
//                     >
//                       {leave.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center text-gray-400 text-lg mt-6">
//           No leave records found.
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;








import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]);

  // ✅ Search Filter Function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.leaveType.toLowerCase().includes(query)
    );
    setFilteredLeaves(filtered);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen rounded-xl shadow-2xl">
      {/* ✅ Title */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Manage Leaves
        </h3>
      </div>

      {/* ✅ Search & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by Leave Type..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-teal-400"
        />

        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full"
          >
            + Add Leave
          </Link>
        )}
      </div>

      {/* ✅ Table */}
      {filteredLeaves.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-sm text-left text-gray-300 border border-gray-700">
            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Leave Type</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave._id} className="bg-gray-900 border-b border-gray-700">
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3 font-semibold text-teal-400">
                    {leave.leaveType}
                  </td>
                  <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-gray-300">{leave.reason}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        leave.status === "Approved"
                          ? "bg-green-500 text-white"
                          : leave.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mt-6">
          No leave records found.
        </div>
      )}
    </div>
  );
};

export default List;
