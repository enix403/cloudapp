import { Document, Schema, Types, model } from "mongoose";

export interface IUser extends Document<Types.ObjectId> {
  email: string;
  passwordHash: string;
  fullName: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    fullName: { type: String, required: true },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform(doc, ret, options) {
        // Remove passwordHash from any JSON response
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

export const User = model("User", userSchema);
