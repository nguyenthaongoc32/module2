import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Responsive } from "../component/Reponsive.js";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem("userAvatar"));
  const navigate = useNavigate();
  const dropdownRef = useRef();


  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem("userName"));
      setUserAvatar(localStorage.getItem("userAvatar"));
    };


    window.addEventListener("storage", handleStorageChange);


    const observer = new MutationObserver(handleStorageChange);
    observer.observe(document, { subtree: true, childList: true });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    setUserName(null);
    setUserAvatar(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-200 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700" responsive={Responsive}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
    
          <a href="/" className="flex items-center space-x-3">
            <img src="/logo.png" className="h-16 w-auto" alt="Logo" />
            <span className="text-2xl font-semibold dark:text-white">DriveNow</span>
          </a>

   
          <div className="hidden md:flex space-x-20">
            <a href="/" className="text-blue-700 font-medium hover:underline">Home</a>
            <a href="#" className="text-gray-900 dark:text-white hover:text-blue-600">About</a>
            <a href="#" className="text-gray-900 dark:text-white hover:text-blue-600">Services</a>
          </div>


          <div className="flex items-center space-x-10">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-52 px-6 py-1.5 pl-9 text-sm border border-gray-500 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <div className="absolute left-2 top-2.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>

       
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="text-2xl text-gray-700 dark:text-white"
                  />
                )}
                {userName && (
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {userName}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 dark:bg-gray-700"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      {userName ? (
                        <>
                          <li>
                            <Link
                              to="/account"
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-blue-400"
                            >
                              My Profile
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:text-red-400"
                            >
                              <FontAwesomeIcon icon={faRightFromBracket} />
                              Logout
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              to="/login"
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 text-center"
                            >
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/register"
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-green-600 dark:text-green-400 text-center"
                            >
                              Register
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
