import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { BACKEND_BASE_URL } from "../../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDeleteProductModal,
  setSelectedProduct,
} from "../../redux/admin/adminSlice";
import DeleteModal from "./DeleteModal";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isProductsUpdate = useSelector((state) => state.admin.isProductsUpdate);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}order/allorders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [isProductsUpdate]);

  return (
    <section>
      <div className="overflow-x-auto min-h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-4">
                Sr No
              </th>
              <th scope="col" className="px-4 py-4">
                Order ID
              </th>
              <th scope="col" className="px-4 py-4">
                Customer
              </th>
              <th scope="col" className="px-4 py-4">
                Contact
              </th>
              <th scope="col" className="px-4 py-4">
                Address
              </th>
              <th scope="col" className="px-4 py-4">
                Payment
              </th>
              <th scope="col" className="px-4 py-4">
                Items
              </th>
              <th scope="col" className="px-4 py-4">
                Total
              </th>
              <th scope="col" className="px-4 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">
                  <div className="flex justify-center items-center h-full py-4">
                    <TailSpin
                      visible={true}
                      height="100"
                      width="100"
                      color="#007BC4"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                    />
                  </div>
                </td>
              </tr>
            ) : !orders?.length ? (
              <tr>
                <td colSpan="7" className="py-5 px-5">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order._id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {order._id.substring(order._id.length - 6)}
                  </td>
                  <td className="px-4 py-3">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="px-4 py-3">
                    <div>{order.phone}</div>
                    <div className="text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="">{order.address}</div>
                  </td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      {order?.orderDetails?.cartItems?.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <img
                            src={item.productImg}
                            alt={item.title}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">
                              Qty: {item.quantity} × RS: {item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {order.orderDetails.totalPrice}
                    </div>
                    <div className="text-xs text-gray-500">
                      Inc. {order?.orderDetails?.shippingPrice} shipping
                    </div>
                  </td>
                  <td className="px-4 py-3 flex items-center justify-end">
                    <button
                      onClick={() => {
                        dispatch(toggleDeleteProductModal());
                        dispatch(setSelectedProduct(order));
                      }}
                      type="button"
                      className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          fill="currentColor"
                          d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <DeleteModal url="order/deleteorder/" />
      </div>
    </section>
  );
};

export default OrdersTable;
