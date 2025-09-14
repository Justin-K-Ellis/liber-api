import express from "express";
import productController from "./controllers/product.controller.js";

const router = express.Router();

router.use("/product", productController);

export default router;
