import { Request, Response } from "express";
import { Todo } from "../../models/sequelizeDB";
import checkId from "./checkId";

const deleteTodo = async (req: Request, res: Response) => {
  try {
    if (await checkId(req.body.id, res)) return;
    Todo.update(
      { deletedAt: new Date(Date.now()) },
      { where: { id: req.body.id } }
    );
    res.send("that's complete! good job!");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};

export default deleteTodo;
