import { useNavigate } from "react-router-dom"


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "120px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "170px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
]





// Leave Action Buttons
export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <div className="flex space-x-2">
      <button
        className="px-4 py-1 bg-blue-500 rounded text-white hover:bg-blue-600 transition duration-300"
        onClick={() => handleView(id)}
      >
        View
      </button>
    </div>
  );
};