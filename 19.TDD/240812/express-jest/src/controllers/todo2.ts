import { Router, Request, Response } from "express";
import { add, deleteTodo, getList, patchTodo } from "../services/todo2";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const todo = add(req.body.title);
    res.status(201).json(todo);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(`${error}`);
    res.status(400).json({ errorMessage: err.message });
  }
});

router.get("/", (req: Request, res: Response) => {
  try {
    const todo = getList();
    res.status(200).json(todo);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(`${error}`);
    res.status(400).json({ errorMessage: err.message });
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  try {
    const todo = deleteTodo(+req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(`${error}`);
    res.status(204).json({ errorMessage: err.message });
  }
});

router.patch("/", (req: Request, res: Response) => {
  try {
    const todo = patchTodo(req.body);
    res.status(200).json(todo);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(`${error}`);
    res.status(202).json({ errorMessage: err.message });
  }
});

export default router;
