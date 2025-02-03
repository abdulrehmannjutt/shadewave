/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { Link } from "react-router-dom";

const OrderReceipt = ({ order, onClose }) => {
  const getLastSixDigits = (id) => {
    return id.slice(-6);
  };

  const downloadReceipt = () => {
    const receiptContent = document.getElementById("receipt-content");
    const printWindow = window.open("", "", "height=800,width=800");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Receipt</title>
          <style>
            body { 
              padding: 12px;
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 1.4;
            }
            .receipt-container {
              max-width: 800px;
              margin: 0 auto;
            }
            .logo {
              width: 100px;
              height: auto;
              margin-bottom: 12px;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 12px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 12px;
            }
            .receipt-section {
              margin-bottom: 12px;
            }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 12px 0;
            }
            th, td {
              padding: 6px 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f9fafb;
            }
            .text-right {
              text-align: right;
            }
            .footer {
              text-align: center;
              margin-top: 16px;
              padding-top: 12px;
              border-top: 1px solid #ddd;
            }
          </style>
        </head>
        <body onload="window.print()">
          <div class="receipt-container">
            ${receiptContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 max-h-[90vh] overflow-y-auto">
        <div id="receipt-content" className="space-y-4">
          {/* Receipt Header with Logo */}
          <div className="text-center border-b pb-3">
            <img src="/images/shadewave.png" alt="Logo" height={44} width={50} />
            <h2 className="text-xl font-bold text-mainColor">Order Receipt</h2>
            <p className="text-gray-600 text-sm">
              {format(new Date(), "MMMM dd, yyyy HH:mm")}
            </p>
          </div>

          {/* Order Information */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Order Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium">Order ID: </span>
                <span className="text-gray-600">
                  {getLastSixDigits(order._id)}
                </span>
              </div>
              <div>
                <span className="font-medium">Payment Method: </span>
                <span className="text-gray-600">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Customer Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium">Name: </span>
                <span className="text-gray-600">{`${order.firstName} ${order.lastName}`}</span>
              </div>
              <div>
                <span className="font-medium">Contact: </span>
                <span className="text-gray-600">{order.phone}, </span>
                <span className="text-gray-600">{order.email}</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium">Shipping Address: </span>
                <span className="text-gray-600">{order.address}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Order Items</h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-1.5 px-3 text-left">Item</th>
                  <th className="py-1.5 px-3 text-right">Price</th>
                  <th className="py-1.5 px-3 text-right">Qty</th>
                  <th className="py-1.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.orderDetails.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-1.5 px-3">{item.title}</td>
                    <td className="py-1.5 px-3 text-right">Rs: {item.price}</td>
                    <td className="py-1.5 px-3 text-right">{item.quantity}</td>
                    <td className="py-1.5 px-3 text-right">
                      Rs: {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t font-medium">
                <tr>
                  <td colSpan="3" className="py-1.5 px-3 text-right">
                    Subtotal:
                  </td>
                  <td className="py-1.5 px-3 text-right">
                    Rs:{" "}
                    {order.orderDetails.totalPrice -
                      order.orderDetails.shippingPrice}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-1.5 px-3 text-right">
                    Shipping:
                  </td>
                  <td className="py-1.5 px-3 text-right">
                    Rs: {order.orderDetails.shippingPrice}
                  </td>
                </tr>
                <tr className="font-bold">
                  <td colSpan="3" className="py-1.5 px-3 text-right">
                    Total:
                  </td>
                  <td className="py-1.5 px-3 text-right">
                    Rs: {order.orderDetails.totalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Thank You Message */}
          <div className="text-center border-t pt-3">
            <p className="font-medium text-sm">Thank you for your order!</p>
            <p className="text-xs text-gray-600">
              For any questions, please contact us
            </p>
            <p className="text-xs text-gray-600">
              0345-6502924, shadewave48@gmail.com
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3 justify-end">
          <Link
            to="/"
            onClick={downloadReceipt}
            className="bg-mainColor text-white px-3 py-1.5 rounded-lg hover:bg-opacity-90 text-sm"
          >
            Download Receipt
          </Link>
          <Link
            to="/"
            onClick={onClose}
            className="border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-sm"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
