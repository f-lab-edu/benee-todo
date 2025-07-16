import { FC } from "react";
import { Todo } from "../types/todo-type";
import TodoItem from "./todo-item";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="w-full max-w-200 mx-auto flex flex-col gap-2">
      {todos.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default TodoList;
