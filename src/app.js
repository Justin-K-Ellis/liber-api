import express from "express";
import dbInitializer from "../db/initDB.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/init/db", dbInitializer);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
