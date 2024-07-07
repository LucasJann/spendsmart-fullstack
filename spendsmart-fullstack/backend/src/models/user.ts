import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string | number;
  balance: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  balance: { type: Number },
});

export const User = mongoose.model<User>("User", UserSchema);
