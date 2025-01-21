/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, togglePopUpCart } from "../redux/cart/cartSlice";
import {
  addToFavourites,
  removeFromFavourites,
} from "../redux/favourites/favouritesSlice";

function ProductCard({
  productId,
  img,
  imgDimensions,
  bgColor,
  title,
  paragraph,
  price,
  category,
  subCategory,
  images,
  classes
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const isFavourite = favourites.some((item) => item.productId === productId);

  const handleFavoriteClick = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(productId));
    } else {
      dispatch(
        addToFavourites({
          productId,
          img,
          category,
          subCategory,
          title,
          price,
          bgColor,
          paragraph,
        })
      );
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId,
        productImg: img,
        category,
        subCategory,
        title,
        price,
        quantity: 1,
      })
    );
    dispatch(togglePopUpCart());
  };

  return (
    <div className={`hover:border overflow-hidden flex flex-col bg-white shadow-lg transition-shadow max-w-[350px] min-h-[410px] ${classes}`}>
      <img
        className={`${imgDimensions} ${bgColor} cursor-pointer transition duration-300 ease-in-out hover:scale-110`}
        src={img}
        alt={title}
        onClick={() => {
          navigate("/singleproduct", {
            state: {
              img,
              title,
              paragraph,
              price,
              category,
              subCategory,
              images,
            },
          });
        }}
      />
      <div className="p-2 bg-white flex flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="text-[16px] font-semibold text-blackCustom uppercase">
            {title}
          </h1>
          <span className="text-sm font-semibold text-blackCustom">
            Rs {price}
          </span>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleFavoriteClick}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out"
            aria-label={
              isFavourite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavourite ? "red" : "none"}
              width="18"
              height="18"
              stroke={isFavourite ? "none" : "black"}
              strokeWidth={isFavourite ? "0" : "2"}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-mainColor text-white text-sm px-4 py-2 rounded-full transition duration-300 hover:bg-opacity-90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
