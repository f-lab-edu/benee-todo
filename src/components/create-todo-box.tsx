import { SyntheticEvent } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Todo } from "@/types/todo-type";
import useTodos from "@/hooks/useTodos";

const CreateTodoBox = () => {
  const { createTodo } = useTodos();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const descInput = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;

    if (e.target) {
      const newTodo: Omit<Todo, "id" | "createdAt" | "completed"> = {
        title: titleInput.value ?? "",
        description: descInput.value ?? "",
      };

      createTodo(newTodo);

      titleInput.value = "";
      descInput.value = "";
    } else {
      console.error("event target is not exist");
    }
  };

  return (
    <Card className="px-4">
      <form action="submit" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">제목</Label>
          <Input id="title" placeholder="Todo 제목을 입력해주세요." />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">내용</Label>
          <Textarea id="description" placeholder="Todo 설명을 입력해주세요." />
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
