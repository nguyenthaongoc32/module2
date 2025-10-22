import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../model/Auth.js";


export const register = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body; // sửa fistName -> firstName
      if (!email || !password || !phone) {
        return res.status(401).json("Require email, password, phone");
      }
  
      const existAuth = await AuthModel.findOne({ email });
      if (existAuth) return res.status(400).json("Email already exists.");
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      const newAuth = await AuthModel.create({
        firstName,  
        lastName,
        email,
        password: hash,
        phone,
      });
  
      res.status(201).send({
        message: "Register successfully!",
        user: {
          id: newAuth._id,
          email: newAuth.email,
          name: `${newAuth.firstName} ${newAuth.lastName}`, 
        },
        success: true,
      });
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  };
  

  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const account = await AuthModel.findOne({ email });
      if (!account) {
        return res.status(404).json({ message: "Invalid Email or Password!", success: false });
      }
  
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password!", success: false });
      }
  
      const token = jwt.sign(
        { userId: account._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Login successfully!",
        success: true,
        token,
        user: {
          _id: account._id,
          email: account.email,
          name: `${account.firstName} ${account.lastName}`,
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
  