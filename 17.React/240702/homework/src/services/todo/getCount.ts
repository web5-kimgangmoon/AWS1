import { Request, Response } from "express";
import { Todo, sequelize } from "../../models/sequelizeDB";
import { send } from "process";

const getCount = async (req: Request, res: Response) => {
  try {
    let completeCount = await Todo.findAll({
      attributes: [
        "isComplete",
        [sequelize.fn("COUNT", sequelize.col("Todo.id")), "CNT"],
      ],
      where: { deletedAt: null },
      group: ["isComplete"],
      order: [["isComplete", "DESC"]],
      raw: true,
    });
    // let allRows = await Todo.findAll({ where: { deletedAt: null } });
    const sendArr = [];
    if (completeCount.length == 0) {
      sendArr.push(
        ...[
          { isComplete: true, CNT: 0 },
          { isComplete: false, CNT: 0 },
        ]
      );
    } else if (completeCount.length < 2) {
      sendArr[0] = completeCount[0]?.isComplete
        ? completeCount[0]
        : { isComplete: true, CNT: 0 };
      sendArr[1] = completeCount[0]?.isComplete
        ? { isComplete: false, CNT: 0 }
        : completeCount[0];
    } else {
      sendArr.push(completeCount[0]);
      sendArr.push(completeCount[1]);
    }
    res.send(sendArr);
  } catch (err) {
    console.error(err);
  }
};

export default getCount;
