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
    const newProduct = await productModel.add(
      productIdNum,
      productName,
      priceNum
    );
    res.status(201);
    res.json(newProduct);
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

// == Update ==
productController.put("/:productId", async (req, res) => {
  const productId = parseInt(req.params.productId);
  const { productName, price } = req.body;
  try {
    const updatedProduct = await productModel.update(
      productId,
      productName,
      parseInt(price)
    );
    if (updatedProduct.length < 1) {
      res.status(404);
      res.json({
        message: `Product ${productId} does not exist.`,
      });
    }
    res.json({
      message: `Product ${productId} updated.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message: `Something went wrong when updating product ${productId}.`,
    });
  }
});

// == Delete ==
productController.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await productModel.delete(parseInt(productId));
    if (deletedProduct.length < 1) {
      res.status(404);
      res.json({
        message: `Product ${productId} does not exist.`,
      });
    }
    res.status(204);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message: `Something went wrong when deleting product ${productId}.`,
    });
  }
});

export default productController;
