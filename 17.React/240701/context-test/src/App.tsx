// import { useState } from "react";
// import logo from './logo.svg';
// import './App.css';

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

import { useCallback } from "react";
import { useTodoContext, ITodo } from "./context/TodoProvider";
import List from "./components/Todo/List";
import Add from "./components/Todo/Add";

function App(): JSX.Element {
  // const [list, setList]: [
  //   string[],
  //   React.Dispatch<React.SetStateAction<string[]>>
  // ] = useState<string[]>(["dsd", "Dasd"]);
  // return <div></div>;
  // const { state, dispatch } = useTodoContext();
  // console.log(state);

  // const addTodo = useCallback(() => {
  //   dispatch({
  //     type: "ADDTODO",
  //     payload: { id: 1, content: "testing", isComplete: false },
  //   });
  // }, []);
  return (
    // <div>
    //   <button onClick={addTodo}>추가</button>
    //   {state.todoList.map((item: ITodo, idx: number) => (
    //     <div key={idx}>{item.content}</div>
    //   ))}
    // </div>
    <div>
      <List />
      <Add />
    </div>
  );
}

export default App;
