import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// Recoil = Context를 쉽게 사용할 수 있게 해주는 라이브러리이다.
// 같은 종률로는 Redux, MobX 이런 라이브러리들이 있다.
// Redux는 필수 << 예전 대충 4년 전
// Recoil도 요즘은 지양하는 편이긴 하다. => 왜 ? 전역 상태 자체를 지양한다.
// 알긴 해야 한다.
// store라는 저장소가 필요하다.
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
