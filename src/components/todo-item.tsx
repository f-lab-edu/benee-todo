import { FC } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Todo } from "@/types/todo-type";
import { formatDate } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <Card className="flex justify-between items-center flex-row gap-1 px-4">
      <div className="flex justify-start items-start gap-1">
        <Checkbox id={todo.id} onClick={onToggle} />
        <div>
          <Label htmlFor={todo.id}>{todo.title}</Label>
          <p>{todo.description}</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-1">
        <p>{formatDate(todo.createdAt, "yyyy-MM-dd hh:mm")}</p>
        <Button variant="outline">
          <Link to={`/todo/${todo.id}`}>수정</Link>
        </Button>
        <Button variant="outline" onClick={onDelete}>
          삭제
        </Button>
      </div>
    </Card>
  );
};

export default TodoItem;
