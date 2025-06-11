import mongoose, { Document, Schema } from "mongoose";

interface Item {
  id: string;
  alt: string
  date: string;
  income?: string;
  expense?: string;
  category: string;
  iconPath: string;
}

interface Goal {
  id: string;
  goal: string;
  value: string;
}

interface User extends Document {
  name: string;
  token: string;
  email: string;
  items: Item[];
  image?: string;
  goals: Goal[];
  balance: string;
  lastName: string;
  password: string;
}

const ItemSchema = new Schema({
  alt: { type: String, required: true },
  date: { type: String, required: true },
  income: { type: String },
  expense: { type: String },
  category: { type: String, required: true },
  iconPath: { type: String, required: true },
});

const GoalSchema = new Schema({
  goal: { type: String, required: true },
  value: { type: String, required: true },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  token: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  items: { type: [ItemSchema], default: [] },
  goals: { type: [GoalSchema], default: [] },
  balance: { type: String, default: "0" },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<User>("User", UserSchema);
export default User;
