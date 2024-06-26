import { useState, useEffect, DependencyList, ChangeEvent } from "react";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Test from "./Components/test";

// componentDidMount
// componentDidUpdate
// componentWillUnmount
// useEffect

// class App extends React.Component{
//   render() : React.ReactNode{

//   }
// }

function App(): JSX.Element {
  const [test, setTest]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
    // Dispatch : 액션을 실행하는 메서드 타입
    // SetStateAction : 상태값을 업데이트하는 액션의 메서드 타입
  ] = useState<boolean>(true);

  const [test1, setTest1] = useState<string>("");
  // useState => Hook
  // user***** => 함수형 컴포넌트에서 사용하는 Hook

  // componentDidMount
  // componentDidUpdate
  // componentWillUnmount
  // 항상 실행된다.
  useEffect(() => {
    // console.log("useEffect");
  });
  // 무조건 실행됨
  useEffect(() => {
    // console.log("Mount");
  }, []);
  // componentDidMount가 실행되었을 때 실행됨. 두번째 값이 변경되었을 때만 실행되는데, 아무것도 넣지 않으면 처음 초기화를 제외하곤 실행 X
  useEffect(() => {
    // console.log("testing1");
    return () => {
      console.log("testing???");
    };
  }, [test]);
  // test1이 변경되었을때는 실행되지 않음. 2번째 인자인 state[]가 변경되었을 때 실행됨.
  // state가 변경되면 기존의 것이 없어진다고 인식함.
  return (
    <div className="container mx-auto">
      <div
        className="border"
        onClick={() => {
          setTest(!test);
          // console.log(test);
        }}
      >
        test
      </div>
      {test && <Test></Test>}
      <input
        type="text"
        value={test1}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          setTest1(e.target.value);
        }}
      />
    </div>
  );
}
export default App;
