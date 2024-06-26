import { FC, useState, useCallback, FormEvent } from "react";
import { Todo as TodoItem } from "../../lib/Todo";
import TodoComp from "../../Components/Todo/Todo";

export interface ITodoProps {
  list: TodoItem[];
  complete(idx: number): void;
  removeItem(idx: number): void;
  deleteItem(idx: number): void;
}

export interface IProps extends ITodoProps {
  add(content: string, priority: number, limit: string): void;
  addItem(content: string, priority: number, limit: string): void;
}

const Todo: FC = ({}) => {
  const [list, setList] = useState<TodoItem[]>([
    new TodoItem("test", 1, "2024-06-30"),
  ]);

  // const complete = useCallback((idx: number) => {
  //   list[idx].setComplete();
  //   setList([...list]);
  //   // complete 메서드가 초기화되는 시기 언제? => Mount
  // }, []);
  // const complete = (idx: number) => {
  //   list[idx].setComplete();
  //   setList([...list]);
  //   // complete 메서드가 초기화되는 시기 언제? => Mount
  // };
  // 이 두 메서드는 다를 바가 없다.
  // 매 render 마다 새롭게 초기화된다.
  const complete = useCallback((idx: number) => {
    setList((list: TodoItem[]) => {
      list[idx].setComplete();
      return [...list];
    });
    // complete 메서드가 초기화되는 시기 언제> => Mount
  }, []);
  const deleteItem = useCallback((idx: number) => {
    setList((list: TodoItem[]) => [
      ...list.filter((_, itemIdx) => itemIdx != idx),
    ]);
  }, []);
  const removeItem = useCallback((idx: number) => {
    setList((list: TodoItem[]) => [
      ...list.filter((_, itemIdx) => itemIdx != idx),
    ]);
  }, []);

  const add = useCallback(
    (content: string, priority: number, limit: string) => {
      setList((list: TodoItem[]) => {
        return [new TodoItem(content, priority, limit), ...list];
      });
    },
    []
  );
  const addItem = useCallback(
    (content: string, priority: number, limit: string) => {
      setList((list: TodoItem[]) => [
        ...list,
        new TodoItem(content, priority, limit),
      ]);
    },
    []
  );
  return (
    <TodoComp
      list={list}
      complete={complete}
      add={add}
      deleteItem={deleteItem}
      addItem={addItem}
      removeItem={removeItem}
    />
  );
};

export default Todo;
