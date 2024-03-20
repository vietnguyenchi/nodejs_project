import express from "express"
import mongoose from "mongoose";
import router from "./routes/index.js";
import dotenv from "dotenv";
const app = express()
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})