import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError  } from "express-validator";
import { User } from "../models/user";

interface CustomValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0] as CustomValidationError; 

    return res.status(422).json({
      errorMessage: firstError.msg,
      path: firstError.path
    });
  }

  try {
    const user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    console.log("error");
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const login = await User.findOne({ email });

  if (login) {
    return res.status(200).json({ loadedUser: login });
  } else {
    return console.log("User not found!");
  }
};
