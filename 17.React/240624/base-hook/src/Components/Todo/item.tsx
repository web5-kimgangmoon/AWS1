import { FC, ChangeEvent, FormEvent, useMemo, FormEventHandler } from "react";
import { Todo as TodoItem } from "../../lib/Todo";

export interface IProps {
  item: TodoItem;
  idx: number;
  complete(e: ChangeEvent<HTMLInputElement>): void;
  deleteItem(e?: FormEvent<HTMLFormElement>): void;
}

const Item: FC<IProps> = ({ item, idx, complete, deleteItem }) => {
  const isComplete: string = useMemo(
    () => (item.getIsComplete() ? "완료" : "진행중"),
    [item.getIsComplete()]
  );
  return (
    <div className="flex justify-between items-center gap-2 p-1 border-b border-dashed border-black">
      <div>{item.getPriority()}</div>
      <div className="flex-1">{item.getContent()}</div>
      <div>{item.getCreatedAt()}</div>
      <div>{item.getLimit()}</div>
      <div>
        <label
          htmlFor={`item=${idx}`}
          className="border 
          border-gray-400 
          has-[:checked]:bg-yellow-300 
          p-1 
          px-2 
          rounded 
          has-[:checked]:text-red-700 
          select-none"
        >
          {isComplete}
          <input
            id={`item=${idx}`}
            className="hidden"
            type="checkbox"
            checked={item.getIsComplete()}
            onChange={complete}
          />
        </label>
      </div>
      <button
        className="border border-gray-400 rounded bg-gray-200 p-1 px-2 select-none"
        type="submit"
        onClick={(e: FormEvent<HTMLButtonElement>) => {
          e.preventDefault();
          deleteItem();
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Item;
