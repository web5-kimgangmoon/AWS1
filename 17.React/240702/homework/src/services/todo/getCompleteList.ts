import { Request, Response } from "express";
import { Todo } from "../../models/sequelizeDB";

const getCompleteList = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) - 1;
    let targetList;
    if (isNaN(page) || page < 0) {
      targetList = await Todo.findAll({
        order: [["id", "DESC"]],
        where: { deletedAt: null, isComplete: true },
        limit: 10,
      });
    } else {
      targetList = await Todo.findAll({
        order: [["id", "DESC"]],
        where: { deletedAt: null, isComplete: true },
        offset: page * 10,
        limit: 10,
      });
    }

    res.send(targetList);
  } catch (err) {
    console.error(err);
  }
};

export default getCompleteList;
