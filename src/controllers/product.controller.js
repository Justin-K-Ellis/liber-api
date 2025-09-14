import express from "express";
import Product from "../models/product.model.js";

const productController = express.Router();
const productModel = new Product();

export default productController;
