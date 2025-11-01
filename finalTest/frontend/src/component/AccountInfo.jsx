import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const AccountInfo = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const backendUrl = "http://localhost:8080";

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/getUser`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.ok) setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        `${backendUrl}/api/auth/updateUser/${user._id}`,
        user,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile!");
      console.error(error);
    }
  };

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    try {
      await axios.put(
        `${backendUrl}/api/auth/changePassword/${user._id}`,
        passwordData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Error changing password!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 min-h-[600px]" responsive={Responsive}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#E50914] pb-2">
        Account Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]"
          />
        </div>
      </div>

      <button
        onClick={handleUpdateProfile}
        className="mt-5 px-6 py-2 bg-[#E50914] hover:bg-red-700 text-white font-semibold rounded-md transition"
      >
        Save
      </button>

      <div className="mt-10 border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, oldPassword: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            className="p-2 border border-gray-300 rounded-md focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]"
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="mt-5 px-6 py-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-md transition"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
