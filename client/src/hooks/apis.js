import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { setAllProducts, setAllCategories } from "../redux/cart/cartSlice";

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_BASE_URL}admin/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await response.json();
        dispatch(setAllProducts(productsData || []));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [products, dispatch]);

  return { products, loading, error };
};

export const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.cart.categories);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_BASE_URL}category/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await response.json();
        dispatch(setAllCategories(categoriesData || []));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!categories || categories.length === 0) {
      fetchProducts();
    }
  }, [categories, dispatch]);

  return { categories, loading, error };
};
