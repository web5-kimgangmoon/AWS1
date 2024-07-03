import { Todo, sequelize } from "../../models/sequelizeDB";
import { Response } from "express";

const checkId = async (id: string, res: Response): Promise<boolean> => {
  try {
    const num = Number(id);
    if (isNaN(num)) {
      res.send("wrong type id");
      return true;
    }
    const lastId =
      (
        await Todo.findOne({
          attributes: [[sequelize.fn("MAX", sequelize.col("id")), "max"]],
          where: { deletedAt: null },
        })
      )?.get("max") || 1;
    if (num > Number(lastId) || num < 1) {
      res.send("id is over or under on limit!");
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    res.send(err);
    return true;
  }
};

export default checkId;
