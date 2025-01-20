const express = require("express");
const router = express.Router();
const { createCategory, readCategories, updateCategory, deleteCategory } = require("../controllers/categoryControllers");

router.post("/addcategory", createCategory);
router.get("/categories", readCategories);
router.patch("/updatecategory/:id", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);

module.exports = router;
