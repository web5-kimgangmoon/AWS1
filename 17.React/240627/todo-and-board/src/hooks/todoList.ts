// Custom Hook
// use로 시작하는 식별자를 사용한다.
// Hook끼리는 독립적이기에 다른 hook을 가져다 state로 사용하지 못한다.
// HTML 문법이 포함되지 못한다.

import { useState, useCallback, useEffect, useMemo } from "react";

export interface Todo {
  content: string;
  isComplete: boolean;
  priority: number;
  createdAt: string;
  limit: string;
}

// interface useTodo{
//   isComplete:boolean;
//   setState:()=>void;
// }

// const useTodo=()=>{
//   const [isComplete, setComplete] = useState<boolean>(false)
//   return {isComplete, setComplete};
// }

const useTodoList = () => {
  const [list, setList] = useState<Todo[]>([
    {
      content: "test",
      isComplete: false,
      priority: 1,
      createdAt: "2024-06-26",
      limit: "2024-06-27",
    },
  ]);
  const addTodo = useCallback((todo: Todo) => {
    setList((list: Array<Todo>) => [...list, todo]);
  }, []);
  // useEffect(()=>{}, [])
  // useMemo(()=>{}, [])
  const removeTodo = useCallback((todo: Todo) => {
    setList((list: Array<Todo>) => list.filter((item) => item !== todo));
  }, []);
  const completeTodo = useCallback((todo: Todo) => {
    setList((list: Array<Todo>) =>
      list.map((item: Todo) =>
        item === todo ? { ...todo, isComplete: true } : item
      )
    );
  }, []);

  return { list, addTodo, removeTodo, completeTodo };
};

export default useTodoList;
