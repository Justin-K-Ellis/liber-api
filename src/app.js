import express from "express";
import dbInitializer from "../db/initDB.js";
import router from "./router.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/init/db", dbInitializer);
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
