import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string | number;
  confirmPassword: string | number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
});

export const User = mongoose.model<User>("User", UserSchema);
