// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from "axios"
// import Datatable from "react-data-table-component"
// import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'

// const List = () => {
//   const [employees, setEmployees] = useState([])
//   const [empLoading, setEmpLoading] = useState(false)
//   const [filteredEmployee, setFilteredEmployees] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       setEmpLoading(true);
//       try {
//         const response = await axios.get('https://hr-sample-backend.onrender.com/api/employee', {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         if (response.data.success) {
//           let sno = 1;
//           const data = await response.data.employees.map((emp) => (
//             {
//               _id: emp._id,
//               sno: sno++,
//               dep_name: emp.department.dep_name,
//               name: emp.userId.name,
//               dob: new Date(emp.dob).toLocaleDateString(),
//               profileImage: <img width={40} className='rounded-full' src={`https://hr-sample-backend.onrender.com/${emp.userId.profileImage}`} />,
//               action: (<EmployeeButtons _id={emp._id} />)
//             }
//           ));
//           setEmployees(data);
//           setFilteredEmployees(data);
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       } finally {
//         setEmpLoading(false);
//       }
//     };
  
//     fetchEmployees();
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     // Filter employees based on the search query
//     const filtered = employees.filter(emp => 
//       emp.name.toLowerCase().includes(query.toLowerCase()) ||
//       emp.dep_name.toLowerCase().includes(query.toLowerCase()) // extend to other fields
//     );
//     setFilteredEmployees(filtered);
//   }

//   return (
//     <div className='p-6 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-400 rounded-xl shadow-lg overflow-x-hidden'>
//       <div className='text-center'>
//         <h3 className='text-3xl font-bold text-gray-900 tracking-wider transform hover:scale-105 transition-all duration-300'>
//           Employees
//         </h3>
//       </div>
//       <div className='flex justify-between items-center mt-4'>
//         <input 
//           type='text' 
//           placeholder='Search Employee Name or Department' 
//           className='px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 transform hover:scale-105'
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <Link 
//           to="/admin-dashboard/add-employee" 
//           className='px-4 py-2 bg-teal-600 rounded-lg text-white shadow-xl transform hover:bg-teal-700 hover:scale-105 transition-all duration-300'
//         >
//           Add Employee
//         </Link>
//       </div>

//       <div className='mt-6 overflow-x-auto'>
//         <Datatable
//           columns={columns}
//           data={filteredEmployee}
//           pagination
//           customStyles={{
//             rows: {
//               style: {
//                 background: 'linear-gradient(45deg, rgba(0, 162, 255, 0.1), rgba(0, 206, 255, 0.2))',
//                 '&:hover': {
//                   transform: 'scale(1.02)',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease'
//                 }
//               }
//             },
//             headCells: {
//               style: {
//                 backgroundColor: '#f4f4f4',
//                 fontWeight: '600',
//                 padding: '12px 16px',
//                 fontSize: '16px',
//                 color: '#2d3748',
//                 borderBottom: '2px solid #e2e8f0',
//                 textTransform: 'uppercase',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 '&:hover': {
//                   backgroundColor: '#e2e8f0',
//                   transform: 'scale(1.05)',
//                   transition: 'transform 0.3s ease, background-color 0.3s ease'
//                 }
//               }
//             },
//             cells: {
//               style: {
//                 padding: '12px 16px',
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                   transition: 'transform 0.3s ease',
//                 }
//               }
//             }
//           }}
//         />
//       </div>
//     </div>
//   )
// }

// export default List
















import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Datatable from "react-data-table-component";
import { FaTable, FaThLarge, FaEye, FaEdit, FaMoneyBill, FaPlaneDeparture, FaTrash } from 'react-icons/fa';
import { columns } from '../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [empLoading, setEmpLoading] = useState(false);
  const [viewMode, setViewMode] = useState('card');
  const [page, setPage] = useState(1);
  const pageSize = 10; // Assuming 10 employees per page

  useEffect(() => {
    if (page === 1) {
      setEmployees([]);
      setFilteredEmployees([]);
    }
    fetchEmployees();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  // ✅ Fetch Employees
  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(`https://hr-sample-backend.onrender.com/api/employee?page=${page}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.data.success) {
        const newEmployees = response.data.employees.map((emp, index) => ({
          _id: emp._id,
          // sno: (page - 1) * pageSize + index + 1, // ✅ Fixed S.No increment
          name: emp.userId.name,
          profileImage: emp.userId.profileImage, // ✅ Direct Image URL for Card View
          dep_name: emp.department?.dep_name || "N/A", // ✅ Department name fix
          dob: new Date(emp.dob).toLocaleDateString(),
          action: (
            <div className="flex space-x-3 justify-center text-2xl"> {/* ✅ Increased button size */}
              <Link to={`/admin-dashboard/employees/${emp._id}`} className="text-blue-600 hover:text-blue-800" title="View"><FaEye /></Link>
              <Link to={`/admin-dashboard/employees/edit/${emp._id}`} className="text-green-600 hover:text-green-800" title="Edit"><FaEdit /></Link>
              <Link to={`/admin-dashboard/employees/salary/${emp._id}`} className="text-yellow-600 hover:text-yellow-800" title="Salary"><FaMoneyBill /></Link>
              <Link to={`/admin-dashboard/employees/leaves/${emp._id}`} className="text-red-600 hover:text-red-800" title="Leave"><FaPlaneDeparture /></Link>
              <button onClick={() => handleDelete(emp._id)} className="text-gray-600 hover:text-gray-800" title="Delete"><FaTrash /></button>
            </div>
          )
        }));

        // ✅ Avoid Duplicates
        const uniqueEmployees = Array.from(
          new Map([...employees, ...newEmployees].map(item => [item._id, item])).values()
        ).map((emp, index) => ({ ...emp, sno: index + 1 })); // ✅ Reindex S.No here

        setEmployees(uniqueEmployees);
        setFilteredEmployees(uniqueEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setEmpLoading(false);
    }
  };

  // ✅ Infinite Scroll
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !empLoading) {
      setPage(prev => prev + 1);
    }
  };

  // ✅ Search Filter
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(query.toLowerCase()) ||
      emp.dep_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // ✅ Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`https://hr-sample-backend.onrender.com/api/employee/${id}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
        const updatedEmployees = employees.filter(emp => emp._id !== id);
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        alert("Employee deleted successfully");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Employee Directory</h1>
        <div className='flex gap-4 items-center'>
          <input
            type='text'
            placeholder='Search employees...'
            className='px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Link to="/admin-dashboard/add-employee" className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>+ Add Employee</Link>
          <button onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')} className='p-2 bg-gray-200 rounded-lg hover:bg-gray-300'>
            {viewMode === 'card' ? <FaTable size={20} /> : <FaThLarge size={20} />}
          </button>
        </div>
      </div>

      {empLoading && <div className='text-center text-blue-500'>Loading...</div>}

      {viewMode === 'card' ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredEmployee.map(emp => (
            <div key={emp._id} className='bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-transform transform hover:scale-105'>
              <img src={`https://hr-sample-backend.onrender.com/${emp.profileImage}`} alt={emp.name} className='w-24 h-24 rounded-full mx-auto border-2 border-blue-500' />
              <h2 className='text-center text-xl font-bold mt-3'>{emp.name}</h2>
              <p className='text-center text-gray-500'>{emp.dep_name}</p>
              <p className='text-center text-sm text-gray-400'>DOB: {emp.dob}</p>

              <div className='flex justify-center gap-4 mt-4 text-2xl'> {/* ✅ Increased size */}
                <Link to={`/admin-dashboard/employees/${emp._id}`} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"><FaEye /></Link>
                <Link to={`/admin-dashboard/employees/edit/${emp._id}`} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-700"><FaEdit /></Link>
                <Link to={`/admin-dashboard/employees/salary/${emp._id}`} className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-700"><FaMoneyBill /></Link>
                <Link to={`/admin-dashboard/employees/leaves/${emp._id}`} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700"><FaPlaneDeparture /></Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Datatable
          columns={columns.map(col => 
            col.name === 'Image' ? {
              ...col,
              selector: row => (
                <img
                  src={`https://hr-sample-backend.onrender.com/${row.profileImage}`}
                  alt={row.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
              ),
              center: true,
              width: "80px"
            } : col.name === 'Action' ? {
              ...col,
              cell: row => (
                <div className="flex justify-center gap-3 text-2xl"> {/* ✅ Increased button size */}
                  <Link to={`/admin-dashboard/employees/${row._id}`} className="text-blue-600 hover:text-blue-800" title="View">
                    <FaEye />
                  </Link>
                  <Link to={`/admin-dashboard/employees/edit/${row._id}`} className="text-green-600 hover:text-green-800" title="Edit">
                    <FaEdit />
                  </Link>
                  <Link to={`/admin-dashboard/employees/salary/${row._id}`} className="text-yellow-600 hover:text-yellow-800" title="Salary">
                    <FaMoneyBill />
                  </Link>
                  <Link to={`/admin-dashboard/employees/leaves/${row._id}`} className="text-red-600 hover:text-red-800" title="Leave">
                    <FaPlaneDeparture />
                  </Link>
                  <button onClick={() => handleDelete(row._id)} className="text-gray-600 hover:text-gray-800" title="Delete">
                    <FaTrash />
                  </button>
                </div>
              ),
              center: true
            } : col
          )}
          data={filteredEmployee}
          pagination
          customStyles={{
            rows: {
              style: {
                minHeight: '60px',
                '&:hover': { backgroundColor: '#f1f5f9' },
                cursor: 'pointer'
              },
            },
            headCells: {
              style: {
                backgroundColor: '#f8fafc',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                paddingLeft: '12px',
                paddingRight: '12px',
              },
            },
            cells: {
              style: {
                paddingLeft: '12px',
                paddingRight: '12px',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default List;
















