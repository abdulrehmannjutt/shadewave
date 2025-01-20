import React, { useState } from "react";

// HomeCards component to display each product in the dropdown
function HomeCards({ productId, img, imgDimensions, title, price }) {
  return (
    <div className="flex justify-between gap-2 items-center py-1">
      <div className="flex gap-2 items-center">
        <img
          className="h-[48px] w-[48px] rounded"
          src={img}
          alt={title}
          style={imgDimensions}
        />
        {title}
      </div>
      <div className="items-center">
        <span>Rs: {price.toFixed(2)}</span>
      </div>
    </div>
  );
}

const HeaderSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sample products data
  const products = [
    {
      productId: 1,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Laptop",
      price: 1200.99,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Smartphone",
      price: 799.49,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Ardino",
      price: 799.49,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Drones",
      price: 799.49,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Semiconductor",
      price: 799.49,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Sensores",
      price: 799.49,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Cables",
      price: 799.49,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Meters",
      price: 799.49,
    },
    {
      productId: 2,
      img: "https://via.placeholder.com/150",
      imgDimensions: { width: "50px", height: "50px" },
      title: "Camera & Lights",
      price: 799.49,
    },
    // Add more products here
  ];

  // Handle the search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      setFilteredItems(results);
      setDropdownOpen(true);
    } else {
      setFilteredItems([]);
      setDropdownOpen(false);
    }
  };

  // Handle dropdown toggle
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex relative items-center space-x-2 border-[1px] rounded-full px-2 h-[46px] 1160:w-[36rem] 950:w-[24rem] w-[18rem] mx-auto md:mx-0 shadow">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products"
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex-grow px-4 py-1 text-gray-700 rounded-l-full border-none outline-none focus:outline-none focus:ring-0"
      />

      {/* Custom Dropdown Toggle Button (Hidden on mobile, visible on larger screens) */}
      <div className="relative text-left hidden md:block">
        {/* <button
          type="button"
          onClick={handleDropdownToggle}
          className="inline-flex justify-between rounded-md border-0 shadow-sm px-4 py-2 bg-white text-gray-500"
        >
          Select Option
          <svg
            className="-mr-1 ml-2 h-7 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="blue-500"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.3l3.71-3.09a.75.75 0 111.04 1.08l-4 3.33a.75.75 0 01-1.04 0l-4-3.33a.75.75 0 010-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute hidden right-0 z-50 w-52 max-h-[300px] overflow-y-auto rounded-md shadow-lg bg-light-brown ring-1 ring-black ring-opacity-5 custom-scrollbar overflow-hidden">
            <div className="py-1" role="none">
              {filteredItems.length > 0 ? (
                filteredItems.map((product) => (
                  <button
                    key={product.productId}
                    className="block w-full text-left px-4 py-2 bg-white text-mainColor hover:bg-blue-200"
                  >
                    <HomeCards
                      productId={product.productId}
                      img={product.img}
                      imgDimensions={product.imgDimensions}
                      title={product.title}
                      price={product.price}
                    />
                  </button>
                ))
              ) : (
                <div className="text-center py-2">No items found</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search Icon */}
      <button className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="gray"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
          />
        </svg>
      </button>

      {/* Filtered Items Dropdown */}
      {dropdownOpen && searchQuery && (
        <div className="absolute max-h-[334px] z-50 w-full overflow-y-scroll top-10 right-0 ml-0 rounded bg-white hover:border-mainColor hover:border border border-transparent">
          <ul className="px-2 mb-0">
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <li
                  key={product.productId}
                  className="py-1 border-b border-mainColor"
                >
                  <a href="/products">
                    <HomeCards
                      productId={product.productId}
                      img={product.img}
                      imgDimensions={product.imgDimensions}
                      title={product.title}
                      price={product.price}
                    />
                  </a>
                </li>
              ))
            ) : (
              <li className="text-center py-1">No items found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
