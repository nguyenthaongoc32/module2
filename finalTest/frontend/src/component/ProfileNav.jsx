import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TiClipboard } from "react-icons/ti";

const ProfileNav = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="flex flex-col w-full gap-2">
      <button
        onClick={() => setActiveTab("accountInfo")}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-left ${
          activeTab === "accountInfo"
            ? "bg-white text-[#E50914] font-bold"
            : "hover:bg-white/10"
        }`}
      >
        <MdAccountCircle />
        Account Info
      </button>

      <button
        onClick={() => setActiveTab("myBookings")}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-left ${
          activeTab === "myBookings"
            ? "bg-white text-[#E50914] font-bold"
            : "hover:bg-white/10"
        }`}
      >
        <FaCarSide />
        My Booking Cars
      </button>

      <button
        disabled
        className="flex items-center gap-2 px-3 py-2 rounded-md text-left opacity-60 cursor-not-allowed"
      >
        <IoShieldCheckmarkSharp />
        Privacy Policy
      </button>

      <button
        disabled
        className="flex items-center gap-2 px-3 py-2 rounded-md text-left opacity-60 cursor-not-allowed"
      >
        <TiClipboard />
        Terms & Conditions
      </button>
    </nav>
  );
};

export default ProfileNav;
