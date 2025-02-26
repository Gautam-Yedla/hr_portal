// import React, { useEffect, useState } from 'react'
// import { fetchDepartments } from '../../utils/EmployeeHelper'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const Add = () => {

//   const [departments, setDepartments] = useState([])
//   const [formData, setFormData] = useState({})
//   const navigate = useNavigate()

//   useEffect(() => {
//     const getDepartments = async () => {
//       const departments = await fetchDepartments()
//       setDepartments(departments)
//     }
//     getDepartments()
//   }, [])

//   const handleChange = (e) => {
//     const { name, value, files } = e.target
//     if (name === "image") {
//       setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const formDataObj = new FormData()
//     Object.keys(formData).forEach((key) => {
//       formDataObj.append(key, formData[key])
//     })

//     try {
//       const response = await axios.post('http://localhost:5000/api/employee/add', formDataObj, {
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
//     <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-b from-teal-100 to-gray-800 p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 tracking-wide">Add New Employee</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Name</label>
//             <input
//               type="text"
//               name="name"
//               onChange={handleChange}
//               placeholder="Insert Name"
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Email</label>
//             <input
//               type="email"
//               name="email"
//               onChange={handleChange}
//               placeholder="Insert Email"
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             />
//           </div>

//           {/* Employee ID */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Employee ID</label>
//             <input
//               type="text"
//               name="employeeId"
//               onChange={handleChange}
//               placeholder="Employee ID"
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             />
//           </div>

//           {/* Date of Birth */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Date of Birth</label>
//             <input
//               type="date"
//               name="dob"
//               onChange={handleChange}
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             />
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Gender</label>
//             <select
//               name="gender"
//               onChange={handleChange}
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Marital Status */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Marital Status</label>
//             <select
//               name="maritalStatus"
//               onChange={handleChange}
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             >
//               <option value="">Select Marital Status</option>
//               <option value="single">Single</option>
//               <option value="married">Married</option>
//             </select>
//           </div>

//           {/* Designation */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Designation</label>
//             <input
//               type="text"
//               name="designation"
//               onChange={handleChange}
//               placeholder="Designation"
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             />
//           </div>

//           {/* Department */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Department</label>
//             <select
//               name="department"
//               onChange={handleChange}
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             >
//               <option value="">Select Department</option>
//               {departments.map((dep) => (
//                 <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Salary */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Salary</label>
//             <input
//               type="number"
//               name="salary"
//               onChange={handleChange}
//               placeholder="Salary"
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Password</label>
//             <input
//               type="password"
//               name="password"
//               onChange={handleChange}
//               placeholder="******"
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Role</label>
//             <select
//               name="role"
//               onChange={handleChange}
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//               required
//             >
//               <option value="">Select Role</option>
//               <option value="admin">Admin</option>
//               <option value="employee">Employee</option>
//             </select>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800">Upload Image</label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               accept="image/*"
//               className="mt-2 p-4 block w-full border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:shadow-2xl transform transition-all duration-300"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full mt-6 bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-xl transform hover:bg-teal-700 hover:scale-105 transition-all duration-300"
//         >
//           Add Employee
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Add















import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));

    try {
      const response = await axios.post("http://localhost:5000/api/employee/add", formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) navigate("/admin-dashboard/employees");
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "Employee ID", type: "text", name: "employeeId" },
            { label: "Date of Birth", type: "date", name: "dob" },
            { label: "Designation", type: "text", name: "designation" },
            { label: "Salary", type: "number", name: "salary" },
            { label: "Password", type: "password", name: "password" },
          ].map(({ label, type, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
                required
              />
            </div>
          ))}

          {[
            { label: "Gender", name: "gender", options: ["Male", "Female", "Other"] },
            { label: "Marital Status", name: "maritalStatus", options: ["Single", "Married"] },
            { label: "Role", name: "role", options: ["Admin", "Employee"] },
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <select
                name={name}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
                required
              >
                <option value="">{`Select ${label}`}</option>
                {options.map((option) => (
                  <option key={option.toLowerCase()} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Department Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
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

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 hover:scale-105 transition-all duration-300"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
