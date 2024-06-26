import { Routes, Route, Link } from "react-router-dom";
// Routes, Route는 값을 넣어주는 역할을 한다.
// Link는 react에서 a태그의 역할을 해준다.
import { FC } from "react";
import Test from "./Components/test";

// import logo from './logo.svg';
// import './App.css';

export interface IProps {}

const App: FC<IProps> = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/"} className="text-blue-600 underline">
              홈페이지
            </Link>
          </li>
          <li>
            <Link to={"/test"} className="text-blue-600 underline">
              테스트
            </Link>
          </li>
          <li>
            <Link to={"/test/tt"} className="text-blue-600 underline">
              go tt
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<div>홈페이지</div>} />
        <Route path="/test/:id" Component={Test} />
      </Routes>
      {/* <Routes>
        <Route path="/" element={<div>홈페이지2</div>} />
        <Route path="/test" element={<div>테스트중2</div>} />
      </Routes> */}
    </div>
  );
};
export default App;
