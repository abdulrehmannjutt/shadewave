const express = require("express");
const router = express.Router();
const {
  createProduct,
  readProducts,
  updateProduct,
  deleteProduct,
  getImage,
} = require("../controllers/productsControllers");
const multer = require("multer");
const storage = multer.memoryStorage(); // Change to memory storage
const upload = multer({ storage: storage });

router.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),

  createProduct
);
router.get("/products", readProducts);
router.patch(
  "/updateproduct/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateProduct
);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/image/:id", getImage);

module.exports = router;
