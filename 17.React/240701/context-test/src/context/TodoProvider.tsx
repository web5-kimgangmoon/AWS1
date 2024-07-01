import {
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useCallback,
} from "react";

export interface ITodo {
  id: number;
  title: string;
  content: string;
  isComplete: boolean;
}

export interface TodoListState {
  todoList: ITodo[];
}

const initailState: TodoListState = {
  todoList: [],
};
// initailize : 초기화 : initailState : 초기값

type Action =
  | { type: "ADDTODO"; payload: { title: string; content: string } }
  | { type: "REMOVETODO"; payload: { id: number } }
  | { type: "TOGGLETODO"; payload: { id: number } };

let nowId = 0;
const reducer = (state: TodoListState, action: Action): TodoListState => {
  switch (action.type) {
    case "ADDTODO":
      return {
        ...state,
        todoList: [
          ...state.todoList,
          { ...action.payload, id: nowId++, isComplete: false },
        ],
      };

    // break;
    case "REMOVETODO":
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo: ITodo) => todo.id !== action.payload.id
        ),
      };
    //   break;
    case "TOGGLETODO":
      return {
        ...state,
        todoList: state.todoList.map((todo: ITodo) => {
          if (todo.id !== action.payload.id) return todo;
          else return { ...todo, isComplete: !todo.isComplete };
        }),
      };
    //   break;
    default:
      return state;
  }
  //   return state;
};

interface TodoContextProps {
  state: TodoListState;
  toggle: (id: number) => void;
  dispatch: Dispatch<Action>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initailState);
  const toggle = useCallback((id: number) => {
    dispatch({ type: "TOGGLETODO", payload: { id } });
  }, []);
  return (
    <TodoContext.Provider value={{ state, dispatch, toggle }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("now loading");
  }
  return context;
};

export default TodoContext;
