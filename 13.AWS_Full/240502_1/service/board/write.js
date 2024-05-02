import { Board, Category } from "../../models/index.js";

export default async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.body.CategoryId },
    });
    const board = await Board.create(req.body);
    category.addBoard(board);
    res.json(board);
  } catch (err) {
    console.error(err);
    res.send("error");
  }
};
