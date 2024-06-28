import { FC, useState } from "react";

interface IBoard {
  id: number;
  title: string;
  user: string;
  createdAt: Date;
  likeCount: number;
  disCount: number;
}

interface IRoot {
  // list:{IBoard}[];
}

const BoardContainer: FC<{}> = () => {
  const [list, setList] = useState<
    IBoard[]
    // IBoard의 배열과 같다.
  >([
    {
      id: 1,
      title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
      user: "하하",
      createdAt: new Date(),
      likeCount: 10,
      disCount: 10,
    },
    {
      id: 2,
      title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
      user: "하하",
      createdAt: new Date(),
      likeCount: 10,
      disCount: 10,
    },
    {
      id: 3,
      title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
      user: "하하",
      createdAt: new Date(),
      likeCount: 10,
      disCount: 10,
    },
  ]);
  return <Board list={list}></Board>;
};

const Board: FC<{
  list: Array<{
    id: number;
    title: string;
    user: string;
    createdAt: Date;
    likeCount: number;
    disCount: number;
  }>; //IBoard의 배열과 같다.
}> = ({ list }) => {
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
    </ul>
  );
};

const BoardRow: FC<{
  board: { [key: string]: string };
  isTitle?: boolean;
  isEven?: boolean;
}> = ({ board, isTitle = false, isEven = false }) => {
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

const BoardRowItem: FC<{
  board: {
    id: number;
    title: string;
    user: string;
    createdAt: Date;
    likeCount: number;
    disCount: number;
  };
  // IBoard와 같다
  isEven?: boolean;
}> = ({ board, isEven = false }) => {
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

export default BoardContainer;
