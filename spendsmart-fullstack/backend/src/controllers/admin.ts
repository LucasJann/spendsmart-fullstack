import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import { User } from "../models/user";

interface ValidationErrorProps {
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
  const firstError = errors.array()[0] as ValidationErrorProps;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMessage: firstError.msg,
      path: firstError.path,
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

    const emailFounder = await User.findOne({ email: user.email });

    if (emailFounder) {
      return res.status(422).json({
        errorMessage: "E-mail already exists",
        path: "email",
      });
    }

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
  const errors = validationResult(req);
  const firstError = errors.array()[0] as ValidationErrorProps;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMessage: firstError.msg,
      path: firstError.path,
    });
  }

  const email = req.body.email;
  const login = await User.findOne({ email });
  return res.status(200).json({ loadedUser: login });
};
