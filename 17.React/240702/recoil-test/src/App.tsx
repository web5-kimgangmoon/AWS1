import { Suspense } from "react";
import Todo from "./component/todo";

const App = (): JSX.Element => {
  return (
    <>
      <h1>Testing</h1>
      <Suspense fallback={<h1>now Loading!!!</h1>}>
        <Todo />
      </Suspense>
    </>
  );
};

export default App;
