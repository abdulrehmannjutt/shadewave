import {useEffect} from "react";
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import TopProducts from "../components/TopProducts"
import Cart from "../components/Cart";
import { useDispatch } from "react-redux";
import {setAllProducts, setAllCategories} from "../redux/cart/cartSlice";
import { BACKEND_BASE_URL } from "../constants/constants";

const Home = () => {
  const dispatch = useDispatch();


  const productsAndCategories = async () => {
    const productsResponse = await fetch(`${BACKEND_BASE_URL}admin/products`);
    const productsData = await productsResponse.json();
    dispatch(setAllProducts(productsData));

    const categoriesResponse = await fetch(`${BACKEND_BASE_URL}category/categories`);
    const categoriesData = await categoriesResponse.json();
    dispatch(setAllCategories(categoriesData))
  };

  useEffect(()=> {
    productsAndCategories();
  }, [])
  
  return (
    <section className="min-h-screen">
      {/* hero section */}
      {/* <Hero/> */}

      {/* categories */}
      {/* <Categories/> */}

      {/* top products */}
      {/* <TopProducts/> */}

      <Cart/>
    </section>
  );
};

export default Home;
