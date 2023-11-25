import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/database.js";
import cors from 'cors'
import { mountRoutes } from "./routes/index.js";

// Load environment variables
dotenv.config({ path: ".env" });
const port = process.env.PORT || 3000;

const app = express();
app.use(cors())

// Connect to Database
dbConnection();

app.use(express.json()); // Body parser middleware


mountRoutes(app);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
