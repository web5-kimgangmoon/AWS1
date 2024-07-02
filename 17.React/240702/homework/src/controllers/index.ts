import { Router, IRouter } from "express";
import todo from "./todo/todo";

const router: IRouter = Router();
router.use("/todo", todo);

export default router;
