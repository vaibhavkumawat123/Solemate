import express from "express";
import { getProductById } from "../controllers/productController.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/:id", getProductById);

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;