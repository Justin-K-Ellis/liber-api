import express from "express";
import Product from "../models/product.model.js";

const productController = express.Router();
const productModel = new Product();

// == Create ==
productController.post("/", async (req, res) => {
  const { productId, productName, price } = req.body;
  console.log(productId, productName, price);

  if (
    productId === undefined ||
    productName === undefined ||
    price === undefined
  ) {
    res.status(400);
    return res.json({
      message: "Product id, product name, or price invalid or missing.",
    });
  }

  try {
    const productIdNum = parseInt(productId);
    const priceNum = parseInt(price);
    await productModel.add(productIdNum, productName, priceNum);
    res.status(201);
    res.json({
      message: "Product created.",
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Something went wrong when creating this product.",
    });
  }
});

// == Read ==
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
