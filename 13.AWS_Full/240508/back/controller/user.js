import { Router } from "express";

import login from "./../service/user/login.js";
import logout from "./../service/user/logout.js";
import regist from "./../service/user/regist.js";

const router = Router();

//regist
router.post("/regist", regist);

//login
router.post("/login", login);
//logout
router.post("/logout", logout);

export default router;
