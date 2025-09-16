import pool from "../../db/pool.js";

class Product {
  constructor() {}

  // == Create ==
  async add(productId, productName, price) {
    const { rows } = await pool.query(
      `INSERT INTO product (product_id, product_name, price) 
      VALUES ($1, $2, $3)
      RETURNING product_id, product_name, price`,
      [productId, productName, price]
    );
    return rows;
  }

  // == Read ==
  // == Get all ==
  async getAll() {
    const { rows } = await pool.query(
      "SELECT product_id, product_name, price FROM product"
    );
    return rows;
  }

  // == Search by partial match to product name ==
  async findByPartialMatch(productName) {
    const { rows } = await pool.query(
      `SELECT product_id, product_name, price
        FROM product
        WHERE product_name ILIKE $1`,
      [`%${productName}%`]
    );
    return rows;
  }

  // == Seach by price range ==
  async findByPriceRange(min, max) {
    const { rows } = await pool.query(
      `SELECT product_id, product_name, price
        FROM product
        WHERE price >= $1 AND price <= $2`,
      [min, max]
    );
    return rows;
  }

  // == Update ==
  async update(productId, productName, price) {
    const { rows } = await pool.query(
      `UPDATE product
            SET product_name = $1,
                price = $2
            WHERE product_id = $3
            RETURNING product_id, product_name, price`,
      [productName, price, productId]
    );
    return rows;
  }

  // == Delete ==
  async delete(productId) {
    const { rows } = await pool.query(
      `DELETE FROM product
        WHERE product_id = $1
        RETURNING *`,
      [productId]
    );
    return rows;
  }
}

export default Product;
