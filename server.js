import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

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
