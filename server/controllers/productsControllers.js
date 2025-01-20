const productModel = require("../models/productsModel");
const fs = require("fs");
const path = require("path");
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    const { name, price, category, subCategory, description } = req.body;

    // Check if at least one file is provided
    if (
      !req.files ||
      (!req.files.image1 && !req.files.image2 && !req.files.image3)
    ) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get GridFS bucket
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "productImages",
    });

    const images = [];

    // Upload image1 if it exists
    if (req.files.image1) {
      const file = req.files.image1[0];
      const image1Id = await uploadToGridFS(bucket, file);
      images.push(image1Id);
    }

    // Upload image2 if it exists
    if (req.files.image2) {
      const file = req.files.image2[0];
      const image2Id = await uploadToGridFS(bucket, file);
      images.push(image2Id);
    }

    // Upload image3 if it exists
    if (req.files.image3) {
      const file = req.files.image3[0];
      const image3Id = await uploadToGridFS(bucket, file);
      images.push(image3Id);
    }

    // Save product with images
    const productAdded = await productModel.create({
      name,
      images, // Save array of uploaded image IDs
      price,
      category,
      subCategory,
      description,
    });

    if (productAdded) {
      return res.status(201).json({
        message: "Product added successfully",
        product: productAdded,
      });
    } else {
      return res.status(400).send("Failed to create product");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

// Helper function to upload files to GridFS
const uploadToGridFS = async (bucket, file) => {
  const filename = `${Date.now()}-${file.originalname}`;
  const uploadStream = bucket.openUploadStream(filename, {
    contentType: file.mimetype,
    metadata: {
      uploadDate: new Date(),
    },
  });

  const bufferStream = new require("stream").PassThrough();
  bufferStream.end(file.buffer);

  await new Promise((resolve, reject) => {
    bufferStream.pipe(uploadStream).on("error", reject).on("finish", resolve);
  });

  return uploadStream.id.toString(); // Return GridFS file ID
};


// Helper function to upload files to GridFS
// const uploadToGridFS = async (bucket, file) => {
//   const filename = `${Date.now()}-${file.originalname}`;
//   const uploadStream = bucket.openUploadStream(filename, {
//     contentType: file.mimetype,
//     metadata: {
//       uploadDate: new Date(),
//     },
//   });

//   const bufferStream = new require("stream").PassThrough();
//   bufferStream.end(file.buffer);

//   await new Promise((resolve, reject) => {
//     bufferStream.pipe(uploadStream).on("error", reject).on("finish", resolve);
//   });

//   return uploadStream.id.toString(); // Return GridFS file ID
// };



const getImage = async (req, res) => {
  try {
    const imageId = new mongoose.Types.ObjectId(req.params.id);
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "productImages",
    });

    const downloadStream = bucket.openDownloadStream(imageId);

    downloadStream.on("error", () => {
      return res.status(404).json({ error: "Image not found" });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving image:", error);
    return res.status(500).json({ error: "Failed to retrieve image" });
  }
};

const readProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    if (products) {
      // products founded
      return res.status(200).json(products);
    } else {
      // products not founded
      return res.status(204).send("products not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("server error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from URL
    const { name, price, category, subCategory, description } = req.body;

    // Get the product to ensure it exists
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get GridFS bucket
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "productImages",
    });

    const updatedFields = {};

    // Update text fields if provided
    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    if (category) updatedFields.category = category;
    if (subCategory) updatedFields.subCategory = subCategory;
    if (description) updatedFields.description = description;

    // Handle image updates
    const images = existingProduct.images || [];

    // Helper to upload new images and delete old ones
    const handleImageUpdate = async (fieldName, index) => {
      if (req.files[fieldName]) {
        // Delete the old image from GridFS
        if (images[index]) {
          await bucket.delete(new mongoose.Types.ObjectId(images[index]));
        }

        // Upload the new image
        const file = req.files[fieldName][0];
        const newImageId = await uploadToGridFS(bucket, file);

        // Update the image ID in the array
        images[index] = newImageId;
      }
    };

    // Update images if provided
    await handleImageUpdate("image1", 0);
    await handleImageUpdate("image2", 1);
    await handleImageUpdate("image3", 2);

    // Add updated images to the fields
    updatedFields.images = images;

    // Update the product in the database
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product to get the image IDs
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found.` });
    }

    // Get GridFS bucket
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "productImages",
    });

    // Check if product.image is an array and delete each image
    if (Array.isArray(product.image)) {
      for (const imageId of product.image) {
        try {
          const objectId = new mongoose.Types.ObjectId(imageId); // Ensure valid ObjectId
          await bucket.delete(objectId);
          console.log(
            `Image with ID ${imageId} deleted successfully from GridFS`
          );
        } catch (error) {
          console.error(
            `Error deleting image with ID ${imageId} from GridFS:`,
            error.message
          );
          // Continue deleting other images even if one fails
        }
      }
    } else {
      console.warn("product.image is not an array.");
    }

    // Delete the product record
    const deletedProduct = await productModel.deleteOne({ _id: id });

    if (deletedProduct.acknowledged) {
      res.status(200).send("Product deleted successfully");
    } else {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = { createProduct, readProducts, updateProduct, deleteProduct, getImage };
