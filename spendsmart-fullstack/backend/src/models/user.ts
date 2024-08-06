import mongoose, { Document, Schema } from "mongoose";

interface Item {
  id: string;
  date: string;
  income?: string;
  expense?: string;
  category: string;
}

interface Goal {
  id: string;
  goal: string;
  value: string;
}

interface User extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  balance: string;
  image?: string;
  items: Item[];
  goals: Goal[];
}

const ItemSchema = new Schema({
  date: { type: String, required: true },
  income: { type: String },
  expense: { type: String },
  category: { type: String, required: true },
});

const GoalSchema = new Schema({
  goal: { type: String, required: true },
  value: { type: String, required: true },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: String, default: "0" },
  image: { type: String },
  items: { type: [ItemSchema], default: [] },
  goals: { type: [GoalSchema], default: [] },
});

export const User = mongoose.model<User>("User", UserSchema);
export default User;
