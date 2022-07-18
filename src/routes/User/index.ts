import { Router } from "express";
import UserRouter from "./UserRouter";

const router = Router();

router.get("/getUsers", UserRouter.getUsers);
router.post("/addUser", UserRouter.createUser);
router.delete("/deleteUser/:id", UserRouter.deleteUser);
router.put("/updateUser", UserRouter.updateUser);

export default router;
