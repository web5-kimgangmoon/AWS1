import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { todoCount, todoList, todoFilter, todoListState } from "./context/todo";
import { useEffect, FormEvent } from "react";
import axios from "axios";

const App = (): JSX.Element => {
  // const [list, setList] = useRecoilState(todoList);
  // console.log(list);
  // const ss = useSetRecoilState(todoList);
  const list = useRecoilValue(todoListState);
  const setList = useSetRecoilState(todoList);
  console.log(list);
  const listCount = useRecoilValue(todoCount);
  const [filter, setFilter] = useRecoilState(todoFilter);

  useEffect(() => {
    setList([
      { id: 1, content: "test", isComplete: false },
      { id: 2, content: "test2", isComplete: true },
      { id: 3, content: "test3", isComplete: false },
      { id: 4, content: "test4", isComplete: true },
      { id: 5, content: "test5", isComplete: false },
    ]);

    //   axios({
    //     method: "post",
    //     url: "http://127.0.0.1:3080",
    //     data: { content: "test2" },
    //     withCredentials: true,
    //   });
    //   axios({
    //     method: "post",
    //     url: "http://127.0.0.1:3080",
    //     data: { content: "test3" },
    //     withCredentials: true,
    //   });
    //   axios({
    //     method: "post",
    //     url: "http://127.0.0.1:3080",
    //     data: { content: "test4" },
    //     withCredentials: true,
    //   });
    //   axios({
    //     method: "post",
    //     url: "http://127.0.0.1:3080",
    //     data: { content: "test5" },
    //     withCredentials: true,
    //   });
    axios("http://127.0.0.1:3080/api/todo/add", {
      method: "POST",
      data: { content: "test" },
      withCredentials: true,
    });
  }, []);

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
  return (
    <div>
      <button onClick={ChangeFilter}>{filter}</button> : {listCount}
      <div>{listCount}</div>
      {list.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
      <div>
        <input id="text" type="text" />
        <button
        // type="button"
        // onClick={() => {
        //   // e.preventDefault();
        //   const text = document.getElementById("text")?.nodeValue || "";
        //   axios({
        //     method: "post",
        //     url: "http://127.0.0.1:3080",
        //     data: { content: text },
        //     withCredentials: true,
        //   });
        //   setList((current) => {
        //     return [
        //       ...current,
        //       {
        //         id: current.length,
        //         content: text,
        //         isComplete: false,
        //       },
        //     ];
        //   });
        // }}
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default App;
