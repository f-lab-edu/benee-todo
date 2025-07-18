import { useState } from "react";
import TodoItem from "./todo-item";
import PaginationBox from "./pagintaion-box";
import useTodos from "@/hooks/useTodos";
import { paginate } from "@/utils/paginate";
import CreateTodoBox from "./create-todo-box";

const TodoList = () => {
  const [page, setPage] = useState<number>(1);
  const { todos, isLoading, createTodo, toggleTodo, deleteTodo } = useTodos();

  const paginatedTodos = paginate(page, todos ?? []);

  const handlePage = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CreateTodoBox onCreate={createTodo} />
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
    </>
  );
};

export default TodoList;
