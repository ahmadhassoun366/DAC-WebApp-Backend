import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/database.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config({ path: ".env" });
const port = process.env.PORT || 3000;

const app = express();

// Connect to Database
dbConnection();

app.use(express.json()); // Body parser middleware

app.use("/auth", authRoutes);

// app.use("/api", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
