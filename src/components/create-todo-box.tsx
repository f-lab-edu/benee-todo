import { useState, SyntheticEvent } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { NewTodo } from "@/types/todo-type";

interface CreateTodoBoxProps {
  onCreate: (newTodo: NewTodo) => void;
}

const CreateTodoBox = ({ onCreate }: CreateTodoBoxProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newTodo: NewTodo = {
      title,
      description,
    };
    onCreate(newTodo);

    setTitle("");
    setDescription("");
  };

  return (
    <Card className="px-4">
      <form action="submit" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            placeholder="Todo 제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">내용</Label>
          <Textarea
            id="description"
            placeholder="Todo 설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center">
          <Button variant="secondary" type="submit">
            추가하기
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateTodoBox;
