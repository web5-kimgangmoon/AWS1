import { Request, Response } from "express";
import { Todo } from "../../models/sequelizeDB";
import checkId from "./checkId";

const deleteTodo = async (req: Request, res: Response) => {
  try {
    if (await checkId(req.body.id, res)) return;
    const deletedInstance = await Todo.update(
      { deletedAt: new Date(Date.now()) },
      { where: { id: req.body.id } }
    );
    res.send(deletedInstance);
  } catch (err) {
    console.error(err);
    res.status(500).send([]);
  }
};

export default deleteTodo;
