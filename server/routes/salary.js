import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addSalary, getSalary, deleteSalary, getAllSalaries, updateSalaryStatus  } from "../controller/salaryController.js";

const router = express.Router();


router.get("/", authMiddleware, getAllSalaries); 
router.post("/add", authMiddleware, addSalary);
router.get("/:id/:role", authMiddleware, getSalary);
router.delete("/:id", authMiddleware, deleteSalary); 
// router.put("/mark-paid/:id", authMiddleware, markSalaryAsPaid); 
router.put("/mark-paid/:id", authMiddleware, updateSalaryStatus); 

export default router;
