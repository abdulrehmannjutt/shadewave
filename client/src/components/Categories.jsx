import HomeCards from "./HomeCards";
import { BACKEND_BASE_URL } from "../constants/constants";
import { useEffect, useState, useRef } from "react";
import { useProducts } from "../hooks/apis";
import { TailSpin } from "react-loader-spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

function Categories() {
  const { products } = useProducts();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("Development Boards");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}category/categories`
        );
        setCategories(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 300; // Adjust this value to control scroll distance

    if (container) {
      const newScrollPosition =
        container.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const filteredCategories = categories?.filter((category) =>
    products.some((product) => product.category === category.category)
  ) || [];

  return (
    <section className="text-gray-600 body-font bg-white">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col items-center gap-[25px] pb-2">
          <h2 className="text-3xl font-bold text-blackCustom uppercase border-b-2 pb-2 border-mainColor">
            Categories
          </h2>
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
            <div className="relative w-full max-w-6xl mx-auto">
              {/* Left Arrow */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-1 bg-black/50 hover:bg-black/75 p-2 rounded-r"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Scrollable Categories */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-hidden gap-4 px-12 py-4 scroll-smooth"
              >
                {filteredCategories?.map((element, index) => (
                  <p
                    key={index}
                    className={`flex-shrink-0 text-sm text-blackCustom uppercase font-semibold pb-2 cursor-pointer hover:text-mainColor ${
                      currentCategory === element?.category
                        ? "text-mainColor"
                        : ""
                    }`}
                    onClick={() => {
                      setCurrentCategory(element?.category);
                    }}
                  >
                    {element?.category}
                  </p>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-1 bg-black/50 hover:bg-black/75 p-2 rounded-l"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex justify-center flex-wrap -m-2">
            {products.filter(
              (product) =>
                !currentCategory || product.category === currentCategory
            ).length === 0 ? (
              <div className="w-full text-center p-4">
                <p>No products found.</p>
              </div>
            ) : (
              products
                .filter(
                  (product) =>
                    !currentCategory || product.category === currentCategory
                )
                .map((category, index) => (
                  <div
                    key={index}
                    className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3"
                  >
                    <HomeCards
                      productId={category?._id}
                      img={`${BACKEND_BASE_URL}admin/image/${category?.images[0]}`}
                      imgDimensions="w-full h-[300px] object-cover"
                      title={category?.name}
                      category={category?.category}
                      subCategory={category?.subCategory}
                      paragraph={category?.description}
                      price={category?.price}
                      bgColor={category?.bgColor}
                      images={category?.images}
                    />
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
