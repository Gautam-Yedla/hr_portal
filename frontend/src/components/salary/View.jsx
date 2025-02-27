import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { jsPDF } from "jspdf";  

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    startDate: '',
    endDate: '',
  });

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`https://hr-sample-backend.onrender.com/api/salary/${id}/${user.role}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching salary data");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  useEffect(() => {
    if (!salaries) return;
  
    let filtered = salaries.filter(salary => {
      const employeeName = salary.employeeId?.name?.toLowerCase() || "";
      const salaryStatus = salary.paymentStatus ? salary.paymentStatus.toLowerCase() : "pending"; 
  
      return (
        employeeName.includes(filters.search.toLowerCase()) &&
        (filters.status === 'all' || salaryStatus === filters.status.toLowerCase()) &&
        (!filters.startDate || new Date(salary.payDate) >= new Date(filters.startDate)) &&
        (!filters.endDate || new Date(salary.payDate) <= new Date(filters.endDate))
      );
    });
  
    console.log("Filtered Salaries:", filtered); 
    setFilteredSalaries(filtered);
  }, [filters, salaries]);
  
  

  


  const markAsPaid = async (salaryId) => {
    try {
      const response = await axios.put(`https://hr-sample-backend.onrender.com/api/salary/mark-paid/${salaryId}`, {}, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        alert("Salary marked as paid & email sent successfully!");
        fetchSalaries();  
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error marking salary as paid");
    }
  };


  const downloadPayslip = (salary) => {
    if (!salary || !salary.employeeId) {
      alert("Error: Employee details not found!");
      return;
    }
  
    const employeeId = salary.employeeId._id || "Unknown";
    const status = salary.paymentStatus ? salary.paymentStatus.toLowerCase() : "pending";
    const fileName = `${employeeId}_${status}_payslip.pdf`;
  
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payslip", 20, 20);
    doc.setFontSize(12);
  
    doc.text(`Employee ID: ${employeeId}`, 20, 30);
    doc.text(`Employee Name: ${salary.employeeId.name || "N/A"}`, 20, 40);
    doc.text(`Salary: ${salary.basicSalary || "N/A"}`, 20, 50);
    doc.text(`Allowance: ${salary.allowances || "N/A"}`, 20, 60);
    doc.text(`Deductions: ${salary.deductions || "N/A"}`, 20, 70);
    doc.text(`Total Salary: ${salary.netSalary || "N/A"}`, 20, 80);
    doc.text(`Payment Status: ${status.toUpperCase()}`, 20, 90);
    doc.text(`Pay Date: ${salary.payDate ? new Date(salary.payDate).toLocaleDateString() : "N/A"}`, 20, 100);
  
    doc.save(fileName);
  };
  
  

  return (
    <div className='p-5'>
      <div className='text-center mb-6'>
        <h2 className='text-3xl font-bold text-gray-800'>Salary History</h2>
      </div>

      <div className='flex flex-wrap justify-between items-center mb-5 space-y-2'>
        {/* <input
          type='text'
          placeholder='Search Employee Name'
          className='border px-3 py-2 rounded-md bg-white shadow-md text-sm'
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        /> */}

        <select
          className='border px-3 py-2 rounded-md bg-white shadow-md text-sm'
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <input
          type="date"
          className="border px-3 py-2 rounded-md bg-white shadow-md text-sm"
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />

        <input
          type="date"
          className="border px-3 py-2 rounded-md bg-white shadow-md text-sm"
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>

      {/* TABLE */}
      {filteredSalaries ? (
        filteredSalaries.length > 0 ? (
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gradient-to-r from-teal-400 to-blue-500'>
              <tr>
                <th className='px-6 py-3'>SNO</th>
                <th className='px-6 py-3'>Emp Id</th>
                <th className='px-6 py-3'>Basic Salary</th>
                <th className='px-6 py-3'>Allowance</th>
                <th className='px-6 py-3'>Deductions</th>
                <th className='px-6 py-3'>Total</th>
                <th className='px-6 py-3'>Pay Date</th>
                <th className='px-6 py-3'>Status</th>
                <th className='px-6 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary, index) => (
                <tr key={salary._id} className='bg-white border-b hover:bg-teal-100'>
                  <td className='px-6 py-3'>{index + 1}</td>
                  <td className='px-6 py-3'>{salary.employeeId.name || salary.employeeId._id}</td>
                  <td className='px-6 py-3'>{salary.basicSalary}</td>
                  <td className='px-6 py-3'>{salary.allowances}</td>
                  <td className='px-6 py-3'>{salary.deductions}</td>
                  <td className='px-6 py-3'>{salary.netSalary}</td>
                  <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                  <td className={`px-6 py-3 font-semibold ${salary.paymentStatus === 'paid' ?    'text-green-500' : 'text-red-500'}`}>
                    {salary.paymentStatus ? salary.paymentStatus.toUpperCase() : "Pending"}
                  </td>

                  <td className='px-6 py-3 space-x-2'>
                    <button onClick={() => downloadPayslip(salary)} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                      Payslip
                    </button>
                    {salary.paymentStatus === 'pending' && (
                      <button onClick={() => markAsPaid(salary._id)} className="px-3 py-1 bg-green-500 text-white rounded-md">
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='text-center text-lg text-gray-500 mt-6'>No Records Found</div>
        )
      ) : (
        <div className='text-center text-lg font-semibold'>Loading...</div>
      )}
    </div>
  );
};

export default View;

