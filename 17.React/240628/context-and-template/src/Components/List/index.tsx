// import Comp from "./Comp";
import Item from "./Item";
// import { Routes, Route } from "react-router-dom";

export interface ITitle<S> {
  key: keyof S; // 키값 어떤 interface의 key의 타입을 받아온다. 왜? 굳이? 숫자일 수도 있다.
  name: string; // value에 대해
  isStretch?: boolean;
}
interface IProps<T> {
  list: T[];
  titleList: ITitle<T>[];
  //{ key: keyof T; name: string }[]
  //   titles: string[];
}

const List = <T extends {}>({ list, titleList }: IProps<T>): JSX.Element => {
  // console.log(list[0]["title" as keyof T]);
  return (
    <ul>
      <li>
        <ul className="flex justify-between">
          {titleList.map(
            ({ name, isStretch = false }: ITitle<T>, idx: number) => (
              <li
                key={`title-${idx}`}
                className={`w-16${isStretch ? " flex-1" : " text-centet"}`}
              >
                {name}
              </li>
            )
          )}
        </ul>
      </li>
      {list.map((item: T, idx: number) => (
        <Item<T> key={`item-${idx}`} item={item} titleList={titleList} />
      ))}
      {/* <ul className="flex justify-between">
        <li>1</li>
        <li>testing</li>
        <li>JKH</li>
        <li>2시간 전</li>
      </ul>
      <ul className="flex justify-between">
        <li>1</li>
        <li>testing</li>
        <li>JKH</li>
        <li>2시간 전</li>
      </ul> */}
    </ul>
  );
};

export default List;
