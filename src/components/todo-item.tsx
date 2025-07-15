import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const TodoItem = () => {
  return (
    <Card className="flex justify-start items-center flex-row gap-1 px-4">
      투두 내용
      <Button variant="outline">
        <Link to="/todo/1">수정</Link>
      </Button>
      <Button variant="outline">삭제</Button>
    </Card>
  );
};

export default TodoItem;
