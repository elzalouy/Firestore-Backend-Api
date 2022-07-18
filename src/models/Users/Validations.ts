import { IUser } from "../../interfaces/User";
import joi from "joi";

let user = joi.object({
  name: joi.string().min(2).max(32).required(),
  email: joi.string().email().required(),
});

export { user };
export const createUser = (user: IUser) => {};
export const updateUser = (user: IUser) => {};
