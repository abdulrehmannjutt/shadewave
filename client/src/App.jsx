import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Login from "./components/LoginForm";
import SignUp from "./components/SignUpForm";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Admin from "./pages/Admin";
import CheckoutPage from "./pages/Checkout";
import Favourites from "./pages/Favourites";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ToastContainer
        toastClassName="custom-toast"
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="products" element={<Products />} />
            <Route path="singleproduct" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
