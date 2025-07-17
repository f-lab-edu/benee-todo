import CreateTodoBox from "@/components/create-todo-box";
import TodoList from "@/components/todo-list";

const HomePage = () => {
  return (
    <div className="w-full max-w-400 mx-auto px-10 flex flex-col gap-4">
      <h1>HomePage</h1>
      <CreateTodoBox />
      <TodoList />
    </div>
  );
};

export default HomePage;
