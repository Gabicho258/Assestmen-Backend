import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// import "dotenv/config";

import { listRouter, userRouter } from "./api/routes/index.js";

// config enviroment

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

//db connection

const dbConnection = process.env.DB_CONNECTION;
await mongoose.connect(dbConnection);

// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

/**
 * Express
 */
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.send("FAVPS API");
});
app.use("/auth", userRouter);
app.use("/api", listRouter);
const PORT = process.env.PORT || 5000;

// Launch server
app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
