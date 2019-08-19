import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
const Schema = Mongoose.Schema;

export interface IUser extends Mongoose.Document {
  name: string;
  hobbies: Array<object>;
  password: string;
  createdAt: Date;
  updateAt: Date;
}

export const UserSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    hobbies: [{
      type: Schema.Types.ObjectId,
      ref: 'Hobbies',
    }],
  },
  {
    timestamps: true
  }
);

export const UserModel = Mongoose.model<IUser>("User", UserSchema);