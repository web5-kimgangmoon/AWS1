// import logo from './logo.svg';
// import './App.css';
import React from "react";
import Todo from "./Components/todo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      list: [...state.list, { content: "이것이 js인가?" }],
    }));
  }

  render() {
    return (
      <div>
        {this.state.list.map((item, idx) => (
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
//           Edit <code>src/App.js</code> and save to reload.
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
