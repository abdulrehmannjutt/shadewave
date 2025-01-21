import { useEffect } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Cart from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts, setAllCategories } from "../redux/cart/cartSlice";
import { BACKEND_BASE_URL } from "../constants/constants";
import ProductsCrausel from "../components/ProductsCrausel";

const Home = () => {
  const dispatch = useDispatch();

  const allproducts = async () => {
    const productsResponse = await fetch(`${BACKEND_BASE_URL}admin/products`);
    const productsData = await productsResponse.json();
    dispatch(setAllProducts(productsData));
  };
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    allproducts();
  }, []);

  return (
    <section className="min-h-screen">
      {/* hero section */}
      <Hero />
      {/* categories */}
      <Categories />
      {/* top products */}
      <ProductsCrausel
        products={products.filter(
          (product) => product.category === "Sunglasses"
        )}
        heading="Sunglasses"
      />

      <ProductsCrausel
        products={products.filter(
          (product) => product.category === "Eyeglasses"
        )}
        heading="Eyeglasses"
      />
      <Cart />
      {/* {products.map((product, index) => (
        <div key={index}>
          <ProductCard
            productId={product._id}
            img={`${BACKEND_BASE_URL}admin/image/${product.images[0]}`}
            imgDimensions="h-[300px] object-cover"
            title={product.name}
            paragraph={product.description}
            price={product.price}
            bgColor={product.bgColor}
            category={product.category}
            subCategory={product.subCategory}
            images={product?.images}
          />
        </div>
      ))} */}
    </section>
  );
};

export default Home;
