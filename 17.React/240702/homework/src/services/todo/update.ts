import { Request, Response } from "express";
import { Todo } from "../../models/sequelizeDB";
import checkContent from "./checkContent";
import checkId from "./checkId";

const update = async (req: Request, res: Response) => {
  try {
    if (checkContent(req.body.content, res)) return;
    if (await checkId(req.body.id, res)) return;
    Todo.update({ content: req.body.content }, { where: { id: req.body.id } });
    res.send("that's complete! good job!");
  } catch (err) {
    console.error(err);
  }
};

export default update;
