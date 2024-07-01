import Item from "./Item";

export interface IButton {
  title: string;
  onClick?: (id: number) => void;
}

interface IProps<T extends { id: number }> {
  keyTitleList: { key: string; title: string; button?: IButton }[];
  buttonList?: IButton[];
  valueObjList: T[];
}

const List = <T extends { id: number }>({
  keyTitleList,
  valueObjList,
  buttonList,
}: IProps<T>): JSX.Element => {
  return (
    <div>
      <table>
        <tbody>
          <Item key={-1} valueList={keyTitleList.map(({ title }) => title)} />
          {valueObjList.map((item, idx) => (
            <Item
              idx={idx}
              key={item.id}
              valueList={keyTitleList.map(
                ({ key }) => `${item[key as keyof T]}`
              )}
              buttonList={buttonList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
