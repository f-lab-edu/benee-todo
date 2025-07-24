import { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodos from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { NewTodo } from "@/types/todo-type";

const ModifyTodoBox = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { isLoading, getTodoById, modifyTodo, deleteTodo } = useTodos();

  const handleUpdate = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!params.id) {
      alert("잘못된 요청입니다.");
      return;
    }

    const newTodo: NewTodo = {
      title,
      description,
    };

    modifyTodo(params.id, newTodo);
    alert("성공적으로 수정되었습니다.");
    navigate("/");
  };

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!params.id) {
      alert("잘못된 요청입니다.");
      return;
    }

    deleteTodo(params.id);
    alert("성공적으로 삭제되었습니다.");
    navigate("/");
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const initialTodo = getTodoById(params.id ?? "");
    if (!initialTodo) {
      alert("Todo 데이터가 올바르지 않습니다.");
      navigate("/");
    } else {
      setTitle(initialTodo.title);
      setDescription(initialTodo.title);
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card className="px-4">
        <form action="submit" onSubmit={handleUpdate}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              placeholder="제목을 입력해주세요."
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              placeholder="내용을 입력해주세요."
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center gap-1">
            <Button variant="outline" type="submit">
              수정하기
            </Button>
            <Button variant="secondary" type="button" onClick={handleDelete}>
              삭제하기
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ModifyTodoBox;
