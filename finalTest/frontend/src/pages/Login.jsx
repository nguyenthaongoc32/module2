import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      const { token, user } = res.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // ✅ thêm các key Header cần
      localStorage.setItem("userName", user.name || user.username || user.email);
      localStorage.setItem("userAvatar", user.avatar || "/default-avatar.png");
      window.dispatchEvent(new Event("storage"));
  
      toast.success("Login successful!");
  
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed!";
      toast.error(msg);
    }
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen" responsive={Responsive}>
      {/* Left: Background */}
      <div className="hidden md:flex items-center justify-center">
        <img src="/bg.png" alt="Background" className="w-[90%] object-cover" />
      </div>

      {/* Right: Login form */}
      <div className="flex items-center justify-center bg-white p-6">
        <form
          className="w-full max-w-sm bg-blue-600 bg-opacity-10 p-6 rounded-lg shadow-lg flex flex-col gap-4"
          onSubmit={handleLogin}
        >
          <div className="text-blue-500 text-4xl text-center mb-2">Login</div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5"
          >
            Log In
          </button>

          <div className="text-center text-sm text-gray-700 mt-2">
            <span>Don't have an account?</span>{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-red-600">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
