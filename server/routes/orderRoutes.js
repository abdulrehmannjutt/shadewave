const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  deleteOrder
} = require("../controllers/orderControllers");

router.post("/placeorder", createOrder);
router.get("/allorders", getAllOrders);
router.delete("/deleteorder/:id", deleteOrder);

module.exports = router;
