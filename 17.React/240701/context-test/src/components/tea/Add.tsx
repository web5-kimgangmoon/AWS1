import { ChangeEvent, useCallback, useState } from "react";
import { useTodoContext } from "../../context/TodoProvider";

// import Button fro

const Add = (): JSX.Element => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const changeTitle = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setTitle(target.value);
    },
    []
  );
  const changeContent = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setContent(target.value);
    },
    []
  );

  const { dispatch } = useTodoContext();
  const addTodo = () => {
    dispatch({
      type: "ADDTODO",
      payload: {
        title,
        content,
      },
    });
  };
  return (
    <div>
      <input
        type="text"
        value={title}
        onInput={changeTitle}
        placeholder="title"
      />
      <input
        type="text"
        value={content}
        onInput={changeContent}
        placeholder="content"
      />
      <button onClick={addTodo}>추가</button>
    </div>
  );
};

export default Add;
