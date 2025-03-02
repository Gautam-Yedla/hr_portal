// import React, { useEffect, useState } from "react";
// import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Add = () => {
//   const [salary, setSalary] = useState({
//     employeeId: "",
//     basicSalary: "",
//     allowances: "",
//     deductions: "",
//     tax: "",
//     pf: "",
//     bonus: "",
//     paymentMode: "",
//     bankDetails: "",
//     payDate: "",
//   });

//   const [departments, setDepartments] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getDepartments = async () => {
//       const departments = await fetchDepartments();
//       setDepartments(departments);
//     };
//     getDepartments();
//   }, []);

//   const handleDepartment = async (e) => {
//     const emps = await getEmployees(e.target.value);
//     setEmployees(emps);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSalary((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Calculate Net Salary
//   const calculateNetSalary = () => {
//     const basic = parseFloat(salary.basicSalary) || 0;
//     const allow = parseFloat(salary.allowances) || 0;
//     const deduct = parseFloat(salary.deductions) || 0;
//     const taxAmount = (parseFloat(salary.tax) / 100) * basic || 0;
//     const pfAmount = (parseFloat(salary.pf) / 100) * basic || 0;
//     const bonusAmount = parseFloat(salary.bonus) || 0;

//     return basic + allow + bonusAmount - deduct - taxAmount - pfAmount;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const netSalary = calculateNetSalary();

//     if (salary.basicSalary <= 0) {
//       alert("Basic Salary must be greater than zero.");
//       return;
//     }
//     if (salary.bonus > salary.basicSalary * 0.5) {
//       alert("Bonus cannot be more than 50% of the Basic Salary.");
//       return;
//     }
//     if (salary.paymentMode === "Bank Transfer" && !salary.bankDetails) {
//       alert("Bank details are required for Bank Transfer.");
//       return;
//     }

//     const salaryData = {
//       ...salary,
//       netSalary,
//       bankDetails: salary.paymentMode === "Bank Transfer" ? salary.bankDetails : "N/A",
//     };

//     try {
//       const response = await axios.post(`http://localhost:5000/api/salary/add`, salaryData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.data.success) {
//         navigate("/admin-dashboard/employees");
//       }
//     } catch (error) {
//       console.error("Error response:", error.response);
//       if (error.response && !error.response.data.success) {
//         alert(error.response.data.error);
//       }
//     }
//   };

//   return (
//     <>
//       {departments ? (
//         <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
//           <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//             Add Salary
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Department Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Department
//                 </label>
//                 <select
//                   name="department"
//                   onChange={handleDepartment}
//                   className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
//                   required
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map((dep) => (
//                     <option key={dep._id} value={dep._id}>
//                       {dep.dep_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Employee Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Employee
//                 </label>
//                 <select
//                   name="employeeId"
//                   onChange={handleChange}
//                   className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
//                   required
//                 >
//                   <option value="">Select Employee</option>
//                   {employees.map((emp) => (
//                     <option key={emp._id} value={emp._id}>
//                       {emp.employeeId}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Numeric Inputs */}
//               {[
//                 { name: "basicSalary", label: "Basic Salary" },
//                 { name: "allowances", label: "Allowances" },
//                 { name: "deductions", label: "Deductions" },
//                 { name: "tax", label: "Tax (%)" },
//                 { name: "pf", label: "Provident Fund (PF) (%)" },
//                 { name: "bonus", label: "Bonus / Increment" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {field.label}
//                   </label>
//                   <input
//                     type="number"
//                     name={field.name}
//                     onChange={handleChange}
//                     className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
//                     required
//                   />
//                 </div>
//               ))}

//               {/* Payment Mode */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Payment Mode
//                 </label>
//                 <select
//                   name="paymentMode"
//                   onChange={handleChange}
//                   className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
//                   required
//                 >
//                   <option value="">Select Payment Mode</option>
//                   <option value="Bank Transfer">Bank Transfer</option>
//                   <option value="Cash">Cash</option>
//                   <option value="UPI">UPI</option>
//                 </select>
//               </div>

//               {/* Bank Details */}
//               {salary.paymentMode === "Bank Transfer" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Bank Account Details
//                   </label>
//                   <input
//                     type="text"
//                     name="bankDetails"
//                     onChange={handleChange}
//                     className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
//                     required
//                   />
//                 </div>
//               )}

//               {/* Pay Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Pay Date
//                 </label>
//                 <input
//                   type="date"
//                   name="payDate"
//                   onChange={handleChange}
//                   className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
//                   required
//                 />
//               </div>

//               {/* Net Salary Display */}
//               <div className="col-span-2 text-lg font-semibold text-green-600 bg-gray-100 p-3 rounded-lg text-center">
//                 Net Salary: ₹ {calculateNetSalary().toFixed(2)}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all"
//             >
//               Add Salary
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </>
//   );
// };

// export default Add;













import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    tax: "",
    pf: "",
    bonus: "",
    paymentMode: "",
    bankDetails: "",
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments);
      } catch (error) {
        console.error("❌ Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const departmentId = e.target.value;
    try {
      const emps = await getEmployees(departmentId);
      setEmployees(emps);
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Calculate Net Salary
  const calculateNetSalary = () => {
    const { basicSalary, allowances, deductions, tax, pf, bonus } = salary;

    const basic = parseFloat(basicSalary) || 0;
    const allow = parseFloat(allowances) || 0;
    const deduct = parseFloat(deductions) || 0;
    const taxAmount = ((parseFloat(tax) || 0) / 100) * basic;
    const pfAmount = ((parseFloat(pf) || 0) / 100) * basic;
    const bonusAmount = parseFloat(bonus) || 0;

    return basic + allow + bonusAmount - deduct - taxAmount - pfAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const netSalary = calculateNetSalary();

    // ✅ Form Validations
    if (salary.basicSalary <= 0) return alert("Basic Salary must be greater than zero.");
    if (salary.bonus > salary.basicSalary * 0.5) return alert("Bonus cannot exceed 50% of Basic Salary.");
    if (salary.paymentMode === "Bank Transfer" && !salary.bankDetails) return alert("Bank details required for Bank Transfer.");

    const salaryData = {
      ...salary,
      netSalary,
      bankDetails: salary.paymentMode === "Bank Transfer" ? salary.bankDetails : "N/A",
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/salary/add`, salaryData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) navigate("/admin-dashboard/employees");
    } catch (error) {
      console.error("❌ Error adding salary:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to add salary.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-10 text-xl font-semibold">Loading...</div>
      ) : (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Salary</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Department Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))}
                </select>
              </div>

              {/* Employee Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee</label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                  ))}
                </select>
              </div>

              {/* Numeric Inputs */}
              {[
                { name: "basicSalary", label: "Basic Salary" },
                { name: "allowances", label: "Allowances" },
                { name: "deductions", label: "Deductions" },
                { name: "tax", label: "Tax (%)" },
                { name: "pf", label: "Provident Fund (PF) (%)" },
                { name: "bonus", label: "Bonus / Increment" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type="number"
                    name={name}
                    onChange={handleChange}
                    className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                    required
                  />
                </div>
              ))}

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                <select
                  name="paymentMode"
                  onChange={handleChange}
                  className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                  required
                >
                  <option value="">Select Payment Mode</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              {/* Bank Details (Conditional) */}
              {salary.paymentMode === "Bank Transfer" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Account Details</label>
                  <input
                    type="text"
                    name="bankDetails"
                    onChange={handleChange}
                    className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                    required
                  />
                </div>
              )}

              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="form-input w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                  required
                />
              </div>

              {/* Net Salary Display */}
              <div className="col-span-2 text-lg font-semibold text-green-600 bg-gray-100 p-3 rounded-lg text-center">
                Net Salary: ₹ {calculateNetSalary().toFixed(2)}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
            >
              Add Salary
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Add;











// New Features to Implement in the Frontend
// ✅ Net Salary Calculation (Basic + Allowances - Deductions - Taxes)
// ✅ Tax & Provident Fund (PF) Deductions
// ✅ Salary Payment Status & History
// ✅ Payment Mode & Bank Details
// ✅ Salary Slips (PDF Generation & Download) (Improve existing)
// ✅ Email Notifications on Salary Payment (Trigger frontend request to send an email)
// ✅ Salary Increment & Bonus System
// ✅ Advanced Filters & Search
// ✅ Role-Based Salary Access

// Plan for Implementation
// 1️⃣ Modify Salary Add Page (salary/add.js)

// Add Tax & PF Deductions fields
// Add Payment Mode & Bank Details
// Automatically calculate Net Salary before submitting
// Option to add bonuses or increments
// 2️⃣ Enhance Salary View Page (salary/view.jsx)

// Show Payment Status (Paid / Pending)
// Filter by date range, department, payment status
// Improve Payslip Download (Add tax, PF, and payment details)
// 3️⃣ Ensure Role-Based Access

// Admins: Full access to all salary details
// Employees: Can view their own salary history
// 4️⃣ Trigger Email Notification on Salary Payment

// Add a button to send an email notification when salary is paid
