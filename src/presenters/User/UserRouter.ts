import { Request, Response } from "express";
import winston from "winston";
import UserControllter from "../../controllers/UserController";

export default class UserRouter {
  static async getAllSubscribers(req: Request, res: Response) {
    try {
      let subscribers = await UserControllter.__getUsers();
      return res.status(200).send({ subscribers: subscribers });
    } catch (error) {
      winston.error({ getAllSubscribersError: error });
    }
  }
  static async addSubscriber(req: Request, res: Response) {
    try {
      const user = req.body.user;
      const subscriper = req.body.subscriber;
      let result = await UserControllter.__createUser(user, subscriper);
      return res.send(result);
    } catch (error) {
      winston.error({ createUserRouterError: error });
    }
  }
}
