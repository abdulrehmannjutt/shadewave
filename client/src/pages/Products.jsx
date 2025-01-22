import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { BACKEND_BASE_URL } from "../constants/constants";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import { useProducts, useCategories } from "../hooks/apis";
import {
  setCheckCategory,
  setCheckSubCategory,
} from "../redux/admin/adminSlice";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const checkCategory = useSelector((state) => state.admin.checkCategory);
  const checkSubCategory = useSelector((state) => state.admin.checkSubCategory);

  const dispatch = useDispatch();

  const { products, loading } = useProducts();
  const { categories } = useCategories();

  useEffect(() => {
    // Filtering logic
    if (checkSubCategory) {
      // Filter by both category and subcategory
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category === checkCategory &&
            product.subCategory === checkSubCategory
        )
      );
    } else if (checkCategory) {
      // Filter by category only
      setFilteredProducts(
        products.filter((product) => product.category === checkCategory)
      );
    } else {
      // Show all products
      setFilteredProducts(products);
    }
  }, [checkCategory, checkSubCategory, products]);

  return (
    <section className="body-font bg-white min-h-screen py-[40px] lg:px-[64px] max-w-screen-2xl mx-auto">
      <div className="flex flex-col justify-center">
        <h1
          className={`uppercase md:text-[50px] text-[30px] text-blackCustom lg:px-0 px-2  `}
        >
          <span
            className={`${checkCategory ? "cursor-pointer" : ""}`}
            onClick={() => {
              dispatch(setCheckCategory(checkCategory));
              dispatch(setCheckSubCategory(""));
            }}
          >
            {checkCategory ? checkCategory : "Products"}
          </span>
        </h1>
        {checkCategory && (
          <ul className="flex gap-4 md:text-[24px] text-[20px]">
            {categories
              ?.filter((category) => category.category === checkCategory)
              ?.flatMap((filteredCategory) =>
                filteredCategory.subCategories.map((subCategory, index) => (
                  <li
                    key={`${filteredCategory._id}-${index}`}
                    className={`cursor-pointer lg:px-0 px-2 ${
                      checkSubCategory === subCategory ? "text-mainColor" : ""
                    }`}
                    onClick={() => dispatch(setCheckSubCategory(subCategory))}
                  >
                    {subCategory}
                  </li>
                ))
              )}
          </ul>
        )}

        {/* Main content container */}
        <div
          className={`flex flex-wrap justify-center items-center md:gap-3 gap-2 md:py-[30px] py-[10px] ${
            loading ? "justify-center" : ""
          }`}
        >
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
          ) : filteredProducts.length !== 0 ? (
            filteredProducts?.map((product, index) => (
              <div key={index} className="">
                <ProductCard
                  productId={product._id}
                  img={`${BACKEND_BASE_URL}admin/image/${product.images[0]}`}
                  imgDimensions="lg:w-[390px] lg:h-[390px] sm:w-[320px] sm:h-[320px] 430:w-[210px] 430:h-[210px] w-[175px] h-[175px] object-cover"
                  title={product.name}
                  paragraph={product.description}
                  price={product.price}
                  bgColor={product.bgColor}
                  category={product.category}
                  subCategory={product.subCategory}
                  images={product?.images}
                  classes="lg:w-[390px] sm:w-[320px] 430:w-[210px] w-[175px]"
                />
              </div>
            ))
          ) : (
            <p className="md:text-[20px] text-[16px]">No products</p>
          )}
        </div>
      </div>
      <Cart />
    </section>
  );
};

export default Products;
