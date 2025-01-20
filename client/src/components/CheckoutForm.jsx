import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../constants/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cart/cartSlice";
import OrderReceipt from "./OrderRecipt";

const BillingDetailsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    paymentMethod: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const shippingPrice = 200;
  const cartData = localStorage.getItem("cartItems");
  const totalPriceFromCart =
    parseFloat(localStorage.getItem("totalPrice")) || 0;
  useEffect(() => {
    setCartItems(cartData ? JSON.parse(cartData) : []);

    setTotalPrice(totalPriceFromCart);
  }, [cartData, totalPriceFromCart]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.paymentMethod
    ) {
      toast("Please fill in all billing details before placing an order.");
      return;
    }

    const orderPayload = {
      ...formData,
      orderDetails: {
        cartItems,
        totalPrice: totalPrice + shippingPrice,
        shippingPrice,
      },
    };

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}order/placeorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          result = await response.json();
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          throw new Error("Invalid response format from server");
        }
      }

      if (response.ok) {
        toast("Order placed successfully!");
        if (result) {
          setOrderData(result.order);
          setShowReceipt(true);
        }

        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          phone: "",
          email: "",
          paymentMethod: "",
        });
        dispatch(clearCart());
        setCartItems([]);
        setTotalPrice(0);
      } else {
        toast("TRY AGAIN! to place a order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast(`An error occurred: ${err.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.paymentMethod
    ) {
      toast("Please fill in all billing details before placing an order.");
      return;
    }

    const phoneNumber = "923296282733";

    const orderSummary = cartItems
      .map((item) => `${item.title} (x${item.quantity}) - Rs: ${item.price}`)
      .join("\n");

    const totalMessage = `Subtotal: Rs: ${totalPrice}\nShipping: Rs: ${shippingPrice}\nTotal: Rs: ${
      shippingPrice + totalPrice
    }`;

    const billingDetails = `Billing Details:\nName: ${formData.firstName} ${formData.lastName}\nAddress: ${formData.address}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPayment Method: ${formData.paymentMethod}`;

    const message = `Hi, I would like to place an order:\n\n${orderSummary}\n\n${totalMessage}\n\n${billingDetails}`;

    const encodedMessage = encodeURIComponent(message);

    // WhatsApp URL scheme for mobile/desktop apps
    const whatsappAppURL = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

    // WhatsApp Web URL as a fallback
    const whatsappWebURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Attempt to open the app
    window.location.href = whatsappAppURL;

    // Fallback to WhatsApp Web after a delay
    setTimeout(() => {
      window.open(whatsappWebURL, "_blank");
    }, 1500); // Adjust delay as necessary
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        {/* <span className="w-8 h-8 rounded-full bg-mainColor text-white flex items-center justify-center text-lg font-semibold">
          1
        </span> */}
        <h2 className="text-xl font-semibold">Billing details</h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor"
            required
          />
        </div>

        <div className="mt-6 space-y-3">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <h1>Payment Methods</h1>
            </div>
            <div className="space-y-2">
              {/* Cash on Delivery */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash On Delivery"
                  onChange={handleChange}
                  className="w-4 h-4 text-[#007BC4] border-gray-300 focus:ring-[#007BC4]-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Cash on Delivery
                </span>
              </label>

              {/* Jazz Cash */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Jazz Cash"
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Jazz Cash
                </span>
              </label>

              {formData.paymentMethod === "jazzCash" && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Please pay via Jazz Cash
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Account Title: Arslan Anjum
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Jazz Cash Number:{" "}
                    <span className="text-red-600">0329 6282733</span>
                  </p>
                </div>
              )}

              {/* Easy Paisa */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Easy Paisa"
                  onChange={handleChange}
                  className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Easy Paisa
                </span>
              </label>

              {formData.paymentMethod === "easyPaisa" && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Please pay via Easy Paisa
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Account Title: Arslan Anjum
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Easy Paisa Number:{" "}
                    <span className="text-green-500">0329 6282733</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <h3>Send your order details on whatsapp</h3>
          <button
            className={`flex gap-2 border border-[#25D366] text-[#25D366] text-sm font-semibold py-3 px-4 rounded-lg ${
              cartItems.length < 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cartItems.length < 1}
            onClick={handleWhatsAppOrder}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/15713/15713434.png"
              alt="WhatsApp Icon"
              className="w-5 h-5"
            />
            WhatsApp
          </button>
        </div>

        <div>
          <button
            type="submit"
            className={`rounded focus:ring-mainColor bg-mainColor text-sm text-white p-2 w-full ${
              cartItems.length < 1 || isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={cartItems.length < 1 || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Placing Order...
              </div>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </form>

      {showReceipt && orderData && (
        <OrderReceipt order={orderData} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
};

export default BillingDetailsForm;
