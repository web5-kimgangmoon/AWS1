import { useState, useCallback } from "react";
import { ChangeEvent } from "react";
const TodoList = (): JSX.Element => {
  const [list, setList] = useState<string[]>([]);
  const [text, setText] = useState<string>("");

  const onChagne = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setText(value);
    },
    []
  );
  const addTodo = useCallback(() => {
    setList((state) => [...state, text]);
    setText("");
  }, [text]);
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          //   onChange={(e) => {
          //     setText(e.target.value);
          //   }}
          onChange={onChagne}
        />
        <button
          //   onClick={() => {
          //     setList((list) => [...list, text]);
          //   }}
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default TodoList;
