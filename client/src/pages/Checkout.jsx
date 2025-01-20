// Import React and required components
import BillingDetailsForm from "../components/CheckoutForm";
import OrderSummary from "../components/CheckoutOrder";
import Cart from "../components/Cart";

const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BillingDetailsForm />
        <OrderSummary />
        <Cart/>
      </div>
    </div>
  );
};

export default CheckoutPage;
