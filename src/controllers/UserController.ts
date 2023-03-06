import winston from "winston";
import { IUser, Subscriber, Subscription } from "../interfaces/User";
import User from "../models/Users/Schema";

export default class UserControllter {
  static async __createUser(user: IUser, subscriber: Subscriber) {
    try {
      let newSubscription = new User({
        user: user,
        subscriber: subscriber,
      });
      let result = await newSubscription.__save();
      return result;
    } catch (error) {
      winston.error({ __createUserControllerError: error });
    }
  }
  static async __savePaymentId(
    userId: string,
    paymentId: string,
    subIndex: number
  ) {
    try {
      let result = await User.__savePaymentId(userId, paymentId, subIndex);
      return result;
    } catch (error) {
      winston.error({ __savePaymentIdError: error });
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
}
