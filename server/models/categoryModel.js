const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  subCategories: [{ type: String, required: true }],
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
