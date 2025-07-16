import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
const TodoPage = () => {
  return (
    <div>
      <h1>투두 상세</h1>
      <Card>
        <p>title</p>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">제목</Label>
          <Input id="title" placeholder="제목을 입력해주세요." />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">설명</Label>
          <Textarea id="description" placeholder="내용을 입력해주세요." />
        </div>
        <div className="flex justify-center items-center gap-1">
          <Button variant="outline">수정하기</Button>
          <Button variant="secondary">삭제하기</Button>
        </div>
      </Card>
    </div>
  );
};

export default TodoPage;
