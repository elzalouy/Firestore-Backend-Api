import { Request, Response } from "express";
import winston from "winston";
import UserControllter from "../../controllers/UserController";

export default class UserRouter {
  static async getUsers(req: Request, res: Response) {
    try {
      let getResult = await UserControllter.__getUsers();
      res.status(200).send(getResult);
    } catch (error) {
      winston.error({ getUsersRouterError: error });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      let createResult = await UserControllter.__createUser({
        name: req.body.name,
        email: req.body.email,
      });
      return res.status(200).send(createResult);
    } catch (error) {
      winston.error({ createUserRouterError: error });
    }
  }
  static async deleteUser(req: Request, res: Response) {
    try {
      let deleteResult = await UserControllter.__deleteUser(req.params.id);
      if (deleteResult) return res.send(deleteResult);
    } catch (error) {
      winston.error({ deleteUserRouterError: error });
    }
  }
  static async updateUser() {
    try {
    } catch (error) {}
  }
}
