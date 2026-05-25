
import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";
import { interText } from "../lib/styles";
import { cn } from "../lib/utils";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className={cn("flex h-screen w-full bg-[#f5efe8]", interText)}>
            <div className="m-auto flex flex-col items-center gap-4">
                <h1 className="text-9xl font-bold">404</h1>
                <p className="text-3xl font-semibold">페이지를 찾을 수 없어요</p>
                <p>
                    입력하신 주소가 잘못되었거나, <br />
                    페이지가 이동되었을 수 있습니다.
                </p>
                <Button 
                    type="button" 
                    variant="ghost" 
                    className="shrink-0 font-medium bg-[#7a8c6a] text-white hover:bg-[#6a7c5a]"
                    onClick={() => navigate("/")}
                >
                    홈으로 이동
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage