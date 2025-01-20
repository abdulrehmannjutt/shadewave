import React, { useState } from "react";
import ShopCategorySidebar from "./sideBar";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Toggle the sidebar's visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <nav className="w-full fixed z-[1] border-b bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-1 mb-2 md:mb-0 bg-mainColor">
            <div
              className="flex gap-2 font-semibold px-3 py-2 cursor-pointer"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFFFFF"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <p className="text-[18px] text-white">Categories</p>
            </div>
          </div>

          {/* Toggle Button for Mobile */}
          <button
            className="md:hidden block text-sm font-medium px-3 py-2 absolute right-5"
            onClick={toggleNav}
          >
            ☰
          </button>

          {/* Center Section (Links) */}
          <div
            // className="md:flex hidden justify-center space-x-4 text-center mb-2 md:mb-0"
            className={`${
              isNavOpen
                ? "flex flex-col py-1 absolute right-0 top-[45px] w-[100px] rounded border-white border items-center"
                : "hidden"
            }
  md:flex md:flex-row justify-center md:items-center space-y-2 md:space-y-0 text-center mb-2 md:mb-0 bg-mainColor md:bg-inherit`}
          >
            <Link
              to="/"
              //className="text-sm font-medium hover:bg-mainColor px-3 py-2"
              className={`text-blackCustom font-semibold text-[14px] px-3 py-2 ${
                isActive("/") ? "text-mainColor" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              //className="text-sm font-medium hover:bg-mainColor px-3 py-2"
              className={`text-blackCustom font-semibold text-[14px] px-3 py-2 ${
                isActive("/products")
                  ? "bg-white rounded-[4px] text-mainColor"
                  : ""
              }`}
            >
              Products
            </Link>
            <Link
              to="/contact"
              //className="text-sm font-medium hover:bg-mainColor px-3 py-2"
              className={`text-blackCustom font-semibold text-[14px] px-3 py-2 ${
                isActive("/contact")
                  ? "bg-white rounded-[4px] text-mainColor"
                  : ""
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Section */}
          <div className="md:flex hidden justify-center md:justify-end space-x-4">
            <Link
              to="/about"
              //className="text-sm font-medium hover:bg-mainColor px-3 py-2"
              className={`text-blackCustom font-semibold text-[14px] px-3 py-2 ${
                isActive("/about")
                  ? "bg-white rounded-[4px] text-mainColor"
                  : ""
              }`}
            >
              About Us
            </Link>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed top-auto left-0 h-full w-[250px] bg-white shadow-lg z-50">
          <ShopCategorySidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar component, shown conditionally
        {isSidebarOpen && (
          <div className="fixed top-auto left-0 h-full w-[250px] bg-white shadow-lg z-50">
            <ShopCategorySidebar onClose={toggleSidebar} />
          </div>
        )} */}
    </nav>
  );
};

export default NavigationBar;
