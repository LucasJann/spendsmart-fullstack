import { body } from "express-validator";
import { User } from "../models/user";
import { Router } from "express";
import { Register, Login } from "../controllers/admin";
import bcrypt from 'bcryptjs'

const router = Router();

router.post(
  "/",
  [
    body(
      "name",
      "Please enter a name using only letters and between 2 to 32 characters"
    )
      .isString()
      .isLength({ min: 2, max: 32 })
      .trim(),
    body(
      "lastName",
      "Please enter a last name using only letters and between 2 to 32 characters"
    )
      .isString()
      .isLength({ min: 2, max: 32 }),
    body("email", "Please enter a valid email address")
      .isEmail()
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .trim()
      .isLength({ min: 5 })
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
    body("confirmPassword")
      .trim()
      .isLength({ min: 5 })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  Register
);
router.post(
  "/login",
  [
    body("email", "Please enter a valid E-mail")
      .trim()
      .isLength({ min: 7 })
      .custom(async (value) => {
        await User.findOne({ email: value }).then((user) => {
          if (user === null) {
            throw new Error("E-mail not Found");
          }
        });
      }),
    body("password", "Password can't be empty or lesser than 2 characters")
      .trim()
      .isLength({ min: 2, max: 32 })
      // .custom(async (value) => {
      //   await User.findOne({ password: value }).then((user) => {
      //     if (user?.password !== value) {
      //       throw new Error("Password incorrect");
      //     }
      //   });
      // }),
  ],
  Login
);

export default router;
