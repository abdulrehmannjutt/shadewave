import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useProducts } from "../hooks/apis";
import Cart from "../components/Cart";
import { BACKEND_BASE_URL } from "../constants/constants";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { togglePopUpCart } from "../redux/cart/cartSlice";
import ImageCarousel from "../components/ImageCarousel";
import ProductsCrausel from "../components/ProductsCrausel";

function SingleProduct() {
  const { products, loading } = useProducts();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    img,
    title,
    paragraph,
    price,
    category,
    subCategory,
    images,
    productId,
  } = location.state || {};

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-white min-h-screen">
      <ToastContainer position="top-left"/>
      <div className="md:pt-16 pt-9 mx-auto">
        <div className="flex justify-between sm:flex-nowrap flex-wrap md:px-16 px-7">
          <ImageCarousel images={images} baseUrl={BACKEND_BASE_URL} />
          <div className="w-full sm:pl-10 sm:py-6 mt-6 sm:mt-0">
            <h1 className="text-gray-900 sm:text-3xl text-xl title-font font-medium mb-1">
              {title}
            </h1>
            <div className="flex gap-2">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                {category}
              </h2>
            </div>
            <div className="flex mb-4 gap-2">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                {subCategory}
              </h2>
            </div>
            <p className="leading-relaxed text-sm">{paragraph}</p>
            <div className="flex items-center gap-8 mt-5">
              <span className="title-font font-medium sm:text-2xl text-xl text-gray-900">
                Rs: {price}
              </span>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      productId,
                      productImg: img,
                      category: category,
                      subCategory: subCategory,
                      title: title,
                      price: price,
                      quantity: 1,
                    })
                  );
                  toast.success("Added to cart");
                  // dispatch(togglePopUpCart());
                  // notify();
                }}
                className="flex text-white bg-mainColor border-transparent py-2 px-6 focus:outline-none hover:bg-white hover:text-mainColor hover:border hover:border-mainColor rounded-full border"
              >
                Add to Cart
              </button>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
        <div className="sm:mt-0 lg:mt-10 mt-14">
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
            // Filter related products
            (() => {
              const relatedProducts = products.filter(
                (product) =>
                  product.category === category && product.name !== title
              );

              // Render "Related Products" text and products only if relatedProducts is not empty
              return relatedProducts.length > 0 ? (
                <div className="flex flex-col gap-8">
                  <h2 className="sm:text-2xl text-lg font-bold text-blackCustom uppercase text-center inline-block mx-auto sm:mt-12 mt-7">
                    You may also like
                  </h2>
                  <ProductsCrausel products={relatedProducts} />
                  {/* <div className="flex flex-wrap  justify-center items-center gap-10">
                    {relatedProducts.map((category, index) => (
                      <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3"
                      >
                        <ProductCard
                          productId={index}
                          img={`${BACKEND_BASE_URL}admin/image/${category.images[0]}`}
                          imgDimensions="w-full h-[300px] object-cover"
                          title={category.name}
                          category={category.category}
                          paragraph={category.description}
                          price={category.price}
                          bgColor={category.bgColor}
                          images={category?.images}
                        />
                      </div>
                    ))}
                  </div> */}
                </div>
              ) : null;
            })()
          )}
        </div>

        <Cart />
      </div>
    </section>
  );
}

export default SingleProduct;
