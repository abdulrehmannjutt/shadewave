import React from 'react';

const ShopCategorySidebar = ({ onClose }) => (
  <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-50">
    <button
      onClick={onClose}
      className="text-white p-2 absolute top-4 right-4"
    >
      Close
    </button>
    {/* Sidebar content here */}
  </div>
);

export default ShopCategorySidebar;
