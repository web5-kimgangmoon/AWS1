interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

let todoList: Todo[] = [];

let todoCnt = 1;

export const add = (title: string) => {
  if (title?.length) {
    todoList.push({
      id: todoCnt++,
      title,
      isCompleted: false,
    });
    return todoList[todoCnt - 2];
  } else {
    throw new Error("plz input title");
  }
};

export const getList = () => [...todoList];

export const patchTodo = ({
  id,
  title,
  isCompleted,
}: {
  id: number;
  title?: string;
  isCompleted?: boolean;
}) => {
  try {
    const todo = todoList.find((item: Todo) => item.id === id);
    if (todo === undefined) throw new Error("not found todo item");
    if (title !== undefined) todo.title = title;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;
    return todo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = (id: number) => {
  const todo = todoList.findIndex((item: Todo) => item.id === id);
  if (todo === undefined) throw new Error("not found todo item");
  todoList = todoList.filter((item: Todo) => item.id !== id);
  return [...todoList];
};
