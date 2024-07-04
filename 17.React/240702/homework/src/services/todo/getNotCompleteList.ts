import { Request, Response } from "express";
import { Todo } from "../../models/sequelizeDB";

const getNotCompleteList = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) - 1;
    let targetList;
    if (isNaN(page) || page < 0) {
      targetList = await Todo.findAll({
        order: [["id", "DESC"]],
        where: { deletedAt: null, isComplete: false },
        limit: 10,
      });
    } else {
      targetList = await Todo.findAll({
        order: [["id", "DESC"]],
        where: { deletedAt: null, isComplete: false },
        offset: page * 10,
        limit: 10,
      });
    }
    res.send(targetList);
  } catch (err) {
    console.error(err);
  }
};

export default getNotCompleteList;
