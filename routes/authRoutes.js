import express from "express";
import { signup, login } from "../controllers/authController.js";

// Create a router
const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Export the router
export default router;
