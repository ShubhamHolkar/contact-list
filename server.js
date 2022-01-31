// index.js

/**
 * Required External Modules
 */

import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import verifyToken from "./backend/config/verify-token.js";
import userRoutes from "./backend/routes/userRoute.js";
import contactRoutes from "./backend/routes/contactRoute.js";

// const userRoutes = require('./backend/routes/userRoute.js');

/**
 * dotenv config
 */

dotenv.config();
/**
 * App Variables
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

let port;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
} else {
  port = process.env.PORT || 8000;
}

/**
 * Routes Definitions
 */

//Public routes
app.use("/api/auth", userRoutes);

//Private routes
//checking token before getting to contactRoutes
app.use("/api/contact", verifyToken, contactRoutes);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
