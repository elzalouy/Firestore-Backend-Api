import { Request, Response } from "express";
import winston from "winston";
import UserControllter from "../../controllers/UserController";
import config from "config";
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
      if (result?.error) return res.status(400).send(result.error);
      return res.send(result);
    } catch (error) {
      winston.error({ createUserRouterError: error });
    }
  }
  static async savePaymentId(req: Request, res: Response) {
    try {
      let status = req.query.status?.toString();
      if (status !== "failed") {
        let userId = req.query.userId?.toString() ?? "";
        let id = req.query.id?.toString() ?? "";
        let index = req.query.index?.toString()
          ? parseInt(req.query.index?.toString())
          : 0;
        let result = await UserControllter.__savePaymentId(userId, id, index);
        if (result?.writeTime)
          return res.redirect(
            `${config.get("front_end_url")}/status?status=success`
          );
      }
      return res.redirect(
        `${config.get("front_end_url")}/status?status=failed`
      );
    } catch (error) {
      winston.error({ createUserRouterError: error });
    }
  }
}
