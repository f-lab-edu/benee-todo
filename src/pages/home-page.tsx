import TodoList from "@/components/todo-list";
import { todos } from "@/dummyTodos";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <TodoList todos={todos} />
    </div>
  );
};

export default HomePage;
