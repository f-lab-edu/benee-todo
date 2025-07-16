import { useState } from "react";
import CreateTodoBox from "./create-todo-box";
import TodoItem from "./todo-item";
import useTodos from "@/hooks/useTodos";
import { paginate } from "@/utils/paginate";

const TodoList = () => {
  const [page, setPage] = useState<number>(1);
  const { todos, createTodo, toggleTodo, deleteTodo } = useTodos();

  const paginatedTodos = paginate(page, PAGE_SIZE, todos ?? []);

  return (
    <div className="w-full max-w-200 mx-auto flex flex-col gap-2">
      <CreateTodoBox onCreate={createTodo} />
      {paginatedTodos.map((item) => (
        <TodoItem
          key={item.id}
          todo={item}
          onDelete={() => deleteTodo(item.id)}
          onToggle={() => toggleTodo(item.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
