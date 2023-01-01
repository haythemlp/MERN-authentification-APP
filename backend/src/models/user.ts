import { Document, model, Schema } from "mongoose";

/**
 * Type to model the User Schema for TypeScript.
 * @param firstname:string
 * @param lastname:string
 * @param email:string
 * @param password:string
 */

export type TUser = {
  firstname:string,
  lastname:string,
  email: string;
  password: string;
};

/**
 * TUser
 * @param firstname:string
 * @param lastname:string
 * @param email:string
 * @param password:string
 */

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

/**
 * TUser
 * @param firstname:string
 * @param lastname:string
 * @param email:string
 * @param password:string
 */

const User = model<IUser>("User", userSchema);

export default User;