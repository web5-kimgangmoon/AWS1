import React from "react";
import Todo, { ITodo } from "./Components/Todo";
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

  componentDidMount(): void {
    this.setState((state: IState<ITodo>) => ({
      ...state,
      list: [...state.list, { content: "오늘 점심은?", isComplete: false }],
    }));
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.list.map((item: ITodo, idx: number) => (
          <Todo key={idx} item={item}></Todo>
        ))}
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
