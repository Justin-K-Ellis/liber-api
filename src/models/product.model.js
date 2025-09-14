import pool from "../../db/pool.js";

class Product {
  constructor() {}

  async getAll() {
    const { rows } = await pool.query(
      "SELECT product_id, product_name, price FROM product"
    );
    return rows;
  }
}

export default Product;
