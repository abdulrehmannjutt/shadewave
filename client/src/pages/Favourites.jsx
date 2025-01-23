import { useSelector } from "react-redux";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites);

  return (
    <section className={`lg:px-10 py-10 bg-white min-h-screen`}>
      <div className="">
        <div className="flex">
          <h2 className="sm:text-3xl text-lg font-bold text-blackCustom uppercase border-b-2 pb-2 border-mainColor inline-block mx-auto mb-2">
            Favourites
          </h2>
        </div>

        <div className="mt-6 ">
          {favourites && favourites.length > 0 ? (
            <div className="flex flex-wrap justify-center md:gap-4 gap-2">
              {favourites.map((favourite) => (
                <ProductCard
                  key={favourite.productId}
                  productId={favourite.productId}
                  img={favourite.img}
                  imgDimensions="lg:w-[390px] lg:h-[390px] sm:w-[320px] sm:h-[320px] 430:w-[210px] 430:h-[210px] w-[175px] h-[175px]"
                  title={favourite.title}
                  category={favourite.category}
                  subCategory={favourite.subCategory}
                  paragraph={favourite.paragraph}
                  price={favourite.price}
                  bgColor={favourite.bgColor}
                  images={favourite?.images}
                  classes="lg:w-[390px] sm:w-[320px] 430:w-[210px] w-[175px]"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
              <p>No items in favorites.</p>
              <p className="mt-2 text-sm">
                Add items to your favorites to see them here!
              </p>
            </div>
          )}
        </div>
      </div>
      <Cart />
    </section>
  );
};

export default Favourites;
