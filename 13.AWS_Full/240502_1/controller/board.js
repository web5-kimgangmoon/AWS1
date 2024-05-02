import { Router } from "express";
import getList from "../service/board/list.js";
import writeList from "../service/board/write.js";
import scanList from "../service/board/scan.js";
const router = Router();

router.post("/list", getList);
router.post("/write", writeList);
router.post("/scan", scanList);

export default router;
