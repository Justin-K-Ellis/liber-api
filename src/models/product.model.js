import pool from "../../db/pool.js";

class Product {
  constructor() {}

  // == Create ==
  async add(productId, productName, price) {
    await pool.query(
      "INSERT INTO product (product_id, product_name, price) VALUES ($1, $2, $3)",
      [productId, productName, price]
    );
  }

  // == Read ==
  async getAll() {
    const { rows } = await pool.query(
      "SELECT product_id, product_name, price FROM product"
    );
    return rows;
  }
}

export default Product;
