const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  orderDetails: {type: Object, required: true}
});

const Orders = mongoose.model("orders", ordersSchema);
module.exports = Orders;