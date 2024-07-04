import TodoComp from "./Todo";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import {
  useMutation,
  useQuery,
  UseMutateFunction,
  QueryFunction,
} from "@tanstack/react-query";
import { ITodo } from "../context/todo";

type getTodoListENUM = "getList" | "getCompleteList" | "getNotCompleteList";
export type countTy = { isComplete: boolean; CNT: number };

const TodoTransport = (): JSX.Element => {
  const getListKey = ["get", "todo", "list"];
  const getCountKey = ["get", "todo", "list", "count"];
  const getListFn = async ([action, page]: [number, number]): Promise<
    ITodo[] | undefined
  > => {
    try {
      const getServerAction: getTodoListENUM[] = [
        "getList",
        "getCompleteList",
        "getNotCompleteList",
      ];
      const { data }: { data: ITodo[] } = await axios({
        method: "get",
        url: `http://localhost:3080/api/todo/${getServerAction[action]}`,
        params: { page: page },
      });
      return data;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };
  const getCountFn = async (): Promise<
    [number, number, number] | undefined
  > => {
    try {
      const { data }: { data: [countTy, countTy] } = await axios({
        method: "get",
        url: "http://localhost:3080/api/todo/getCount",
      });
      return [data[0].CNT + data[1].CNT, data[0].CNT, data[1].CNT];
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const getListMutate: {
    mutate: UseMutateFunction<ITodo[] | undefined, Error, [number, number]>;
    data: ITodo[] | undefined;
    isError: boolean;
    isPending: boolean;
  } = useMutation<ITodo[] | undefined, Error, [number, number]>({
    mutationKey: getListKey,
    mutationFn: getListFn,
  });
  const getCountArrMutate: {
    mutate: UseMutateFunction<[number, number, number] | undefined, Error>;
    data: [number, number, number] | undefined;
    isPending: boolean;
  } = {
    ...useMutation<[number, number, number] | undefined, Error>({
      mutationKey: getCountKey,
      mutationFn: getCountFn,
    }),
  };
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <TodoComp
            getListMutate={getListMutate}
            getCountArrMutate={getCountArrMutate}
          />
        }
      />
      <Route
        path={":page"}
        element={
          <TodoComp
            getListMutate={getListMutate}
            getCountArrMutate={getCountArrMutate}
          />
        }
      />
    </Routes>
  );
};

export default TodoTransport;
