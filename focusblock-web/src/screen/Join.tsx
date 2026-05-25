import React, { useState } from "react";
import { CheckCircle2, Clock3, ClipboardCheck} from "lucide-react";
import Feature from "../component/ui/Feature";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { joinApi } from "../api/authApi";


const Join: React.FC = () => {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await joinApi({ loginId, password, nickname, email })
            navigate("/login");
        } catch (error) {
            console.log("회원가입 실패:", error);
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                text: '회원가입에 실패했습니다. 다시 시도해주세요.',
            });
        }
    };

    return (
        <div className="min-h-screen flex bg-[#f8f5f2] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-purple-100 rounded-full opacity-60 -translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-100 rounded-full opacity-60 -translate-x-16 translate-y-16" />
            <div className="absolute top-20 right-0 w-40 h-40 bg-green-100 rounded-full opacity-60 translate-x-16" />
            <div className="absolute bottom-0 right-0 w-44 h-44 bg-blue-100 rounded-full opacity-60 translate-x-16 translate-y-16" />

            
            <div className="hidden lg:flex flex-col w-[45%] mx-10 px-20 pt-18 relative z-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                        집중하는 하루가,
                        <br />
                        더 나은 내일을 만듭니다.
                    </h1>
                    <p className="mt-3 text-gray-500 leading-relaxed text-lg font-semibold">
                        FocusBlock-ToDo와 함께
                        <br />
                        중요한 일에 집중하고 시간을 가치 있게 관리해보세요.
                    </p>

                    <div className="mt-3 flex items-center gap-8">
                        <div className="bg-white rounded-3xl shadow-md p-6 w-[320px]">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-gray-700">
                                오늘의 계획
                                </h3>
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { color: "bg-orange-100", time: "09:00" },
                                    { color: "bg-pink-100", time: "13:30" },
                                    { color: "bg-purple-100", time: "16:00" },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-md ${item.color}`}
                                        />
                                        <div>
                                            <div className="w-24 h-2 bg-gray-200 rounded-full mb-2" />
                                            <div className="w-16 h-2 bg-gray-100 rounded-full" />
                                        </div>
                                        </div>

                                        <span className="text-sm text-gray-400">
                                        {item.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#fff5ef] rounded-2xl shadow-md p-4 w-45">
                            <div className="flex items-center gap-1 mb-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                    <Clock3 className="w-5 h-5 text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        타임박싱으로
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        효율적인 하루
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-end gap-5 h-24">
                                <div className="w-4 h-10 bg-orange-200 rounded-md" />
                                <div className="w-4 h-16 bg-orange-300 rounded-md" />
                                <div className="w-4 h-20 bg-green-200 rounded-md" />
                                <div className="w-4 h-14 bg-orange-200 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 space-y-4">
                        <Feature
                            icon={<CheckCircle2 className="w-6 h-6 text-purple-400" />}
                            title="중요한 할 일에 집중"
                            desc="우선순위 설정으로 핵심 업무에 몰입하세요."
                            bg="bg-purple-100"
                        />
                        <Feature
                            icon={<Clock3 className="w-6 h-6 text-green-400" />}
                            title="시간을 가치 있게 관리"
                            desc="타임박싱으로 하루를 체계적으로 계획하세요."
                            bg="bg-green-100"
                        />

                            <Feature
                            icon={<ClipboardCheck className="w-6 h-6 text-orange-400" />}
                            title="성취를 기록하고 성장"
                            desc="완료한 일들을 통해 나의 성장을 확인하세요."
                            bg="bg-orange-100"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-10 px-6 lg:px-16 relative z-10 mx-10">
                <div className="w-full max-w-md bg-white rounded-4xl shadow-xl px-10 py-12">
                    <h2 className="text-3xl font-bold text-gray-800">회원가입</h2>

                    <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                        FocusBlock-ToDo를 시작하기 위해 정보를 입력해주세요.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                        <div>
                            <label className="block font-semibold text-base text-gray-700 mb-1">아이디</label>
                            <input
                                type="text"
                                placeholder="아이디를 입력하세요"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a8c5c]/30 focus:border-[#4a8c5c] transition"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-base text-gray-700 mb-1">비밀번호</label>
                            <input
                                type="password"
                                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a8c5c]/30 focus:border-[#4a8c5c] transition"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-base text-gray-700 mb-1">닉네임</label>
                            <input
                                type="nickname"
                                placeholder="닉네임을 입력하세요"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a8c5c]/30 focus:border-[#4a8c5c] transition"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-base text-gray-700 mb-1">이메일</label>
                            <input
                                type="email"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a8c5c]/30 focus:border-[#4a8c5c] transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#97AEA3] text-white text-lg font-semibold rounded-xl hover:bg-[#7f9289] transition mt-4"
                        >
                            회원가입
                        </button>
                    </form>

                    <div className="flex items-center gap-4 mt-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-sm text-gray-400">또는</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="mt-3">
                        <p className="text-center text-sm text-gray-400">
                            이미 계정이 있으신가요?{" "}
                            <span className="text-[#7fa08b] font-medium cursor-pointer" onClick={() => navigate('/login')}>
                                로그인
                            </span>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default Join;