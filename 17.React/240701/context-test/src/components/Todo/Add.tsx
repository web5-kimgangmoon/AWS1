import { useTodoContext } from "../../context/TodoProvider";
import { useCallback, useState, ChangeEvent, MouseEvent } from "react";

const Add = (): JSX.Element => {
  const { state, dispatch } = useTodoContext();
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const changeText = useCallback((nextText: string) => {
    setText(nextText);
  }, []);
  const changeTitle = useCallback((nextText: string) => {
    setTitle(nextText);
  }, []);
  const addTodo = () => {
    dispatch({
      type: "ADDTODO",
      payload: {
        content: text,
        title: title,
      },
    });
  };

  const inputText = (e: ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  };
  const inputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    changeTitle(e.target.value);
  };
  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    if (text !== "" && title !== "") {
      addTodo();
    }
  };
  return (
    <div>
      <div>
        <div>
          <input type="text" onChange={inputText} />
        </div>
        <div>
          <input type="text" onChange={inputTitle} />
        </div>
        <div>
          <button type="button" onClick={submit}>
            Todo 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
