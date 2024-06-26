import { FC, useCallback, useState, ChangeEvent } from "react";
import AddComp from "../../Components/Todo/tea_add";

export interface IProps {
  addItem(content: string, priority: number, limit: string): void;
}

const Add: FC<IProps> = ({ addItem }) => {
  const [content, setContent] = useState<string>("");
  const [priority, setPriority] = useState<number>(0);
  const [limit, setLimit] = useState<string>("");

  const changeContent = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setContent(value);
    },
    []
  );

  const changePriority = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const temp: number = +value;
      if (!isNaN(temp)) setPriority(temp);
    },
    []
  );
  const changeLimit = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setLimit(value);
    },
    []
  );
  // const submit = useCallback(() => {
  //   addItem(content, priority, limit);
  //   setContent("");
  //   setPriority(0);
  //   setLimit("");
  // }, [content, priority, limit]);
  const submit = () => {
    addItem(content, priority, limit);
    console.log(content);
    console.log(priority);
    console.log(limit);
    setContent("");
    setPriority(0);
    setLimit("");
  };
  return (
    <AddComp
      content={content}
      priority={priority}
      limit={limit}
      changeContent={changeContent}
      changePriority={changePriority}
      changeLimit={changeLimit}
      submit={submit}
    />
  );
};

export default Add;
