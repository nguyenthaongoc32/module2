import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileNav from "./ProfileNav";

const AccountInfo = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const backendUrl = "http://localhost:8080";

  const getUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/getUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.ok) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/auth/updateUser/${user._id}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile updated successfully!");
      setUser(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile!");
    }
  };

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/auth/changePassword/${user._id}`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.error || "Error changing password!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-5">
    <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
      {/* LEFT */}
      <div className="w-full md:w-1/3 bg-[#E50914] text-white p-6 flex flex-col justify-between">
        <ProfileNav />
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-2/3 p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-[#E50914] pb-2">
          CUSTOMER INFO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">First Name</label>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Last Name</label>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#E50914]"
            />
          </div>

        </div>

        <button
          onClick={handleUpdateProfile}
          className="mt-5 px-6 py-2 bg-[#E50914] hover:bg-red-700 text-white font-semibold rounded-md transition"
        >
          SAVE
        </button>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, oldPassword: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md focus:border-[#E50914]"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md focus:border-[#E50914]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md focus:border-[#E50914]"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="mt-5 px-6 py-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-md transition"
          >
            CHANGE PASSWORD
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default AccountInfo;
