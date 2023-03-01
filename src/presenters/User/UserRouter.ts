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
      const subscriber = req.body.subscriber;

      let result = await UserControllter.__createUser(user, subscriber);
      if (result?.error)
        return res.status(400).send("Phone number is already existed");
      return res.send(result?.value);
    } catch (error) {
      winston.error({ createUserRouterError: error });
    }
  }
}
