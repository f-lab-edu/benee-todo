import ModifyTodoBox from "@/components/modify-todo-box";

const TodoPage = () => {
  return (
    <div className="w-full max-w-400 mx-auto px-10 flex flex-col gap-4 py-20">
      <h1 className="text-center">투두 상세</h1>
      <ModifyTodoBox />
    </div>
  );
};

export default TodoPage;
