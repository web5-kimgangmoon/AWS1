import axios from "axios";
import { ITodo } from "../App";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

//useMutation

const useList = () => {
  const [list, setList] = useState<{
    isPending: boolean;
    isError: boolean;
    data: ITodo[];
  }>({ isError: false, isPending: false, data: [] });
  let state;
  const getList = useCallback(() => {
    const { data, isError, isPending } = useQuery<ITodo[]>({
      queryKey: ["list"],
      queryFn: async () => {
        const { data } = await axios.get("http://localhost:3080/api/todo/1");
        console.log(data);

        // throw new Error("test");
        return data;
      },
    });
    // setList({ data: data ? data : [], isError, isPending });
  }, []);

  //   const getList = () => {

  //   };

  return { getList, list };
};

export default useList;
