import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Cart from "../components/Cart";
import ProductsCrausel from "../components/ProductsCrausel";
import { useProducts } from "../hooks/apis";

const Home = () => {
  
  const {products, loading} = useProducts();

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
