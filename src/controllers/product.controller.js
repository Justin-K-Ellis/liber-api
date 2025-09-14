import express from "express";
import Product from "../models/product.model.js";

const productController = express.Router();
const productModel = new Product();

productController.get("/", async (_req, res) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message: "Something went wrong when getting all products.",
    });
  }
});

export default productController;
