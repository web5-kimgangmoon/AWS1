import { Router } from "express";
import board from "./board.js";
import user from "./user.js";

import checkLog from "../service/user/checkLog.js";

const router = Router();
router.use(checkLog);
router.use("/board", board);
router.use("/user", user);
export default router;

// export const temp1 = () => {};
// export const temp2 = () => {};
// export const temp3 = () => {};
// export const temp = () => {};
