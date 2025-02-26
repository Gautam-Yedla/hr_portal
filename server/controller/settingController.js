// import User from "../models/User.js";
// import bcrypt from 'bcrypt'

// const changePassword = async (req, res) => {
//     try {
//       const {userId, oldPassword, newPassword} = req.body;

//       const user = await User.findById({_id: userId});
//       if(!user) {
//         return res.status(404).json({ success: false, error: "User not found" });
//       }
//       const isMatch =await bcrypt.compare(oldPassword, user.password);
//       if(!isMatch) {
//         return res.status(404).json({ success: false, error: "Incorrect Old Password" });
//       }

//       const hashPassword = await bcrypt.hash(newPassword, 10)

//       const newUser = await User.findByIdAndUpdate({_id: userId}, {password: hashPassword});

//       return res.status(200).json({success: true })


//     } catch (error) {
//       return res.status(500).json({success: false, error: "setting error"})
//     }
// }

// export {changePassword} 
















import User from "../models/User.js";
import bcrypt from 'bcrypt';

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching profile" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Incorrect Old Password" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

const updateProfile = async (req, res) => {
  try {
      console.log("🔹 Received Data:", req.body);

      const { userId, name, phone } = req.body;
      let profileImage = req.body.profileImage; // Keep existing image if no new upload

      if (!userId) {
          return res.status(400).json({ success: false, error: "User ID is required" });
      }

      // If user uploaded a new image, save it
      if (req.files?.profilePicture) {
          const file = req.files.profilePicture;
          const uploadPath = `public/uploads/${file.name}`;
          await file.mv(uploadPath);
          profileImage = `/uploads/${file.name}`;
      }

      const user = await User.findByIdAndUpdate(userId, { name, phone, profileImage }, { new: true });

      if (!user) {
          return res.status(404).json({ success: false, error: "User not found" });
      }

      return res.status(200).json({ success: true, user });
  } catch (error) {
      console.error("❌ Profile Update Error:", error);
      return res.status(500).json({ success: false, error: "Profile update failed" });
  }
};



const updateNotifications = async (req, res) => {
    try {
        const { userId, notifications } = req.body;
        const user = await User.findByIdAndUpdate(userId, { notifications }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Notification update failed" });
    }
};

const manageAccount = async (req, res) => {
    try {
        const { userId, action } = req.body;
        if (action === 'deactivate') {
            await User.findByIdAndUpdate(userId, { isActive: false });
        } else if (action === 'delete') {
            await User.findByIdAndDelete(userId);
        }
        return res.status(200).json({ success: true, message: "Account updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Account management failed" });
    }
};

export { getProfile, changePassword, updateProfile, updateNotifications, manageAccount };

