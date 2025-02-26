// import express from 'express';
// import authMiddleware from '../middleware/authMiddleware.js';
// import { changePassword } from '../controller/settingController.js';

// const router = express.Router();

// router.put('/change-password', authMiddleware, changePassword)
// export default router












import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProfile, changePassword, updateProfile, updateNotifications, manageAccount } from '../controller/settingController.js';

const router = express.Router();

router.get('/get-profile', authMiddleware, getProfile);
router.put('/change-password', authMiddleware, changePassword);
router.put('/update-profile', authMiddleware, (req, res, next) => {
  console.log("🚀 PUT /update-profile hit!");
  next();
}, updateProfile);
router.put('/update-notifications', authMiddleware, updateNotifications);
router.put('/manage-account', authMiddleware, manageAccount);

export default router;

