// import { Component } from "react";

// export default function Test() {
//   return <div>now Testing</div>;
// }

import { FC, useState, useEffect } from "react";

const Test: FC = () => {
  const [test, _] = useState<string>("now Testing");
  const [a, b] = useState("asdf"); // << 쓰지 말라네요.

  useEffect(() => {
    console.log("Test Component Mount");
    return () => {
      console.log("Test Component Will Unmount");
    };
    // return으로 반환하는 method가 componentWillUnmount이다.
    // 언제 쓰면 좋을까? socket 통신
  }, []);
  return <div>now Testing</div>;
};

export default Test;
