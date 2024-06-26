import React from "react";
import Todo, { ITodo } from "./Components/todo";
import Add from "./Components/Add";
// import logo from "./logo.svg";
// import "./App.css";
import "./index.scss";

interface IProps {}

interface IState<T> {
  list: T[];
}

// <T> << Generic: T

class App extends React.Component<IProps, IState<ITodo>> {
  constructor(props: IProps) {
    super(props);
    this.state = { list: [] };
  }

  // componentDidMount(): void {
  //   this.setState((state: IState<ITodo>) => ({
  //     ...state,
  //     list: [
  //       ...state.list,
  //       { content: "오늘 점심은?", isComplete: false },
  //       { content: "오늘 점심은?", isComplete: false },
  //       { content: "오늘 점심은?", isComplete: false },
  //       { content: "오늘 점심은?", isComplete: false },
  //       { content: "오늘 점심은?", isComplete: false },
  //     ],
  //   }));
  // }

  complete(idx: number) {
    this.setState((state: IState<ITodo>) => {
      state.list[idx].isComplete = !state.list[idx].isComplete;
      return { ...state, list: [...state.list] };
      // return {...state, list: [...state.list]}
    });
  }

  add = (content: string): void => {
    this.setState((state: IState<ITodo>) => ({
      ...state,
      list: [...state.list, { content, isComplete: false }],
    }));
  };

  remove(idx: number) {
    this.setState((state: IState<ITodo>) => ({
      ...state,
      list: state.list.filter((_: ITodo, i: number) => i != idx),
    }));
  }
  render(): React.ReactNode {
    return (
      <div>
        <Add add={this.add}></Add>
        <div>
          {/* {["string", "string", "string"], "string", "string"} */}
          {this.state.list.map((item: ITodo, idx: number) => (
            <Todo
              key={idx}
              item={item}
              id={`todo-complete-${idx}`}
              complete={() => this.complete(idx)}
              remove={() => this.remove(idx)}
            ></Todo>
          ))}
        </div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
