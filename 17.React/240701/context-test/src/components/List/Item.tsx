import { IButton } from "./List";

interface IProps {
  valueList: string[];
  buttonList?: IButton[];
  idx?: number;
}

const Item = ({ valueList, buttonList, idx = -1 }: IProps): JSX.Element => {
  let nowIdx = 0;
  return (
    <tr>
      {valueList.map((item) => (
        <td key={`${nowIdx++}-${idx}`}>{item}</td>
      ))}
      {buttonList
        ? buttonList.map((item) => (
            <td key={`${nowIdx++}-${idx}`}>
              <button onClick={() => (item.onClick ? item.onClick(idx) : "")}>
                {item.title}
              </button>
            </td>
          ))
        : ""}
    </tr>
  );
};

export default Item;
