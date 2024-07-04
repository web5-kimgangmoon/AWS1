import { useState, ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  todoListReducer,
  todoFilter,
  todoListState,
  todoCountState,
  ITodo,
} from "../context/todo";
import axios from "axios";
import TodoComp from "../component/todo";
import { useNavigate, Routes, Route } from "react-router-dom";
import { colorEnum } from "../button/Button";
import { useMutation } from "@tanstack/react-query";

const Todo = (): JSX.Element => {
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
  const navigate = useNavigate();
  const [addContent, setAddContent] = useState<string>("");
  const [udtContent, setUdtContent] = useState<string>("");
  const [udtId, setUdtId] = useState<number>(0);
  const [allList, setList] = useRecoilState(todoListState);
  const [filter, setFilter] = useRecoilState(todoFilter);
  const list = useRecoilValue(todoListReducer);
  const [listCountArr, setTodoCount] = useRecoilState(todoCountState);
  let listCount: number;
  let bgColor: [string, colorEnum];
  let getServerAction: string;
  switch (filter) {
    case "all":
      listCount = listCountArr[0];
      bgColor = ["bg-orange-100", "ORANGE"];
      getServerAction = "getList";
      break;
    case "complete":
      listCount = listCountArr[1];
      bgColor = ["bg-green-100", "GREEN"];
      getServerAction = "getCompleteList";
      break;
    case "progress":
    default:
      listCount = listCountArr[2];
      bgColor = ["bg-sky-100", "SKY"];
      getServerAction = "getNotCompleteList";
  }
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
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3080/api/todo/getCount",
      });
      setTodoCount([data[0].CNT + data[1].CNT, data[0].CNT, data[1].CNT]);
    } catch (err) {
      console.error(err);
    }
  };
  const getServerList = async (page: number) => {
    try {
      filter;
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3080/api/todo/${getServerAction}`,
        params: { page: page },
      });
      setList([...data]);
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
        const target = allList.find((item) => item.id == id);
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
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoComp
            ChangeFilter={ChangeFilter}
            filter={filter}
            listCount={listCount}
            list={list}
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
          />
        }
      />
      <Route
        path=":page"
        element={
          <TodoComp
            ChangeFilter={ChangeFilter}
            filter={filter}
            listCount={listCount}
            list={list}
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
          />
        }
      />
    </Routes>
  );
};

export default Todo;
