import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Cart from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../redux/cart/cartSlice";
import { BACKEND_BASE_URL } from "../constants/constants";
import ProductsCrausel from "../components/ProductsCrausel";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const allproducts = async () => {
    setLoading(true);
    const productsResponse = await fetch(`${BACKEND_BASE_URL}admin/products`);
    const productsData = await productsResponse.json();
    dispatch(setAllProducts(productsData));
    setLoading(false);
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
        loading={loading}
      />

      <ProductsCrausel
        products={products.filter(
          (product) => product.category === "Eyeglasses"
        )}
        heading="Eyeglasses"
        loading={loading}
      />
      <Cart />
    </section>
  );
};

export default Home;
