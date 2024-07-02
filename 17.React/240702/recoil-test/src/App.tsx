import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { todoCount, todoList, todoFilter, todoListState } from "./context/todo";
import { useEffect } from "react";

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
    </div>
  );
};

export default App;
