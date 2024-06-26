import { FC } from "react";
// import "./board.css";

export interface IProps {
  list: IBoard[];
}

const Board: FC<IProps> = ({ list }) => {
  return (
    <ul>
      <BoardRowTitle
        title={{
          id: "No.",
          title: "제목",
          user: "작성자",
          createdAt: "작성일자",
          count: "추천",
        }}
      />
      {list.map((board: IBoard, idx: number) => {
        return (
          <BoardRowItem
            key={idx}
            board={{ ...board, id: idx + 1 }}
            isEven={(idx + 1) % 2 == 0}
          />
        );
      })}
      {/* <BoardRowItem
        board={{
          id: 1,
          title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
          user: "하하",
          createdAt: new Date(),
          likeCount: 10,
          disCount: 10,
        }}
      />
      <BoardRowItem
        board={{
          id: 1,
          title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
          user: "하하",
          createdAt: new Date(),
          likeCount: 10,
          disCount: 10,
        }}
        isEven={true}
      />
      <BoardRowItem
        board={{
          id: 1,
          title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
          user: "하하",
          createdAt: new Date(),
          likeCount: 10,
          disCount: 10,
        }}
      />
      <BoardRowItem
        board={{
          id: 1,
          title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
          user: "하하",
          createdAt: new Date(),
          likeCount: 10,
          disCount: 10,
        }}
        isEven={true}
      />
      <BoardRowItem
        board={{
          id: 1,
          title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
          user: "하하",
          createdAt: new Date(),
          likeCount: 10,
          disCount: 10,
        }} */}
      {/* /> */}
    </ul>
  );
};

export interface IBoard {
  id: number;
  title: string;
  user: string;
  createdAt: Date;
  likeCount: number;
  disCount: number;
}

const BoardRow: FC<{
  board: { [key: string]: string };
  isTitle?: boolean;
  isEven?: boolean;
}> = ({ board, isTitle = false, isEven = false }) =>
  //   id,
  //   title,
  //   writer,
  //   createdAt,
  //   likeCount,
  //   disCount,
  {
    return (
      <li
        className={`border-b border-black ${isEven ? "bg-gray-200" : ""} ${
          isTitle ? "bg-gray-400" : ""
        }`}
      >
        <ul className="flex">
          <li className="px-2 py-1 w-12 text-center border-r border-dotted border-gray-500">
            {board.id}
          </li>
          <li
            className={`px-2 py-1 flex-1 ${
              isTitle ? "text-center" : ""
            } truncate border-r border-dotted border-gray-500`}
          >
            {board.title}
          </li>
          <li className="px-2 py-1 w-20 text-center border-r border-dotted border-gray-500">
            {board.user}
          </li>
          {/* <li>{board.createdAt}</li> */}
          <li className="px-2 py-1 w-16 text-center">{board.count}</li>
        </ul>
      </li>
    );
  };

const BoardRowTitle: FC<{
  title: { [key: string]: string };
}> = ({ title }) => <BoardRow board={title} isTitle={true} />;

const BoardRowItem: FC<{ board: IBoard; isEven?: boolean }> = ({
  board,
  isEven = false,
}) => {
  return (
    <BoardRow
      board={{
        id: board.id.toString(),
        title: board.title,
        user: board.user,
        createdAt: board.createdAt.toLocaleString(),
        count: (board.likeCount - board.disCount).toString(),
      }}
      isEven={isEven}
    />
  );
};

{
  /* const BoardRowItem:FC<{board:IBoard}> = () => {

} */
}

export default Board;
