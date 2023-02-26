import { Router } from "express";
import UserRouter from "./UserRouter";

const router = Router();

router.post("/addSubscriber", UserRouter.addSubscriber);
router.get("/getAllSubscribers", UserRouter.getAllSubscribers);

export default router;