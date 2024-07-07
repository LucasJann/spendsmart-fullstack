import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user";
import bcrypt from "bcryptjs";

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
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      balance: "0",
    });

    const emailFounder = await User.findOne({ email: user.email });

    if (emailFounder !== null) {
      return res.status(422).json({
        errorMessage: "E-mail already exists",
        path: "email",
      });
    }
    await user.save();
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    console.error(err);
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
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({
        errorMessage: "User not found",
        path: "email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(422).json({
        errorMessage: "Invalid Password",
        path: "password",
      });
    }

    return res
      .status(200)
      .json({ message: "Login successful", loadedUser: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  const user = req.params.user;
  console.log("Received request for user balance:", user);
  try {
    const userData = await User.findOne({ email: user });
    console.log(userData)
    if (userData) {
      let balanceValue = userData.balance;
      if (balanceValue === null) {
        balanceValue = 0;
      }
      return res.status(200).json({ balance: balanceValue });
    }
    return res.status(404).json({ errorMessage: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const postBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user;
    const balanceValue = req.body.balance;
    const result = await User.updateOne(
      { email: user },
      { $set: { balance: balanceValue } }
    );
    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "Balance updated successfully" });
    } else {
      return res.status(404).json({ errorMessage: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};
