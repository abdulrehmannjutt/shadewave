const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const emailRoutes = require("./routes/emailRoutes");

const path = require("path");
require("dotenv").config();
const DB = process.env.URL;
const { GridFSBucket } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

console.log("Attempting to connect to MongoDB...");

mongoose
  .connect(DB, {
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("connection is not successful", err);
  });

let bucket;
mongoose.connection.on("connected", () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "productImages",
  });
});

console.log("MongoDB connection initiated");

const port = process.env.PORT || 3000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log("server is running at ", port);
});

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is running successfully!" });
});

app.use("/", userRoutes);

app.use("/admin", productRoutes);

app.use("/category", categoryRoutes);

app.use("/order", orderRoutes);

app.use("/contact", emailRoutes);