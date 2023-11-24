import { check } from "express-validator";
import validatorMiddleware from "../../middleWare/validatorMiddleWare.js";
import slugify from "slugify";
import User from "../../models/userModels.js";

export const signupValidator = [
  check("firstName").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("lastName").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("phone")
    .optional()
    .isMobilePhone("ar-LB")
    .withMessage("Invalid phone number"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("User already exists");
      }
      return true; // Return a successful validation
    }),
  check("password")
    .notEmpty()
    .withMessage("pass required")
    .isLength({ min: 6 })
    .withMessage("too short password"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("required password confirm")
    .custom((pass, { req }) => {
      if (pass !== req.body.password) {
        throw new Error("password not match");
      }
      return true;
    }),
  validatorMiddleware,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .notEmpty()
    .withMessage("pass required")
    .isLength({ min: 6 })
    .withMessage("too short password"),
  validatorMiddleware,
];
