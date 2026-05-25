import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/context/AuthProvider";
import { loginApi } from "../api/authApi";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // Spring Boot 로그인 API 호출
        const data = await loginApi({ loginId, password });

        // Context 업데이트 및 토큰 저장
        login(data.accessToken, data.userInfo);
        navigate("/");
    } catch (error) {
        console.log("로그인 실패:", error);
        Swal.fire({
            icon: 'error',
            title: '로그인 실패',
            text: '아이디 또는 비밀번호가 올바르지 않습니다.',
        });
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f0e8] relative overflow-hidden">
        <div className="absolute -bottom-15 -left-15 w-48 h-48 rounded-full bg-[#b8d4b0] opacity-60" />
        <div className="absolute -bottom-7.5 left-30 w-24 h-24 rounded-full bg-[#c8e0c0] opacity-40" />
        <div className="absolute -bottom-15 -right-10 w-56 h-56 rounded-full bg-[#c9b8d4] opacity-50" />
        <div className="absolute bottom-15 right-45 w-20 h-20 rounded-full bg-[#d4c9a8] opacity-40" />
        <div className="absolute bottom-[40%] -left-5 w-12 h-12 rounded-full bg-[#a8c4a0] opacity-30" />

        <div className="hidden lg:flex flex-col w-[45%] mx-10 px-20 py-18 relative z-10">
            <div className="flex flex-col items-center justify-center gap-3 py-5">
                <div className="w-13 h-13 rounded-l-md bg-[#E9F2EF] flex items-center justify-center shadow-md">
                    <FaCheck className="text-[#77A59C] text-xl" />
                </div>
                <div className="flex items-baseline gap-0.5 pt-2">
                    <span className="text-4xl font-bold text-gray-800">FocusBlock</span>
                    <span className="text-4xl font-bold text-[#4a8c5c]">-ToDo</span>
                </div>
                <p className="text-gray-500 text-sm ml-1 font-semibold">중요한 일에 집중하고, 시간을 가치 있게.</p>
            </div>

            <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-between p-4 rounded-xl shadow-sm bg-[#FAF7FD]">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-[#F2ECF9] border-[#D9CBEB]"> 
                            <div className="w-4 h-4 rounded-md border-2 border-[#D9CBEB]" />
                        </div>
                        <div className="flex flex-col gap-2 flex-1 max-w-[60%]">
                            <div className="h-2.5 w-full rounded-full bg-[#D9CBEB]" />
                            <div className="h-2.5 w-2/3 rounded-full bg-[#D9CBEB]" />
                        </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-[#D9CBEB]" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl shadow-sm bg-[#FDF8F5]">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-[#FAF0E8] border-[#ECD7C5]"> 
                            <div className="w-4 h-4 rounded-md border-2 border-[#ECD7C5]" />
                        </div>
                        <div className="flex flex-col gap-2 flex-1 max-w-[60%]">
                            <div className="h-2.5 w-full rounded-full bg-[#ECD7C5]" />
                            <div className="h-2.5 w-2/3 rounded-full bg-[#ECD7C5]" />
                        </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-[#ECD7C5]" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl shadow-sm bg-[#F5FAF8]">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-[#EAF4F1] border-[#C6E2DA]"> 
                            <div className="w-4 h-4 rounded-md border-2 border-[#C6E2DA]" />
                        </div>
                        <div className="flex flex-col gap-2 flex-1 max-w-[60%]">
                            <div className="h-2.5 w-full rounded-full bg-[#C6E2DA]" />
                            <div className="h-2.5 w-2/3 rounded-full bg-[#C6E2DA]" />
                        </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-[#C6E2DA]" />
                </div>
            </div>

            <div className="flex items-center gap-3 p-4 mx-20 mt-2 bg-gray-50 rounded-2xl">
                <MdAccessTime className="text-4xl text-[#78B5AB]" />
                <p className="text-gray-500 font-semibold text-sm">타임박싱으로 하루를 더 효율적으로</p>
            </div>

        </div>

        <div className="flex-1 flex flex-col justify-between py-10 px-6 lg:px-16 relative z-10 mr-10">
            <div className="flex-1 flex flex-col justify-center w-full mx-auto bg-[#FEFEFE] rounded-2xl">
                <div className="mx-15 mt-15">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
                    <p className="text-sm font-semibold text-gray-400">계정에 로그인하여 나의 할 일 관리 해봐요.</p>
                </div>

                <form onSubmit={handleSubmit} className="m-15 space-y-4">
                    <div>
                        <label className="block font-semibold text-base text-gray-700 mb-1.5">아이디</label>
                        <input
                            type="text"
                            placeholder="아이디를 입력하세요"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a8c5c]/30 focus:border-[#4a8c5c] transition"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-base text-gray-700 mb-1.5">비밀번호</label>
                        <input
                            type='password'
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a8c5c]/30 focus:border-[#4a8c5c] transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#97AEA3] text-white text-lg font-semibold rounded-xl hover:bg-[#7f9289] transition mt-4"
                    >
                        로그인
                    </button>

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">또는</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        계정이 없으신가요?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-gray-700 font-medium hover:underline"
                        >
                            회원가입
                        </button>
                    </p>

                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
