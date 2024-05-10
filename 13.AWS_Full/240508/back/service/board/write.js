import { Board, Category } from "../../models/index.js";

export default async (req, res) => {
  try {
    console.log(req.body);
    if (!req.user) throw new Error("not logged in");
    const category = await Category.findOne({
      where: { id: req.body.categoryId },
    });
    console.log(req.body);
    // const board = await Board.create(req.body);
    // category.addBoard(board);
    // req.user.addBoard(board);
    res.json(req.body);
  } catch (err) {
    console.error(err);
    res.send("error");
  }
};
