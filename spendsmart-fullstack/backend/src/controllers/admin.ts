import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

export const Register = async (req: Request, res: Response, next: NextFunction) => {
  const login = new User({
    email: 'lucas@gmail.com',
    password: '123',
    name: 'Lucas',
    lastName: 'Jan',
  })

  try {
    await login.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user." });
  }
};
