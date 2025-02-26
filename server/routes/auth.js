import express from 'express';
import { login, verify, registerAdmin } from '../controller/authController.js';
import authmiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login)
router.get('/verify', authmiddleware, verify)
router.post('/register-admin', registerAdmin);

export default router;