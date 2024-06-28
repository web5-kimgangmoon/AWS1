// import { FC } from "react";
import { useState, useCallback, useContext } from "react";
import Board from "./Components/Board";
import Todo from "./Components/Todo";
import { ITodo, TodoContext } from "./context/todoList";
// import { Link } from "react-router-dom";

function App() {
  console.log(useContext(TodoContext));
  const [list, setList] = useState<ITodo[]>([]);
  const addList = useCallback((todo: ITodo) => {
    setList((list: ITodo[]) => [...list, todo]);
  }, []);
  return (
    <div>
      {/* <Link to={"board/2"}>테스트해봅시다</Link> */}

      <TodoContext.Provider value={{ list, addList }}>
        <div>
          <Board />
          <Todo />
        </div>
      </TodoContext.Provider>
    </div>
  );
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
