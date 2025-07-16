import { useState } from "react";
import TodoItem from "./todo-item";
import CreateTodoBox from "./create-todo-box";
import PaginationBox, { PAGE_SIZE } from "./pagintaion-box";
import useTodos from "@/hooks/useTodos";
import { paginate } from "@/utils/paginate";

const TodoList = () => {
  const [page, setPage] = useState<number>(1);
  const { todos, createTodo, toggleTodo, deleteTodo } = useTodos();

  const paginatedTodos = paginate(page, PAGE_SIZE, todos ?? []);

  const handlePage = (newPage: number) => {
    setPage(newPage);
  };

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
      <PaginationBox
        page={page}
        total={todos?.length ?? 0}
        onPaginate={handlePage}
      />
    </div>
  );
};

export default TodoList;
