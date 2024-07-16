import mongoose, { Document, Schema } from 'mongoose';

interface Goal {
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
  goals: Goal[]; // Usar diretamente a interface Goal aqui
}

const GoalSchema = new Schema({
  goal: { type: String, required: true },
  value: { type: String, required: true },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  balance: { type: String, default: '0' }, // Valor inicial de balance
  image: { type: String },
  goals: { type: [GoalSchema], default: [] }, // Utilizar o esquema GoalSchema aqui
});

export const User = mongoose.model<User>('User', UserSchema);
export default User

