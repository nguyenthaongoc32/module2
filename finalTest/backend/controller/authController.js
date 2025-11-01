import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../model/Auth.js";


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const exist = await AuthModel.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exists!" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Nếu email trùng danh sách admin thì role = admin
    const adminEmails = ["admin@gmail.com"]; // bạn có thể thêm nhiều email admin
    const role = adminEmails.includes(email) ? "admin" : "user";

    const newUser = await AuthModel.create({
      firstName,
      lastName,
      email,
      password: hash,
      phone,
      role,
    });

    res.status(201).json({
      message: "Register successfully!",
      user: { id: newUser._id, email, role },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully!",
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role, // ✅ thêm dòng này để frontend nhận diện admin
        avatar: user.avatar || "", // tùy chọn
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};




  
  export const getUser = async (req, res) => {
    try {
      const user = await AuthModel.findById(req.userId).select("-password");
      if (!user) return res.status(404).json({ ok: false, message: "User not found" });
  
      res.status(200).json({ ok: true, message: "User found", data: user });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  };
  
  // UPDATE USER
  export const updateUser = async (req, res) => {
    try {
      const { firstName, lastName, email, phone, city } = req.body;
  
      const updated = await AuthModel.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, email, phone, city },
        { new: true }
      ).select("-password");
  
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // CHANGE PASSWORD
  export const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const user = await AuthModel.findById(req.params.id);
  
      if (!user) return res.status(404).json({ error: "User not found" });
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ error: "Old password is incorrect" });
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  