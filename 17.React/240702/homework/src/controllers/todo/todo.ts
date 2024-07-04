import { Router, IRouter } from "express";
import add from "../../services/todo/add";
import deleteTodo from "../../services/todo/delete";
import update from "../../services/todo/update";
import completeUpdate from "../../services/todo/completeUpdate";
import getList from "../../services/todo/getList";
import getCount from "../../services/todo/getCount";
import getCompleteList from "../../services/todo/getCompleteList";
import getNotCompleteList from "../../services/todo/getNotCompleteList";

const router: IRouter = Router();

router.post("/add", add);
router.post("/delete", deleteTodo);
router.post("/update", update);
router.post("/complete", completeUpdate);
router.get("/getList", getList);
router.get("/getCount", getCount);
router.get("/getCompleteList", getCompleteList);
router.get("/getNotCompleteList", getNotCompleteList);

export default router;
