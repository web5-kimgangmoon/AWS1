import ListComp from "../List/List";
import { useTodoContext, ITodo } from "../../context/TodoProvider";

const List = (): JSX.Element => {
  const { state, toggle, dispatch } = useTodoContext();
  const removeItem = (id: number) => {
    dispatch({ type: "REMOVETODO", payload: { id: id } });
  };
  return (
    <div>
      <ListComp<ITodo>
        keyTitleList={[
          { key: "id", title: "No." },
          { key: "content", title: "내용" },
          { key: "title", title: "제목" },
          { key: "isComplete", title: "진행상태" },
        ]}
        buttonList={[
          { title: "완료", onClick: toggle },
          { title: "삭제", onClick: removeItem },
        ]}
        valueObjList={state.todoList}
      />
    </div>
  );
};

export default List;
