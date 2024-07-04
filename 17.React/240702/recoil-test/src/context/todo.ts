import axios from "axios";
import { atom, selector } from "recoil";
export interface ITodo {
  id: number;
  content: string;
  isComplete: boolean;
}

// atom :state
// export const todoList = atom<ITodo[]>({
//   key: "todoList",
//   default: [],
// });
// initailState
// useState랑 사용법이 거의 흡사

const todoFilterState = atom<string>({
  key: "todoFilterState",
  default: "all",
});
export const todoCountState = atom<[number, number, number]>({
  key: "todoCount",
  default: [0, 0, 0],
});
export const todoListState = atom<ITodo[]>({
  key: "todoList",
  default: [],
});

export const todoListReducer = selector<ITodo[]>({
  key: "todoListState",
  get: ({ get }) => {
    const list: ITodo[] = get(todoListState);
    const filter: string = get(todoFilter);
    switch (filter) {
      case "complete":
        return list.filter((item) => item.isComplete);
      case "progress":
        return list.filter((item) => !item.isComplete);
      case "all":
      default:
        return list;
    }
  },
});

// selector : reducer + action?

export const todoFilter = selector<string>({
  key: "todoFilter",
  get: ({ get }) => {
    return get(todoFilterState);
  },
  set: ({ set }, value = "") => {
    set(todoFilterState, value);
  },
});

// let a = {
//   a: 1,
//   b: "st",
//   c: { a: 1, b: [1, 2, 3], c: { a: { b: [] } } },
// };
export const todoListSet = selector<ITodo[]>({
  key: "todoListSet",
  get: ({ get }) => {
    return get(todoListState);
  },
  set: ({ set }, newValue) => {
    set(todoListState, newValue);
  },
});

export const getServerList = selector<ITodo[]>({
  key: "getServerList",
  get: async ({ get }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/todo/getList"
      );
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
});
