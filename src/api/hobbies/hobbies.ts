import * as Mongoose from "mongoose";

export interface IHobby extends Mongoose.Document {
  name: string;
  passionLevel: string;
  year: number;
  createdAt: Date;
  updateAt: Date;
}

export const HobbySchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    passionLevel: { type: String, required: true },
    year: { type: Number, required: true },
  },
  {
    timestamps: true
  }
);

export const HobbyModel = Mongoose.model<IHobby>("Hobbies", HobbySchema);
