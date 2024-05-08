// 제목
// 카테고리(카테고리 id로 찾기)
// 생성일
// 갱신일은 없는듯?
// // 작성자(유저 테이블이 필요)
// 조회수
// // 댓글수(댓글테이블은 나중에)
// // 추천수(추천테이블이 필요(userId, boardId)
// 내용

import { Board, Category } from "../../models/index.js";

export default async (req, res) => {
  try {
    const board = await Board.findOne({
      attributes: ["title", "createdAt", "looks", "updatedAt"],
      include: [
        {
          model: Category,
          attributes: { exclude: ["createdAt", "deletedAt", "updatedAt"] },
          include: [
            {
              model: Category,
              as: "categories",
              attributes: { exclude: ["createdAt", "deletedAt", "updatedAt"] },
            },
            {
              model: Category,
              as: "category",
              attributes: { exclude: ["createdAt", "deletedAt", "updatedAt"] },
            },
          ],
        },
      ],
      where: {
        id: Number(req.body.id),
      },
    });
    res.json(board);
  } catch (err) {}
};
