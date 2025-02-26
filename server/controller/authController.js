import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';





// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_KEY, { expiresIn: '10d' });

    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      user: { _id: newUser._id, name: newUser.name, role: newUser.role },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error); 
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
};





// Login Function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });

  } catch (error) {
    console.error("❌ Login Error:", error); 
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
};





// Verify Token Middleware
const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify, registerAdmin };
