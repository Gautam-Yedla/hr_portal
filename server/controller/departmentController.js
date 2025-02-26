import Department from "../models/Department.js";
import mongoose from "mongoose";


const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: "add department server error" });
    }
} 

const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;

        const newDep = new Department({
            dep_name,
            description
        });

        if (!newDep) {
          console.error("Department model not initialized correctly!");
          return res.status(500).json({ success: false, error: "Database error" });
        }


        await newDep.save();
        return res.status(200).json({success: true, department: newDep});

    } catch (error) {
        console.error("Database Save Error:", error); 
        console.error("Error in addDepartment:", error); 
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

const getDepartment = async (req, res) => {
    try {
        const {id } = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "add department server error" });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updateDep = await Department.findByIdAndUpdate({_id: id},{ 
            dep_name,
            description
        }) 
        return res.status(200).json({ success: true, updateDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "edit department server error" });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedep = await Department.findById({_id: id}) 
        await deletedep.deleteOne();
        return res.status(200).json({ success: true, deletedep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "delete department server error" });
    }
}



// const deleteDepartment = async (req, res) => {
//     try {
//         const { id } = req.params;

//         console.log("Received delete request for department ID:", id);

//         // Validate Object ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ success: false, error: "Invalid department ID" });
//         }

//         // Check if the department exists
//         const department = await Department.findById(id);
//         if (!department) {
//             return res.status(404).json({ success: false, error: "Department not found" });
//         }

//         // Delete the department
//         await Department.deleteOne({ _id: id });

//         return res.status(200).json({ success: true, message: "Department deleted successfully" });

//     } catch (error) {
//         console.error("Error deleting department:", error);
//         return res.status(500).json({ success: false, error: "Server error while deleting department" });
//     }
// };





export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}