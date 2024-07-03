import { Request, Response } from "express";
import { Todo } from "../../models/sequelizeDB";
import checkId from "./checkId";

const completeUpdate = async (req: Request, res: Response) => {
  try {
    if (await checkId(req.body.id, res)) return;
    const targetRow = await Todo.findOne({ where: { id: req.body.id } });
    Todo.update(
      { isComplete: !targetRow?.isComplete },
      { where: { id: req.body.id } }
    );
    res.send("that's complete! good job!");
  } catch (err) {
    console.error(err);
  }
};

export default completeUpdate;
