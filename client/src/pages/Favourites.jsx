import { useSelector } from "react-redux";
import HomeCards from "../components/HomeCards";
import Cart from "../components/Cart";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites);

  return (
    <section className={`px-10 py-10 bg-white min-h-screen`}>
      <div className="">
        <div className="flex">
          <h2 className="sm:text-3xl text-lg font-bold text-blackCustom uppercase border-b-2 pb-2 border-mainColor inline-block mx-auto mb-2">
            Favourites
          </h2>
        </div>

        <div className="mt-6 flex justify-center">
          {favourites && favourites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favourites.map((favourite) => (
                <HomeCards
                  key={favourite.productId}
                  productId={favourite.productId}
                  img={favourite.img}
                  imgDimensions="w-full h-[300px] object-cover"
                  title={favourite.title}
                  category={favourite.category}
                  subCategory={favourite.subCategory}
                  paragraph={favourite.paragraph}
                  price={favourite.price}
                  bgColor={favourite.bgColor}
                  images={favourite?.images}
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
