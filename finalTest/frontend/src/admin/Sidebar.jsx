import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaCar,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openUsers, setOpenUsers] = useState(true);
  const [openCars, setOpenCars] = useState(true);

  const MenuItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md flex items-center gap-2 ${
        location.pathname === to
          ? "bg-gray-700 text-blue-400"
          : "hover:bg-gray-800"
      }`}
    >
      <Icon /> {label}
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col" responsive={Responsive}>
      {/* Header */}
      <div className="text-center py-4 border-b border-gray-700 text-xl font-bold">
        Admin Dashboard
      </div>

      {/* Scrollable menu */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* USERS MANAGEMENT */}
        <div className="mt-4">
          <button
            onClick={() => setOpenUsers(!openUsers)}
            className="w-full flex justify-between items-center px-4 py-2 text-left font-semibold text-gray-300 hover:text-white"
          >
            <span>Users Management</span>
            {openUsers ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openUsers && (
            <div className="flex flex-col gap-1 mt-1 pl-4">
              <MenuItem
                to="/admin/bookings"
                icon={FaClipboardList}
                label="List Bookings"
              />
              <MenuItem to="/admin/users" icon={FaUsers} label="List Users" />
            </div>
          )}
        </div>

        {/* CARS MANAGEMENT */}
        <div className="mt-4">
          <button
            onClick={() => setOpenCars(!openCars)}
            className="w-full flex justify-between items-center px-4 py-2 text-left font-semibold text-gray-300 hover:text-white"
          >
            <span>Cars Management</span>
            {openCars ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openCars && (
            <div className="flex flex-col gap-1 mt-1 pl-4">
              <MenuItem to="/admin/cars" icon={FaCar} label="List Cars" />
              <MenuItem to="/admin/cars/add" icon={FaCar} label="Add New Car" />
            </div>
          )}
        </div>
      </div>

      {/* Logout fixed at bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold transition text-white"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
