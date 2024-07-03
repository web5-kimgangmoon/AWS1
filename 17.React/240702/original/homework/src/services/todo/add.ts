import { Request, Response } from "express";
import { Todo } from "../../models/sequelizeDB";
import checkContent from "./checkContent";

const add = (req: Request, res: Response) => {
  if (checkContent(req.body.content, res)) return;
  Todo.create({ content: req.body.content }).then(() => {
    res.send("that's complete! good job!");
  });
};

export default add;
