/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { togglePopUpCart } from "../redux/cart/cartSlice";
import {
  setCheckCategory,
  setCheckSubCategory,
} from "../redux/admin/adminSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [sunglassesDropdown, setSunglassesDropdown] = useState(false);
  const [eyeglassesDropdown, setEyeglassesDropdown] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const checkCategory = useSelector((state) => state.admin.checkCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const userStatus = localStorage.getItem("userData");
  const parsedUserStatus = userStatus ? JSON.parse(userStatus) : null;
  const headerTextClasses =
    "font-medium text-[18px] border-b-2 border-transparent transition-all duration-300 ease-in-out uppercase";
  const activeClasses =
    "text-mainColor hover:border-b-2 hover:border-mainColor";
  const notActiveClasses = "text-white hover:border-b-2 hover:border-white";

  useEffect(() => {
    if (parsedUserStatus?.isAdmin) {
      setAdmin(parsedUserStatus.isAdmin);
    } else {
      setAdmin(false);
    }
  }, [parsedUserStatus]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
    setAdmin(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const SubcategoryMenu = ({ items, type }) => (
    <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-40">
      {items.map((item, index) => (
        <Link
          key={index}
          to="/products"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-mainColor transition-colors duration-200"
          onClick={() => {
            dispatch(setCheckSubCategory(item));
            dispatch(setCheckCategory(type));
          }}
        >
          {item}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className="sticky top-0 right-0 bottom-0 z-10 py-4 md:py-6 px-2 md:px-5 bg-blackCustomBg">
        <nav className="w-full z-20">
          <div className="max-w-screen-2xl flex md:flex-row md:gap-0 gap-[10px] items-center justify-between mx-auto">
            <Link
              to="/"
              className="text-white"
              onClick={() => dispatch(setCheckCategory(""))}
            >
              <div className="flex justify-center items-center gap-1">
                <img
                  src="/images/shadewave.png"
                  className="sm:h-[60px] h-[40px] sm:w-[100px] w-[70px]"
                  alt="Logo"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div
              className={`md:flex hidden justify-center md:items-center space-y-2 md:space-y-0 text-center mb-2 md:mb-0 gap-[32px] py-2`}
            >
              <div
                className="relative group"
                onMouseEnter={() => setSunglassesDropdown(true)}
                onMouseLeave={() => setSunglassesDropdown(false)}
              >
                <Link
                  to="/products"
                  className={`${headerTextClasses} ${
                    checkCategory === "Sunglasses"
                      ? activeClasses
                      : notActiveClasses
                  }`}
                  onClick={() => {
                    dispatch(setCheckCategory("Sunglasses"));
                    dispatch(setCheckSubCategory(""));
                  }}
                >
                  Sunglasses
                </Link>
                {sunglassesDropdown && (
                  <SubcategoryMenu
                    items={["Men", "Women", "Kids"]}
                    type="Sunglasses"
                  />
                )}
              </div>

              <div
                className="relative group"
                onMouseEnter={() => setEyeglassesDropdown(true)}
                onMouseLeave={() => setEyeglassesDropdown(false)}
              >
                <Link
                  to="/products"
                  className={`${headerTextClasses} ${
                    checkCategory === "Eyeglasses"
                      ? activeClasses
                      : notActiveClasses
                  }`}
                  onClick={() => {
                    dispatch(setCheckCategory("Eyeglasses"));
                    dispatch(setCheckSubCategory(""));
                  }}
                >
                  Eyeglasses
                </Link>
                {eyeglassesDropdown && (
                  <SubcategoryMenu
                    items={["Men", "Women", "Kids"]}
                    type="Eyeglasses"
                  />
                )}
              </div>

              <Link
                to="/products"
                className={`${headerTextClasses} ${
                  checkCategory === "Prescription"
                    ? activeClasses
                    : notActiveClasses
                }`}
                onClick={() => {
                  dispatch(setCheckCategory("Prescription"));
                  dispatch(setCheckSubCategory(""));
                }}
              >
                Prescription
              </Link>
            </div>

            {/* Rest of the header remains the same */}
            <div className="flex items-center gap-5">
              <div className="md:flex hidden items-center justify-center gap-2">
                {userStatus && (
                  <button
                    onClick={handleLogout}
                    className={`${headerTextClasses} text-white hover:text-mainColor border-b-2 hover:border-mainColor`}
                  >
                    LOGOUT
                  </button>
                )}
                {admin ? (
                  <Link
                    to="/admin"
                    className={`${headerTextClasses} ${
                      isActive("/admin") ? activeClasses : notActiveClasses
                    }`}
                    onClick={() => dispatch(setCheckCategory(""))}
                  >
                    Admin
                  </Link>
                ) : null}
              </div>

              <div className="md:flex hidden cursor-pointer">
                <Link
                  to="/favourites"
                  className={`p-2 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out ${
                    isActive("/favourites") ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(setCheckCategory(""))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    width="18"
                    height="18"
                    stroke="none"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </Link>
              </div>

              <div className="relative flex gap-2">
                <button onClick={() => dispatch(togglePopUpCart())}>
                  <img
                    src="images/shopping-cart.webp"
                    width={28}
                    height={28}
                    alt="Shopping Cart"
                  />
                  {cartItems.length > 0 && (
                    <span className="absolute bottom-[15px] md:right-[-7px] right-[25px] bg-mainColor text-white text-xs font-bold rounded-full px-1">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden text-gray-700 focus:outline-none cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="#f0f0f0"
                    stroke="#f0f0f0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[200px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1000] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-row-reverse items-center">
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-between p-4">
          <div className="flex flex-col gap-5">
            {/* Mobile Sunglasses Dropdown */}
            <div>
              <div className="flex justify-center items-center">
                <Link
                  to="/products"
                  className={`w-full text-left p-2 rounded-lg flex justify-between items-center ${
                    checkCategory === "Sunglasses" ? "text-mainColor" : ""
                  }`}
                  onClick={() => {
                    dispatch(setCheckCategory("Sunglasses"));
                    dispatch(setCheckSubCategory(""));
                  }}
                >
                  Sunglasses
                </Link>
                <svg
                  onClick={() => {
                    setSunglassesDropdown(!sunglassesDropdown);
                    setEyeglassesDropdown(false);
                  }}
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    sunglassesDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {sunglassesDropdown && (
                <div className="ml-4 mt-2 flex flex-col gap-2 transform transition-transform duration-300 ease-in-out">
                  {["Men", "Women", "Kids"].map((item) => (
                    <Link
                      key={item}
                      to="/products"
                      className="p-2 hover:text-mainColor"
                      onClick={() => {
                        dispatch(setCheckSubCategory(item));
                        dispatch(setCheckCategory("Sunglasses"));
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Eyeglasses Dropdown */}
            <div>
              <div className="flex justify-center items-center">
                <Link
                  to="/products"
                  className={`w-full text-left p-2 rounded-lg flex justify-between items-center ${
                    checkCategory === "Eyeglasses" ? "text-mainColor" : ""
                  }`}
                  onClick={() => {
                    dispatch(setCheckCategory("Eyeglasses"));
                    dispatch(setCheckSubCategory(""));
                  }}
                >
                  Eyeglasses
                </Link>
                <svg
                  onClick={() => {
                    setEyeglassesDropdown(!eyeglassesDropdown);
                    setSunglassesDropdown(false);
                  }}
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    eyeglassesDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {eyeglassesDropdown && (
                <div className="ml-4 mt-2 flex flex-col gap-2 transform transition-transform duration-300 ease-in-out">
                  {["Men", "Women", "Kids"].map((item) => (
                    <Link
                      key={item}
                      to="/products"
                      className="p-2 hover:text-mainColor"
                      onClick={() => {
                        dispatch(setCheckSubCategory(item));
                        dispatch(setCheckCategory("Eyeglasses"));
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/products"
              className={`p-2 rounded-lg ${
                checkCategory === "Prescription" ? "text-mainColor" : ""
              }`}
              onClick={() => {
                dispatch(setCheckCategory("Prescription"));
                dispatch(setCheckSubCategory(""));
              }}
            >
              Prescription
            </Link>

            <Link
              to="/favourites"
              className={`p-2 rounded-full transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 ${
                isActive("/favourites") ? activeClasses : ""
              }`}
              onClick={() => dispatch(setCheckCategory(""))}
            >
              <span>Favourites</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="18"
                height="18"
                stroke="none"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </Link>

            {userStatus && (
              <button
                onClick={handleLogout}
                className="w-full p-2 rounded-lg text-left"
              >
                Logout
              </button>
            )}
            {admin && (
              <Link
                to="/admin"
                className={`p-2 rounded-lg ${
                  isActive("/admin") === "Prescription" ? "text-mainColor" : ""
                }`}
                onClick={() => dispatch(setCheckCategory(""))}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
