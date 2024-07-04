import { ITodo } from "../context/todo";
import { ChangeEvent, useEffect, MouseEvent } from "react";
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
  bgColor: [string, colorEnum];
  navigate: (address: string) => void;
  ChangeFilter(): void;
  getServerList(page: number): void;
  getCount(): void;
  addServerList(content: string, page: number): void;
  deleteServerList(id: number, page: number): void;
  updateServerList(id: number, content: string): void;
  completeServerList(id: number, page: number): void;
  writeAddContent({ target: { value } }: ChangeEvent<HTMLInputElement>): void;
  writeUdtContent({ target: { value } }: ChangeEvent<HTMLInputElement>): void;
  writeUdtId({ target: { value } }: ChangeEvent<HTMLInputElement>): void;
}

const Todo = ({
  ChangeFilter,
  bgColor,
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
  getCount,
  navigate,
}: IProps): JSX.Element => {
  let temp = useParams()?.page;
  temp = temp ? temp : "";
  let page: number;
  if (isNaN(+temp)) {
    page = 1;
  } else {
    if ((+temp - 1) * 10 > listCount) {
      page = 1;
    } else {
      page = +temp;
    }
  }
  useEffect(() => {
    getServerList(page);
    getCount();
  }, [page, filter]);
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
              completeServerList={() => completeServerList(item.id, page)}
              deleteServerList={() => deleteServerList(item.id, page)}
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
          <Button color="SKY" onClick={() => addServerList(addContent, page)}>
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
          <Link
            to={`/${page - 1}`}
            className={
              ButtonClassName +
              `${
                page - 1 < 1
                  ? "bg-gray-600"
                  : "bg-orange-200 hover:bg-orange-400 "
              }`
            }
            onClick={
              page - 1 < 1
                ? (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()
                : () => {}
            }
          >
            {"<"}
          </Link>

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
          {page * 10 < listCount ? (
            <Link
              to={`/${page + 1}`}
              className={ButtonClassName + "bg-orange-200 hover:bg-orange-400"}
            >
              {page + 1}
            </Link>
          ) : (
            ""
          )}
          {(page + 1) * 10 < listCount ? (
            <Link
              to={`/${page + 2}`}
              className={ButtonClassName + "bg-orange-200 hover:bg-orange-400"}
            >
              {page + 2}
            </Link>
          ) : (
            ""
          )}
          <Link
            to={`/${page + 1}`}
            className={
              ButtonClassName +
              `${
                page * 10 > listCount
                  ? "bg-gray-600"
                  : "bg-orange-200 hover:bg-orange-400 "
              }`
            }
            onClick={
              page * 10 > listCount
                ? (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()
                : () => {}
            }
          >
            {">"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Todo;
