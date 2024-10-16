import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

import fs from "fs";
import path from "path";
import User from "../models/user";
import bcrypt from "bcryptjs";

interface ValidationErrorProps {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

const clearImage = (filePath: string) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.error(err));
};

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
      balance: req.body.initialBalance,
      goals: [],
    });

    const emailFounder = await User.findOne({ email: user.email });

    if (emailFounder !== null) {
      return res.status(422).json({
        errorMessage: "E-mail already exists",
        path: "email",
      });
    }
    await user.save();
    return res.status(201).json({ message: "User created!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
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
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  const user = req.params.user;

  try {
    const userData = await User.findOne({ email: user });
    if (userData) {
      let balanceValue = userData.balance;

      if (balanceValue === null) {
        balanceValue = "R$ 0,00";
      }
      return res.status(200).json({ balance: balanceValue });
    }
    return res.status(404).json({ errorMessage: "User not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
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
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const patchBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const value = req.body;
  const user = req.params.user;
  try {
    const userData = await User.findOne({ email: user });
    const parsedBalance = Number(userData.balance);
    let newValue = 0;

    if ("expenseValue" in value) {
      const parsedValue = Number(value.expenseValue);
      newValue = parsedBalance - parsedValue;
    } else {
      const parsedValue = Number(value.incomeValue);
      newValue = parsedBalance + parsedValue;
    }
    const newBalance = String(newValue);

    await User.updateOne({ email: user }, { $set: { balance: newBalance } });
    return res.status(201).json({ message: "Balance Updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const getImage = async (req: Request, res: Response) => {
  const user = req.path.split("profile/")[1];

  try {
    const result = await User.findOne({ email: user });
    const image = result?.image;
    const name = result?.name;
    const lastName = result?.lastName;
    return res.status(201).json({ image: image, name, lastName });
  } catch (err) {
    console.error(err);
  }
};

export const postImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const user = req.params.user;
  const imagePath = req.file.path;
  const profileImagePath = req.body.profileImage;

  try {
    const loggedUser = await User.findOne({ email: user });
    const userImage = loggedUser.image?.split("src\\")[1];
    await User.updateOne({ email: user }, { $set: { image: imagePath } });

    clearImage(userImage);
    clearImage(profileImagePath);
    return res.status(200).json({ path: imagePath });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const deleteImage = (req: Request, res: Response) => {
  const image = req.body.image;
  const selectedImage = req.body.selectedImage;
  try {
    clearImage(image || selectedImage);
  } catch (err) {
    console.error(err);
  }
};

export const imageChanged = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const user = req.params.user;
  const newImage = req.file.path;
  const currentImage = req.body.profileImage;

  if (currentImage.includes("profilepic.jpg")) {
    return res.status(201).json({ path: newImage });
  }

  try {
    const userLogged = await User.findOne({ email: user });
    const splittedUserImage = userLogged.image.split("images\\")[1];
    const splittedCurrentImage = currentImage.split("images/")[1];
    if (splittedUserImage !== splittedCurrentImage) {
      clearImage(currentImage);
      return res.status(201).json({ path: newImage });
    } else {
      return res.status(201).json({ path: newImage });
    }
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const getGoals = async (req: Request, res: Response) => {
  const user = req.params.user;

  try {
    const result = await User.findOne({ email: user });
    return res
      .status(200)
      .json({ data: result.goals, balance: result.balance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const postGoals = async (req: Request, res: Response) => {
  const userEmail = req.params.user;
  const goalData = req.body;

  try {
    await User.updateOne({ email: userEmail }, { $push: { goals: goalData } });
    return res.status(200).json({ message: "Goal added successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  const _id = req.body._id;
  const user = req.body.email;
  try {
    const userLogged = await User.findOne({ email: user });
    if (!userLogged) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    userLogged.goals = userLogged.goals.filter(
      (item: any) => item._id.toString() !== _id
    );
    await userLogged.save();
    return res.status(200).json({ message: "Goal removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const getItems = async (req: Request, res: Response) => {
  const email = req.params.user;

  try {
    const user = await User.findOne({ email: email });
    const items = user.items;
    return res.status(201).json({ message: "Items fetched", items: items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const postItem = async (req: Request, res: Response) => {
  const email = req.params.user;
  const item = req.body;

  try {
    await User.updateOne({ email: email }, { $push: { items: item } });
    return res.status(201).json({ message: "Item added" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};
