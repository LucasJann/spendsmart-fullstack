import { body } from "express-validator";
import { User } from "../models/user";
import { Router } from "express";
import {
  Register,
  Login,
  deleteImage,
  imageChanged,
  getImage,
  getBalance,
  getItems,
  getGoals,
  postImage,
  postBalance,
  postItem,
  postGoals,
  deleteGoal,
  patchBalance,
} from "../controllers/admin";

const router = Router();
router.post(
  "/",
  [
    body("name", "Please enter a name between 2 to 32 characters")
      .isLength({ min: 2, max: 32 })
      .trim(),
    body(
      "lastName",
      "Please enter a last name between 2 to 32 characters"
    ).isLength({ min: 2, max: 32 }),
    body("email", "Please enter a valid email address")
      .isEmail()
      .custom((value) => {
        const domains = [
          "gmail.com",
          "hotmail.com",
          "yahoo.com",
          "outlook.com",
          "icloud.com",
          "aol.com",
          "mail.ru",
          "yandex.ru",
        ];

        let validator = null;
        const splitedValue = value.split("@");
        const newValue = splitedValue[1];

        for (const str in domains) {
          const domainString = domains[str];
          const validation = domainString === newValue ? true : false;

          if (validation) {
            validator = validation;
          }
        }

        if (!validator) {
          throw new Error(`The domain ${splitedValue[1]}, is not acceptable`);
        }
        return true;
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .trim()
      .isLength({ min: 5 })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
    body("confirmPassword", "Passwords have to match!")
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

router.get("/balance/:user", getBalance);
router.post("/balance", postBalance);
router.patch("/balance/calcNewBalance/:user", patchBalance);

router.post(
  "/login",
  [
    body("email", "Please enter a valid e-mail")
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
      .isLength({ min: 2, max: 32 }),
  ],
  Login
);

router.get("/profile/:user", getImage);
router.post("/profile/:user", postImage);
router.post("/profile/image/:user", imageChanged);
router.delete("/profile/clearImage", deleteImage);

router.get("/finances/:user", getItems);
router.post("/finances/:user", postItem);

router.get("/goalsPage/:user", getGoals);
router.post("/goalsPage/:user", postGoals);
router.delete("/goalsPage/deleteGoal", deleteGoal);

export default router;
