import React, { useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ProfileNav from "../component/ProfileNav";
import AccountInfo from "../component/AccountInfo";
import MyBookingCar from "../pages/MyBookingCar";
import { motion, AnimatePresence } from "framer-motion";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("accountInfo");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 max-w-7xl mx-auto mt-8 mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#E50914] text-white p-6">
          <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Nội dung chính */}
        <div className="w-3/4 p-8">
          <AnimatePresence mode="wait">
            {activeTab === "accountInfo" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <AccountInfo />
              </motion.div>
            )}

            {activeTab === "myBookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <MyBookingCar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyProfile;
