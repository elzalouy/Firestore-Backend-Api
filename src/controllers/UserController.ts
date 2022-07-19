import winston from "winston";
import { IUser } from "../interfaces/User";
import User from "../models/Users/Schema";

export default class UserControllter {
  static async __createUser(user: IUser) {
    try {
      let userDoc = new User(user.name, user.email);
      return await userDoc.__save();
    } catch (error) {
      winston.error({ __createUserControllerError: error });
    }
  }

  static async __getUsers() {
    try {
      let users = await User.__getAllUsers();
      return users;
    } catch (error) {
      winston.error({ __getAllUsersControllerError: error });
    }
  }
  static async __deleteUser(id: string) {
    try {
      let result = await User.__deleteUser(id);
      if (result) return result;
    } catch (error) {
      winston.error({ __deleteUserControllerError: error });
    }
  }
}
