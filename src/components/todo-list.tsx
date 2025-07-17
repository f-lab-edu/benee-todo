import { useState } from "react";
import TodoItem from "./todo-item";
import PaginationBox, { PAGE_SIZE } from "./pagintaion-box";
import useTodos from "@/hooks/useTodos";
import { paginate } from "@/utils/paginate";

const TodoList = () => {
  const [page, setPage] = useState<number>(1);
  const { todos, isLoading, toggleTodo, deleteTodo } = useTodos();

  const paginatedTodos = paginate(page, PAGE_SIZE, todos ?? []);

  const handlePage = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col gap-2">
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
