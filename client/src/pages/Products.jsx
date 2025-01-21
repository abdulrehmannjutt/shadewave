import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import { BACKEND_BASE_URL } from "../constants/constants";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const filterByCategory = (category) => {
    setLoading(true);
    setActiveCategory(category);
    setActiveSubCategory(null);

    const filtered = allProducts.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
    setLoading(false);

    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  const filterBySubCategory = (category, subCategory) => {
    setLoading(true);
    setActiveCategory(category);
    setActiveSubCategory(subCategory);

    const filtered = allProducts.filter(
      (product) =>
        product.category === category && product.subCategory === subCategory
    );
    setFilteredProducts(filtered);
    setLoading(false);

    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const productsAndCategories = async () => {
    setLoading(true);
    try {
      const productsResponse = await fetch(`${BACKEND_BASE_URL}admin/products`);
      const productsData = await productsResponse.json();
      setAllProducts(productsData);
      setFilteredProducts(productsData);

      const categoriesResponse = await fetch(
        `${BACKEND_BASE_URL}category/categories`
      );
      const categoriesData = await categoriesResponse.json();

      const filteredCategories = categoriesData.filter((category) => {
        const categoryProducts = productsData.filter(
          (product) => product.category === category.category
        );
        if (categoryProducts.length > 0) {
          category.subCategories = category.subCategories.filter(
            (subCategory) =>
              categoryProducts.some(
                (product) => product.subCategory === subCategory
              )
          );
          return true;
        }
        return false;
      });

      setCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    productsAndCategories();
  }, []);

  return (
    <section className="text-gray-600 body-font bg-white">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed ${
          isSidebarOpen ? "top-0 left-[215px]" : "top-[78px] left-[2px]"
        } z-50 px-1 py-2 rounded-lg sm:hidden`}
      >
        <svg
          className="w-6 h-6"
          fill="#00205B"
          stroke="#00205B"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div className="flex justify-center min-h-screen">
        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 sm:z-0 z-40 w-64 bg-white
            transform transition-transform duration-300 ease-in-out
            sm:sticky sm:top-0 sm:translate-x-0 sm:block sm:h-screen
            ${isSidebarOpen ? "translate-x-0 h-screen" : "-translate-x-full"}
          `}
        >
          {/* Scrollable content */}
          <div className="h-full w-64 overflow-y-auto px-5 py-8 sm:py-8">
            <h2 className="text-gray-900 font-bold uppercase mb-5 top-0 bg-white pb-2">
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category, i) => (
                <li key={i} className="space-y-1">
                  <button
                    onClick={() => filterByCategory(category.category)}
                    className={`
                      w-full text-left px-4 py-2 rounded-lg transition-colors
                      ${
                        activeCategory === category.category
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-50 text-gray-700"
                      }
                    `}
                  >
                    {category.category}
                  </button>

                  {Array.isArray(category.subCategories) &&
                    category.subCategories.map((subCategory, j) => (
                      <button
                        key={j}
                        onClick={() =>
                          filterBySubCategory(category.category, subCategory)
                        }
                        className={`
                        w-full text-left pl-8 pr-4 py-1.5 rounded-lg transition-colors text-sm
                        ${
                          activeSubCategory === subCategory
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-50 text-gray-600"
                        }
                      `}
                      >
                        {subCategory}
                      </button>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content container */}
        <div className="container px-5 py-12 flex flex-wrap justify-center">
          {loading ? (
            <div className="flex justify-center items-center h-[70vh]">
              <TailSpin
                visible={true}
                height="100"
                width="100"
                color="#007BC4"
                ariaLabel="tail-spin-loading"
                radius="1"
              />
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3"
              >
                <ProductCard
                  productId={product._id}
                  img={`${BACKEND_BASE_URL}admin/image/${product.images[0]}`}
                  imgDimensions="w-full h-[300px] object-cover"
                  title={product.name}
                  paragraph={product.description}
                  price={product.price}
                  bgColor={product.bgColor}
                  category={product.category}
                  subCategory={product.subCategory}
                  images={product?.images}
                />
              </div>
            ))
          )}
        </div>
        <Cart />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </section>
  );
};

export default Products;
