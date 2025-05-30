import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const addSalary = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { employeeId, basicSalary, allowances = 0, deductions = 0, payDate } = req.body;

    // Fetch Employee Details `userId`
    const employee = await Employee.findById(employeeId).populate("userId", "name"); 

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    console.log("✅ Employee Found:", employee); // 🔍 Debugging

    // ✅ Ensure Employee Name is Correct
    const employeeName = employee.userId?.name || "Unknown"; 

    console.log("✅ Employee Name:", employeeName); 

    // Calculate Net Salary
    const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    // Create Salary Record
    const newSalary = new Salary({
      employeeId,
      employeeName, 
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
      status: "Pending", 
    });

    await newSalary.save();

    return res.status(200).json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error(" Error adding salary:", error);
    return res.status(500).json({ success: false, message: "Server error while adding salary" });
  }
};

const getSalary = async (req, res) => {
  try {
    const {id, role} = req.params;
    let salary
    if(role === 'admin') {

      salary =await Salary.find({employeeId: id}). populate('employeeId', 'employeeId')
    } else{
      const employee = await Employee.findOne({userId: id})
      salary = await Salary.find({employeeId: employee._id}). populate('employeeId', 'employeeId')
    }
    return res.status(200).json({success: true, salary})

  } catch (error) {

    return res.status(500).json({success: false, message: "Salary get Server error "})
  }
}


// const getSalary = async (req, res) => {
//   try {
//     const { id, role } = req.params;
//     let salary;

//     if (role === "admin" || role === "hr") {
//       // Fetch all salaries for that employee
//       salary = await Salary.find({ employeeId: id }).populate("employeeId");
//     } else {
//       // For employees - show only their salary records
//       salary = await Salary.find({ employeeId: id }).populate("employeeId");
//     }

//     res.status(200).json({ success: true, salary });
//   } catch (error) {
//     console.error("Error fetching salary:", error.message);
//     res.status(500).json({ success: false, message: "Error fetching salary" });
//   }
// };


const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().populate({
      path: "employeeId",
      populate: { path: "userId", select: "name" }, 
    }).lean();

    console.log("✅ All Salaries Fetched:", salaries);
    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error(" Error fetching salaries:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching salaries" });
  }
};

const deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;
    await Salary.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Salary record deleted successfully" });
  } catch (error) {
    console.error(" Error deleting salary:", error);
    return res.status(500).json({ success: false, message: "Server error while deleting salary record" });
  }
};

// const markSalaryAsPaid = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { paymentMethod, paypalOrderID } = req.body; 

//     const salary = await Salary.findById(id);
//     if (!salary) {
//       return res.status(404).json({ success: false, message: "Salary record not found" });
//     }

//     // Update salary status & payment method
//     salary.status = "Paid";
//     salary.paymentMethod = paymentMethod;

//     await salary.save();

//     return res.status(200).json({ success: true, message: "Salary marked as Paid" });
//   } catch (error) {
//     console.error(" Error marking salary as paid:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const updateSalaryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const salary = await Salary.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    if (!salary) {
      return res.status(404).json({ success: false, message: "Salary not found" });
    }
    res.status(200).json({ success: true, message: "Status updated successfully", salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export { addSalary, getSalary, deleteSalary, getAllSalaries, updateSalaryStatus };
