import { Suspense } from "react";
import Todo from "./container/todo";

const App = (): JSX.Element => {
  return (
    <div>
      <Suspense fallback={<h1>now Loading!!!</h1>}>
        <Todo />
      </Suspense>
    </div>
  );
};

export default App;
