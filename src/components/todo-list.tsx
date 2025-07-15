import { FC } from "react";
import { Todo } from "../types/todo-type";
import TodoItem from "./todo-item";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      {todos.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default TodoList;
