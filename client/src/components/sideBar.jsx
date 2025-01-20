import { useState } from "react";
import { useSelector } from "react-redux";

const ShopCategorySidebar = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState("");

  const categories = useSelector((state) => state.cart.categories);
  console.log("categories", categories);

  return (
    <div className="w-64 h-5/6 bg-white border border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-mainColor text-white">
        <h2 className="font-bold text-sm">SHOP BY CATEGORY</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Category List */}
      <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
        {categories.map((category) => (
          <div key={category._id} className="border-b border">
            <div
              className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer font-bold"
              onClick={() => {
                if (category.subCategories?.length) {
                  setExpandedCategory(
                    expandedCategory === category._id ? "" : category._id
                  );
                }
              }}
            >
              <span className="text-sm text-gray-700">{category.category}</span>
              {category.subCategories?.length > 0 && (
                <svg
                  className={`w-4 h-4 transition-transform ${
                    expandedCategory === category._id ? "rotate-180" : ""
                  }`}
                  fill="#00205B"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
              {!category.subCategories?.length && (
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="#00205B"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>

            {/* Subcategories */}
            {category.subCategories?.length > 0 &&
              expandedCategory === category._id && (
                <div className="bg-gray-50 pl-6">
                  {category.subCategories.map((subcategory) => (
                    <div
                      key={subcategory}
                      className="p-2 text-sm text-gray-600 hover:bg-blue-100 cursor-pointer"
                    >
                      {subcategory}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategorySidebar;
