// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
// import PrivateRoutes from "./utils/PrivateRoutes";
// import RoleBaseRoutes from "./utils/RoleBaseRoutes";
// import AdminSummary from "./components/dashboard/AdminSummary";
// import DepartmentList from "./components/department/DepartmentList";
// import AddDepartment from "./components/department/AddDepartment";
// import EditDepartment from "./components/department/EditDepartment";
// import List from "./components/employee/List";
// import Add from "./components/employee/Add";
// import View from "./components/employee/View";
// import Edit from "./components/employee/Edit";
// import AddSalary from "./components/salary/Add";
// import ViewSalary from "./components/salary/View";
// import Summary from "./components/EmployeeDashboard/Summary";
// import LeaveList from "./components/leave/List"
// import AddLeave from "./components/leave/Add"
// import Setting from "./components/EmployeeDashboard/Setting";
// import Table from "./components/leave/Table";
// // import Detail from "./components/leave/Detail";
// import SalaryList from "./components/salary/List";
// // import SalaryPayment from "./components/salary/SalaryPayment";

// import LeaveDetails from "./components/leave/LeaveDetails";
// import Register from "./pages/Register";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/register" element={<Register />}></Route>
//         <Route path="/admin-dashboard" element={
//           <PrivateRoutes>
//             <RoleBaseRoutes requiredRole={["admin"]}>
//               <AdminDashboard />
//             </RoleBaseRoutes>
//           </PrivateRoutes>

//         }>
//           <Route index element={<AdminSummary />}></Route>

//           <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
//           <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
//           <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>


//           <Route path="/admin-dashboard/employees" element={<List />}></Route>
//           <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
//           <Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
//           <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>

//           <Route path="/admin-dashboard/salary" element={<SalaryList />} />
//           <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
//           <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
//           {/* <Route path="/admin-dashboard/salary/pay/:id" element={<SalaryPayment />} /> */}



//           <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
//           {/* <Route path="/admin-dashboard/leaves/:id" element={<Detail />}></Route> */}
//           <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetails />} />

//           <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>

//           <Route path="/admin-dashboard/setting" element={<Setting />}></Route>


//         </Route>
//         <Route 
//           path="/employee-dashboard" 
//           element={
//             <PrivateRoutes>
//               <RoleBaseRoutes requiredRole={["admin","employee"]}>
//                 <EmployeeDashboard />
//               </RoleBaseRoutes>
//             </PrivateRoutes>
//           }
//         >

//           <Route index element={<Summary />}></Route>

//           <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
//           <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
//           <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
//           <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
//           <Route path="/employee-dashboard/setting" element={<Setting />}></Route>

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App











import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";

import AddSalary from "./components/salary/Add";
import SalaryList from "./components/salary/List"; // ✅ FIXED IMPORT
import ViewSalary from "./components/salary/View";

import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import LeaveDetails from "./components/leave/LeaveDetails";
import Register from "./pages/Register";

import AnnouncementList from "./components/announcements/AnnouncementList";
import AddAnnouncement from "./components/announcements/AddAnnouncement";
import AnnouncementDetails from "./components/announcements/AnnouncementDetails";
import EditAnnouncement from "./components/announcements/EditAnnouncement";

import EmployeeAnnouncements from "./components/announcements/EmployeeAnnouncements"; // ✅ New Import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🌟 Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />

          {/* Department Routes */}
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />

          {/* Employee Routes */}
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />

          {/* Salary Routes */}
          <Route path="salary" element={<SalaryList />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="salary/add" element={<AddSalary />} />

          {/* Leave Management */}
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<LeaveDetails />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />

          {/* Announcements & Notices */}
          <Route path="announcements" element={<AnnouncementList />} />
          <Route path="announcements/add" element={<AddAnnouncement />} />
          <Route path="announcements/:id" element={<AnnouncementDetails />} />
          <Route path="announcements/edit/:id" element={<EditAnnouncement />} />

          {/* Settings */}
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* 🌟 Employee Dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />} />
          <Route path="profile/:id" element={<View />} />
          <Route path="leaves/:id" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="announcements" element={<EmployeeAnnouncements />} /> {/* ✅ New Route */}
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

