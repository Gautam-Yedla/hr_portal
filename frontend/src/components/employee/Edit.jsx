// import React, { useEffect, useState } from 'react'
// import { fetchDepartments } from '../../utils/EmployeeHelper'
// import axios from 'axios'
// import { useNavigate, useParams } from 'react-router-dom'

// const Edit = () => {

//   const [employee, setEmployee] = useState({
//     name: '',
//     maritalStatus: '',
//     designation: '',
//     salary: 0,
//     department: '',
//   })
//   const [departments, setDepartments] = useState(null)
//   const navigate = useNavigate();
//   const { id } = useParams()

//   useEffect(() => {
//     const getDepartments = async () => {
//       const departments = await fetchDepartments();
//       setDepartments(departments)
//     }
//     getDepartments()
//   }, []);

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const response = await axios.get(
//           `https://hr-sample-backend.onrender.com/api/employee/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (response.data.success) {
//           const employee = response.data.employee
//           setEmployee((prev) => ({
//             ...prev,
//             name: employee.userId.name,
//             maritalStatus: employee.maritalStatus,
//             designation: employee.designation,
//             salary: employee.salary,
//             department: employee.department
//           }));
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       }
//     };

//     fetchEmployee();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prevData) => ({ ...prevData, [name]: value }));
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await axios.put(`https://hr-sample-backend.onrender.com/api/employee/${id}`, employee, {
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//       })
//       if (response.data.success) {
//         navigate("/admin-dashboard/employees")
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         alert(error.response.data.error)
//       }
//     }
//   }

//   return (
//     <>
//       {employee && departments ? (
//         <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-b from-teal-100 to-gray-800 p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl">
//           <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 tracking-wide">Edit Employee</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-800">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={employee.name}
//                   onChange={handleChange}
//                   placeholder="Insert Name"
//                   className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//                   required
//                 />
//               </div>

//               {/* Marital Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-800">Marital Status</label>
//                 <select
//                   name="maritalStatus"
//                   onChange={handleChange}
//                   value={employee.maritalStatus}
//                   className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//                   required
//                 >
//                   <option value="">Select Status</option>
//                   <option value="single">Single</option>
//                   <option value="married">Married</option>
//                 </select>
//               </div>

//               {/* Designation */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-800">Designation</label>
//                 <input
//                   type="text"
//                   name="designation"
//                   value={employee.designation}
//                   onChange={handleChange}
//                   placeholder="Designation"
//                   className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//                   required
//                 />
//               </div>

//               {/* Salary */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-800">Salary</label>
//                 <input
//                   type="number"
//                   name="salary"
//                   value={employee.salary}
//                   onChange={handleChange}
//                   placeholder="Salary"
//                   className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//                   required
//                 />
//               </div>

//               {/* Department */}
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-800">Department</label>
//                 <select
//                   name="department"
//                   onChange={handleChange}
//                   value={employee.department}
//                   className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//                   required
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map(dep => (
//                     <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full mt-6 bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-xl transform hover:bg-teal-700 hover:scale-105 hover:shadow-3xl transition-all duration-300"
//             >
//               Confirm Edit
//             </button>
//           </form>
//         </div>
//       ) : <div className="text-center text-gray-600">Loading...</div>}
//     </>
//   )
// }

// export default Edit;










import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: '',
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://hr-sample-backend.onrender.com/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://hr-sample-backend.onrender.com/api/employee/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {employee && departments ? (
        <div className="max-w-4xl mx-auto mt-12 bg-white border border-gray-300 shadow-lg rounded-xl p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Edit Employee</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 outline-none shadow-sm transition-all"
                  required
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status</label>
                <select
                  name="maritalStatus"
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 outline-none shadow-sm transition-all"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 outline-none shadow-sm transition-all"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 outline-none shadow-sm transition-all"
                  required
                />
              </div>

              {/* Department */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  name="department"
                  onChange={handleChange}
                  value={employee.department}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 outline-none shadow-sm transition-all"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all duration-300"
            >
              Confirm Edit
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-10 animate-pulse">Loading...</div>
      )}
    </>
  );
};

export default Edit;

