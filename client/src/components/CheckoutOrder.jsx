import { useSelector } from "react-redux";

const OrderSummary = () => {
  const shippingPrice = 200;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Your order</h2>

      <div className="space-y-4">
        {cartItems && cartItems?.length > 0 ? (
          cartItems?.map((item, index) => (
            <div className="flex justify-between items-start" key={index}>
              <span className="text-sm">
                {item?.title}{" "}
                <span className="text-gray-500">× {item?.quantity}</span>
              </span>
              <span className="text-sm font-medium">Rs: {item?.price}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in the cart.</p>
        )}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal</span>
            <span className="font-medium">Rs: {totalPrice}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-medium">Shipping</span>
            {cartItems.length > 0 ? (
              <span className="text-sm text-gray-600">{shippingPrice}</span>
            ) : (
              <span className="text-sm text-gray-600">0</span>
            )}
          </div>

          <div className="flex justify-between pt-2 border-t">
            <span className="font-bold">Total</span>
            {cartItems.length > 0 ? (
              <span className="font-bold">
                Rs: {totalPrice + shippingPrice}
              </span>
            ) : (
              <span className="font-bold">Rs: 0</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
