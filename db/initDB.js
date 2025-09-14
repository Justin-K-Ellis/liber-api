import express from "express";
import pool from "./pool.js";

const dbInitializer = express.Router();

dbInitializer.get("/", async (_req, res) => {
  try {
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            product_id BIGINT,
            product_name TEXT,
            price INT
        )
        `
    );
    console.log("DB table created.");
    res.json({
      message: "DB table initialized.",
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message: "Something went wrong when initializing the database table.",
    });
  }
});

export default dbInitializer;
