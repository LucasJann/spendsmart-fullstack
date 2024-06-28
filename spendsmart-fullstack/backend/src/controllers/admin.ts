import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
