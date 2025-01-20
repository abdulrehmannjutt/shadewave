const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { category, subCategories } = req.body;

    const categoryExist = await categoryModel.findOne({ category });

    if (!categoryExist) {
      const categoryAdded = await categoryModel.create({
        category,
        subCategories,
      });

      if (categoryAdded) {
        return res.status(201).json(categoryAdded);
      } else {
        return res.status(400).json({ message: "Failed to create category" });
      }
    } else {
      const updatedCategory = await categoryModel.findOneAndUpdate(
        { category },
        {
          $addToSet: {
            subCategories: { $each: subCategories },
          },
        },
        { new: true }
      );

      if (updatedCategory) {
        return res.status(201).json(updatedCategory);
      } else {
        return res.status(400).json({ message: "Failed to update category" });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    if (categories.length > 0) {
      return res.status(200).json(categories);
    } else {
      return res.status(204).json({ message: "No categories found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, subCategories } = req.body;

    // Validate input
    if (!category || !subCategories) {
      return res
        .status(400)
        .json({ message: "Category and subCategories are required." });
    }

    // Check if the category exists
    const categoryExist = await categoryModel.findById(id);
    if (!categoryExist) {
      return res
        .status(404)
        .json({ message: `Category with ID ${id} not found.` });
    }

    // Update the category
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { category, subCategories },
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators` ensures schema validation
    );

    if (updatedCategory) {
      return res.status(200).json(updatedCategory);
    } else {
      return res.status(400).json({ message: "Failed to update category." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await categoryModel.deleteOne({ _id: id });

    if (deletedCategory.acknowledged) {
      return res.status(200).json({ message: "Category deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: `Category with ID ${id} not found.` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCategory,
  readCategories,
  updateCategory,
  deleteCategory,
};
