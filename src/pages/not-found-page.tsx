import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-400 mx-auto px-10 flex flex-col gap-4 py-20">
      <h1 className="text-center">404 - 페이지를 찾을 수 없습니다</h1>
      <Button variant="secondary" onClick={() => navigate("/")}>
        홈으로 가기
      </Button>
    </div>
  );
};

export default NotFoundPage;
