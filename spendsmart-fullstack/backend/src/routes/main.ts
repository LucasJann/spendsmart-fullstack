import { body } from "express-validator";
import { Router } from "express";
import { Register, Login } from "../controllers/admin";

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
      .isAlphanumeric()
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
    body(
      "confirmPassword",
      "Please confirm your password"
    )
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  Register
);
router.post("/login", Login);

export default router;
