import { Schema, model } from "mongoose";

export const User = model(
  "User",
  new Schema(
    {
      email: { type: String, required: true, unique: true },
      passwordHash: { type: String, required: true },
      fullName: { type: String, required: true }
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
  )
);
