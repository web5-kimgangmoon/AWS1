import { useState, ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  todoListReducer,
  // todoCount,
  todoFilter,
  todoListState,
  todoCountState,
} from "../context/todo";
import axios from "axios";
import TodoComp from "../component/todo";
import { useNavigate, Routes, Route } from "react-router-dom";

const Todo = (): JSX.Element => {
  const navigate = useNavigate();
  const [addContent, setAddContent] = useState<string>("");
  const [udtContent, setUdtContent] = useState<string>("");
  const [udtId, setUdtId] = useState<number>(0);
  const [allList, setList] = useRecoilState(todoListState);
  const [filter, setFilter] = useRecoilState(todoFilter);
  const list = useRecoilValue(todoListReducer);
  const [listCountArr, setTodoCount] = useRecoilState(todoCountState);
  const listCount =
    filter === "all"
      ? listCountArr[0]
      : filter === "complete"
      ? listCountArr[1]
      : listCountArr[2];

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
  const getServerList = async (page: number) => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3080/api/todo/getList",
        params: { page: page },
      });
      setList([...data.targetList]);
      setTodoCount(data.count);
    } catch (err) {
      console.error(err);
    }
  };
  const addServerList = async (content: string) => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3080/api/todo/add",
        data: { content },
      });

      getServerList(1);
      navigate("/1", {});
    } catch (err) {
      console.error(err);
    }
  };
  const deleteServerList = async (id: number) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3080/api/todo/delete",
        data: { id },
      });
      if (data[0] === 1) {
        getServerList(1);
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
  const completeServerList = async (id: number) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3080/api/todo/complete",
        data: { id },
      });
      if (data[0] === 1) {
        let index: number = 0;
        let temp = allList.map((item, idx) => {
          if (item.id === id) {
            index = idx;
            return { ...item, isComplete: !item.isComplete };
          }
          return item;
        });
        setTodoCount((currentValue) =>
          temp[index].isComplete // targetComplete
            ? [currentValue[0], currentValue[1] + 1, currentValue[2] - 1]
            : [currentValue[0], currentValue[1] - 1, currentValue[2] + 1]
        );
        setList(temp);
      } else {
        console.log("todo 리스트 완료 토글 실패!!");
      }
    } catch (err) {
      console.error(err);
    }
  };
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
  //   useEffect(() => {}, [serverList]);
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
            getServerList={getServerList}
            addServerList={addServerList}
            deleteServerList={deleteServerList}
            updateServerList={updateServerList}
            completeServerList={completeServerList}
            writeAddContent={writeAddContent}
            writeUdtContent={writeUdtContent}
            writeUdtId={writeUdtId}
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
            getServerList={getServerList}
            addServerList={addServerList}
            deleteServerList={deleteServerList}
            updateServerList={updateServerList}
            completeServerList={completeServerList}
            writeAddContent={writeAddContent}
            writeUdtContent={writeUdtContent}
            writeUdtId={writeUdtId}
          />
        }
      />
    </Routes>
  );
};

export default Todo;
