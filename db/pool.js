import fs from "fs";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: fs.readFileSync(process.env.POSTGRES_PASSWORD_FILE, "utf8"),
  port: 5432,
});

export default pool;
