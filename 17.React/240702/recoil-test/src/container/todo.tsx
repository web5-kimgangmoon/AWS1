import { useState, useEffect, ChangeEvent, useMemo, useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  todoFilter,
  todoListState,
  todoCountState,
  ITodo,
} from "../context/todo";
import axios from "axios";
import TodoComp from "../component/todo";
import { useNavigate, useParams } from "react-router-dom";
import { colorENUM } from "../button/Button";
import { UseMutateFunction, useQuery } from "@tanstack/react-query";

interface IProps {
  getListMutate: {
    mutate: UseMutateFunction<ITodo[] | undefined, Error, [number, number]>;
    data: ITodo[] | undefined;
    isPending: boolean;
  };
  getCountArrMutate: {
    mutate: UseMutateFunction<[number, number, number] | undefined, Error>;
    data: [number, number, number] | undefined;
    isPending: boolean;
  };
}

const Todo = ({ getListMutate, getCountArrMutate }: IProps): JSX.Element => {
  const navigate = useNavigate();
  const [addContent, setAddContent] = useState<string>("");
  const [udtContent, setUdtContent] = useState<string>("");
  const [udtId, setUdtId] = useState<number>(0);
  let [allList, setList] = useRecoilState(todoListState);
  const [filter, setFilter] = useRecoilState(todoFilter);
  const [listCountArr, setTodoCount] = useRecoilState(todoCountState);
  const [page, setPage] = useState<number>(1);
  let listCount: number;
  let bgColor: [string, colorENUM];
  let getServerAction: number;
  switch (filter) {
    case "all":
      listCount = 0;
      bgColor = ["bg-orange-100", "ORANGE"];
      // getServerAction = "getList";
      getServerAction = 0;
      break;
    case "complete":
      listCount = 1;
      bgColor = ["bg-green-100", "GREEN"];
      // getServerAction = "getCompleteList";
      getServerAction = 1;
      break;
    case "progress":
    default:
      listCount = 2;
      bgColor = ["bg-sky-100", "SKY"];
      // getServerAction = "getNotCompleteList";
      getServerAction = 2;
  }
  const ChangeFilter = () => {
    switch (filter) {
      case "complete":
        setFilter("progress");
        break;
      case "progress":
        setFilter("all");
        break;
      case "all":
      default:
        setFilter("complete");
    }
  };
  const getTargetArrIDX = (list: ITodo[], id: number): [ITodo[], number] => {
    let index: number = 0;
    let temp = list.map((item, idx) => {
      if (item.id === id) {
        index = idx;
        return { ...item, isComplete: !item.isComplete };
      }
      return item;
    });
    return [temp, index];
  };
  const writeAddContent = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setAddContent(value);
  };
  const writeUdtContent = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUdtContent(value);
  };
  const writeUdtId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const valueNum = Number(value);
    if (!isNaN(valueNum)) {
      setUdtId(valueNum);
    }
  };
  const getCount = async () => {
    try {
      await getCountArrMutate.mutate();
      setTodoCount((current) =>
        getCountArrMutate.data ? getCountArrMutate.data : current
      );
    } catch (err) {
      console.error(err);
    }
  };
  // getListMutate.mutate([getServerAction, page]);
  const getServerList = async (page: number) => {
    try {
      await getListMutate.mutate([getServerAction, page]);
      // setList((current) =>
      //   getListMutate.data ? [...getListMutate.data] : current
      // );
      allList = getListMutate.data ? getListMutate.data : allList;
    } catch (err) {
      console.error(err);
    }
  };
  const addServerList = async (content: string, page: number) => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3080/api/todo/add",
        data: { content },
      });
      setTodoCount((currentValue) => [
        currentValue[0] + 1,
        currentValue[1],
        currentValue[2] + 1,
      ]);
      getServerList(page);
      navigate("/1", {});
    } catch (err) {
      console.error(err);
    }
  };
  const deleteServerList = async (id: number, page: number) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3080/api/todo/delete",
        data: { id },
      });
      if (data[0] === 1) {
        const target = allList.find((item) => item.id === id);
        if (target) {
          setTodoCount((currentValue) =>
            target.isComplete
              ? [currentValue[0] - 1, currentValue[1] - 1, currentValue[2]]
              : [currentValue[0] - 1, currentValue[1], currentValue[2] - 1]
          );
        }
        getServerList(page);

        navigate("/1", { state: { page: 1 } });
      } else {
        console.log("todo 리스트 삭제 실패!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateServerList = async (id: number, content: string) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3080/api/todo/update",
        data: { id, content },
      });
      if (data[0] === 1) {
        setList(
          allList.map((item) =>
            item.id === id ? { ...item, content: content } : item
          )
        );
      } else {
        console.log("todo 리스트 업데이트 실패!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const completeServerList = async (id: number, page: number) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3080/api/todo/complete",
        data: { id },
      });
      if (data[0] === 1) {
        const [temp, index] = getTargetArrIDX(allList, id);
        setTodoCount((currentValue) =>
          temp[index].isComplete // targetComplete
            ? [currentValue[0], currentValue[1] + 1, currentValue[2] - 1]
            : [currentValue[0], currentValue[1] - 1, currentValue[2] + 1]
        );
        getServerList(page);
      } else {
        console.log("todo 리스트 완료 토글 실패!!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  // let { currentPage } = useParams();
  // useMemo(() => {
  //   if (!isNaN(Number(currentPage))) {
  //     setPage(Number(currentPage));
  //   }
  // }, []);
  let temp = useParams()?.page;
  let currentPage = temp ? +temp : 1;
  const { data, isLoading, isFetched, isPending } = useQuery<
    { listData: ITodo[]; count: [number, number, number] } | undefined
  >({
    queryKey: ["d", "s", "d"],
    queryFn: async () => {
      try {
        const getServerAction = [
          "getList",
          "getCompleteList",
          "getNotCompleteList",
        ];
        const listData = await axios({
          method: "get",
          url: `http://localhost:3080/api/todo/${getServerAction[listCount]}`,
          data: temp,
        });
        const listCountArr = await axios({
          method: "get",
          url: `http://localhost:3080/api/todo/getCount`,
        });
        const cntData = listCountArr.data;
        return {
          listData: listData.data,
          count: [
            cntData[0].CNT + cntData[1].CNT,
            cntData[0].CNT,
            cntData[1].CNT,
          ],
        };
      } catch (err) {
        console.error(err);
        return undefined;
      }
    },
    // refetchOnReconnect: true,
    refetchOnMount: "always",
  });

  // if (isFetched && !isLoading && !isPending) {
  //   setList((current) => (data?.listData ? data?.listData : current));
  //   setTodoCount((current) => (data?.count ? data.count : current));
  // }
  const mutateRun = getListMutate.mutate;
  const mutateRunCount = getCountArrMutate.mutate;
  useEffect(() => {
    // if (Number(temp) !== page) {
    // if (isNaN(Number(temp))) {
    //   setPage(1);
    // } else {
    //   if ((Number(temp) - 1) * 10 > listCount) {
    //     setPage(1);
    //   } else {
    //     setPage(Number(temp));
    //   }
    // }
    // }
    // setPage(currentPage);
    // if (!isLoading) {
    // }
    // setList((current) => (data?.listData ? data.listData : current));
    // console.log(page);
    mutateRun([listCount, currentPage]);
    mutateRunCount();
    console.log("실행중");
    // getServerList(currentPage);
    // getCount();
    // allList = temp ? temp : [];
  }, [temp, currentPage, data, listCount, allList, mutateRun, mutateRunCount]);
  // getCount();
  // getServerList(page);

  // const { data, isLoading } = useQuery<
  //   { listData: ITodo[]; count: [number, number, number] } | undefined
  // >({
  //   queryKey: ["d", "s", "d"],
  //   queryFn: async () => {
  //     try {
  //       const getServerAction = [
  //         "getList",
  //         "getCompleteList",
  //         "getNotCompleteList",
  //       ];
  //       const listData = await axios({
  //         method: "get",
  //         url: `http://localhost:3080/api/todo/${getServerAction[listCount]}`,
  //       });
  //       const listCountArr = await axios({
  //         method: "get",
  //         url: `http://localhost:3080/api/todo/getCount`,
  //       });
  //       const cntData = listCountArr.data;
  //       return {
  //         listData: listData.data,
  //         count: [
  //           cntData[0].CNT + cntData[1].CNT,
  //           cntData[0].CNT,
  //           cntData[1].CNT,
  //         ],
  //       };
  //     } catch (err) {
  //       console.error(err);
  //       return undefined;
  //     }
  //   },
  // });
  // allList = data;
  // let tempodata1 = data?.listData;
  // let tempodata2 = data?.count[listCount];
  let listTest = [];
  listTest = getListMutate.data ? getListMutate.data : [];
  let count = 0;
  count = getCountArrMutate.data ? getCountArrMutate.data[listCount] : 0;

  return (
    <TodoComp
      ChangeFilter={ChangeFilter}
      filter={filter}
      listCount={
        getCountArrMutate.isPending
          ? 0
          : getCountArrMutate?.data
          ? getCountArrMutate.data[listCount]
          : count
      }
      // listCountArr[listCount]
      // isLoading ? 0 : data?.count ? data.count[listCount] : 0
      // getCountArrMutate.data
      //   ? getCountArrMutate.data[listCount]
      //   : 0
      // }
      // listCount={listCountArr[listCount]}
      // list={isLoading ? [] : data?.listData ? data.listData : []}
      list={getListMutate.data ? getListMutate.data : listTest}
      addContent={addContent}
      udtContent={udtContent}
      udtId={udtId}
      bgColor={bgColor}
      getServerList={getServerList}
      getCount={getCount}
      addServerList={addServerList}
      deleteServerList={deleteServerList}
      updateServerList={updateServerList}
      completeServerList={completeServerList}
      writeAddContent={writeAddContent}
      writeUdtContent={writeUdtContent}
      writeUdtId={writeUdtId}
      navigate={navigate}
      page={currentPage}
    />
  );
};

export default Todo;
