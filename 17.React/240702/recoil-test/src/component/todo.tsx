import { ITodo } from "../context/todo";
import { ChangeEvent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button, { colorEnum, ButtonClassName } from "../button/Button";
import TodoItem from "./TodoItem";

export interface IProps {
  filter: string;
  listCount: number;
  list: ITodo[];
  addContent: string;
  udtContent: string;
  udtId: number;
  ChangeFilter(): void;
  getServerList(page: number): void;
  addServerList(content: string): void;
  deleteServerList(id: number): void;
  updateServerList(id: number, content: string): void;
  completeServerList(id: number): void;
  writeAddContent({ target: { value } }: ChangeEvent<HTMLInputElement>): void;
  writeUdtContent({ target: { value } }: ChangeEvent<HTMLInputElement>): void;
  writeUdtId({ target: { value } }: ChangeEvent<HTMLInputElement>): void;
}

const Todo = ({
  ChangeFilter,
  filter,
  listCount,
  list,
  addContent,
  udtId,
  udtContent,
  addServerList,
  writeAddContent,
  completeServerList,
  deleteServerList,
  getServerList,
  writeUdtContent,
  writeUdtId,
  updateServerList,
}: IProps): JSX.Element => {
  let page: number;
  if (isNaN((page = Number(useParams().page)))) {
    page = 1;
  }
  useEffect(() => {
    getServerList(page);
  }, [page]);
  const bgColor: [string, colorEnum] =
    filter === "all"
      ? ["bg-orange-100", "ORANGE"]
      : filter === "complete"
      ? ["bg-green-100", "GREEN"]
      : filter === "progress"
      ? ["bg-sky-100", "SKY"]
      : ["bg-white", "WHITE"];
  return (
    <div className="container mx-auto py-10 flex flex-col justify-center bg-gray-200 rounded-md">
      <div className="p-3 flex flex-col items-center bg-blue-500 rounded-t-lg">
        <div className="p-2">
          <Button color={bgColor[1]} onClick={ChangeFilter}>
            {`${filter}: ${listCount}`}
          </Button>
        </div>
        <h1 className="px-4 py-1 bg-sky-300 text-blue-700 rounded-lg shadow">
          {listCount}
        </h1>
      </div>
      <table className={`w-full table-fixed ${bgColor[0]}`}>
        <thead className="bg-gray-400">
          <tr>
            <th>No.</th>
            <th colSpan={2}>할 일</th>
            <th colSpan={3} className="text-left">
              진행여부
            </th>
          </tr>
        </thead>
        <tbody className="">
          {list.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              completeServerList={() => completeServerList(item.id)}
              deleteServerList={() => deleteServerList(item.id)}
              isComplete={item.isComplete}
              content={item.content}
            />
          ))}
        </tbody>
      </table>
      <div className="p-5">
        <div className="py-3 flex justify-center gap-x-4">
          <input
            className="px-3 grow"
            id="text"
            placeholder={"content"}
            onChange={writeAddContent}
            type="text"
          />
          <Button color="SKY" onClick={() => addServerList(addContent)}>
            추가
          </Button>
        </div>
      </div>
      <div className="p-5">
        <div className="py-3 flex justify-center gap-x-4">
          <input
            className="w-16 px-2"
            placeholder={"ID"}
            onChange={writeUdtId}
            type="number"
          />
          <input
            className="px-3 grow"
            placeholder={"content"}
            onChange={writeUdtContent}
            type="text"
          />
          <Button
            color="GREEN"
            onClick={() => updateServerList(udtId, udtContent)}
          >
            업데이트
          </Button>
        </div>
      </div>
      <div className="p-5">
        <div className="py-3 flex justify-center gap-x-4">
          {page - 2 > 0 ? (
            <Link
              to={`/${page - 2}`}
              className={ButtonClassName + "bg-orange-200 hover:bg-orange-400"}
            >
              {page - 2}
            </Link>
          ) : (
            ""
          )}
          {page - 1 > 0 ? (
            <Link
              to={`/${page - 1}`}
              className={ButtonClassName + "bg-orange-200 hover:bg-orange-400"}
            >
              {page - 1}
            </Link>
          ) : (
            ""
          )}
          <Link
            to={`/${page}`}
            className={ButtonClassName + "bg-orange-200 hover:bg-orange-400"}
          >
            {page}
          </Link>
          <Link
            to={`/${page + 1}`}
            className={ButtonClassName + "bg-orange-200 hover:bg-orange-400"}
          >
            {page + 1}
          </Link>
          <Link
            to={`/${page + 2}`}
            className={ButtonClassName + "bg-orange-200 hover:bg-orange-400"}
          >
            {page + 2}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Todo;
