import Button from "../button/Button";
interface IProps {
  id: number;
  content: string;
  isComplete: boolean;
  completeServerList: () => void;
  deleteServerList: () => void;
}

const TodoItem = ({
  id,
  content,
  isComplete,
  completeServerList,
  deleteServerList,
}: IProps): JSX.Element => {
  return (
    <tr className="border border-gray-300">
      <td className="text-center">{id}</td>
      <td colSpan={2}>{content}</td>
      <td
        className={`font-semibold ${
          isComplete ? "text-green-500" : "text-blue-500"
        }`}
      >
        {isComplete ? "완료됨!" : "진행중!"}
      </td>
      <td className="text-center">
        <Button
          color={isComplete ? "SKY" : "GREEN"}
          onClick={completeServerList}
        >
          {isComplete ? "진행중으로" : "완료로"}
        </Button>
      </td>
      <td className="text-center">
        <Button color={"RED"} onClick={deleteServerList}>
          삭제!
        </Button>
      </td>
    </tr>
  );
};
export default TodoItem;
