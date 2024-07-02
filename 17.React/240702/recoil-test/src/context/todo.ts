import { atom, selector, DefaultValue } from "recoil";

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
export const todoList = atom<ITodo[]>({
  key: "todoList",
  default: [],
});
export const todoListState = selector<ITodo[]>({
  key: "todoListState",
  get: ({ get }) => {
    const list: ITodo[] = get(todoList);
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
  //   set: ({ set }, todo) => {
  //     set(todoList, (list) => {
  //       return todo instanceof DefaultValue ? [...list] : [...list, ...todo];
  //     });
  //   },
});

// export const todoListFilter = selector<ITodo[]>({
//   key: "todoListFilter",
//   get: ({ get }) => {
//     const list = get(todoListState);
//     const filter = get(todoFilter);
//     switch (filter) {
//       case "complete":
//         return list.filter((item) => item.isComplete);
//       case "progress":
//         return list.filter((item) => item.isComplete);
//       case "all":
//       case "default":
//         return list;
//     }
//   },
// });

// selector : reducer + action?
export const todoCount = selector<number>({
  key: "todoCount",
  get: ({ get }) => {
    const list = get(todoListState);
    const filter = get(todoFilter);
    switch (filter) {
      case "complete":
        return list.filter((item) => item.isComplete).length;
      case "progress":
        return list.filter((item) => !item.isComplete).length;
      case "all":
      default:
        return list.length;
    }
  },
});

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
