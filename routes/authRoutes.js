import express from "express";
import {
    login,
    signup
} from "../controllers/authController.js";
 import {loginValidator, signupValidator } from "../utils/validator/authValidator.js";
//nested route
const router = express.Router();

//get and post on same path
router.route("/signup").post(signupValidator,signup);
router.route("/login").post(loginValidator,login);

export default router;
