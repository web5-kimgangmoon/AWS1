import { useTodoContext } from "../../context/TodoProvider";
import { useMemo, useCallback } from "react";
interface IProps {
  idx: number;
}

const Item = ({ idx }: IProps): JSX.Element => {
  const {
    state: { todoList },
    dispatch,
    toggle,
  } = useTodoContext();

  const item = useMemo(() => {
    return todoList[idx];
  }, [todoList]);

  // const toggleComplete = useCallback(() => {
  //   dispatch({ type: "TOGGLETODO", payload: { id: item.id } });
  // }, []);
  const removeTodo = useCallback(() => {
    dispatch({ type: "REMOVETODO", payload: { id: item.id } });
  }, [todoList]);
  return (
    <div>
      <div>{item.id}</div>
      <div>{item.title}</div>
      <div>{item.content}</div>
      <div>{item.isComplete ? "완료" : "진행중"}</div>
      <button onClick={() => toggle(idx)}>완료</button>
      <button onClick={removeTodo}>삭제</button>
    </div>
  );
};

export default Item;
