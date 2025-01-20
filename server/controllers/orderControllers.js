const ordersModel = require("../models/ordersModel");

const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      phone,
      email,
      paymentMethod,
      orderDetails,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !address ||
      !phone ||
      !email ||
      !paymentMethod ||
      !orderDetails
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = new ordersModel({
      firstName,
      lastName,
      address,
      phone,
      email,
      paymentMethod,
      orderDetails,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the order ID is provided
    if (!id) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    // Find and delete the order
    const deletedOrder = await ordersModel.findByIdAndDelete(id);

    // If no order found
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      message: "Order deleted successfully.",
      order: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders, 
  deleteOrder
};
