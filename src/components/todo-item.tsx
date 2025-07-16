import { FC } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Todo } from "@/types/todo-type";
import { formatDate } from "date-fns";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  return (
    <Card className="flex justify-start items-center flex-row gap-1 px-4">
      {todo.title} / {todo.description}
      <p>{formatDate(todo.createdAt, "yyyy-MM-dd hh:mm")}</p>
      <Button variant="outline">
        <Link to={`/todo/${todo.id}`}>수정</Link>
      </Button>
      <Button variant="outline">삭제</Button>
    </Card>
  );
};

export default TodoItem;
