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

import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useCallback, useState } from "react";
import axios from "axios";
// import useList from "./hooks/list";

// }
export interface ITodo {
  id: number;
  content: string;
  isComplete: boolean;
}

const keys = ["todo"];
const App = (): JSX.Element => {
  const [page, setPage] = useState(1);
  // const query = useQuery<ITodo[]>({
  //   queryKey: [...keys, "list", { a: 1 }],
  //   queryFn: async () => {
  //     const { data } = await axios.get("http://localhost:3080/api/todo/1");
  //     console.log(data);
  //     // throw new Error("test");
  //     return data;
  //   },
  // });

  // const { getList, list } = useList();
  const { data, isError, isPending } = useQuery<ITodo[]>({
    queryKey: [...keys, "add", { a: 1, b: undefined }],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3080/api/todo/${page}`
      );
      console.log(data);

      //     // throw new Error("test");
      return data;
    },
    // refetchInterval: 1000,
    // refetchOnWindowFocus: false,
  });

  // const { data, isError, isPending, mutate } = useMutation({
  //   mutationKey: ["todo", "list"],
  //   mutationFn: async (page: number) => {
  //     const { data } = await axios.get(
  //       `http://localhost:3080/api/todo/${page}`
  //     );
  //     return data as ITodo[];
  //   },

  // });
  // useEffect(() => {
  // mutate(page);
  // console.log("useEffect is running");
  // }, [page]);
  console.log(data);
  // getList();
  // useEffect(() => {}, []);
  if (isPending) return <h1>now Loading</h1>;
  if (isError) return <h1>plz retry</h1>;
  return (
    <div>
      <button onClick={() => setPage(page + 1)}>up</button>
      {data?.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
    // <div>
    //   Tanstack React-Query
    //   <br />
    //   @tanstack/react-query
    // </div>
  );
};

export default App;
