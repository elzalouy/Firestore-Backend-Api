import { Request, Response } from "express";
export default class UserRouter {
    static getAllSubscribers(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static addSubscriber(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
