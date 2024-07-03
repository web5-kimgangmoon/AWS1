import { Todo, sequelize } from "../../models/sequelizeDB";
import { Response } from "express";

const checkId = async (id: string, res: Response): Promise<boolean> => {
  try {
    const num = Number(id);
    if (isNaN(num)) {
      console.log("wrong type id");
      res.send([]);
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
      console.log("id is over or under on limit!");
      res.send([]);
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    res.send([]);
    return true;
  }
};

export default checkId;
