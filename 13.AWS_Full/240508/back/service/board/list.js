import { Board, Category, User } from "../../models/index.js";

export default async (req, res) => {
  try {
    const list = await Board.findAll({
      include: [
        {
          model: Category,
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          include: [
            {
              model: Category,
              as: "category",
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
              },
            },
            {
              model: Category,
              as: "categories",
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
              },
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.send("error");
  }
};
