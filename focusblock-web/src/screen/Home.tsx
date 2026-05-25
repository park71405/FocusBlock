import { useState } from "react";
import { useAuth } from "../component/context/AuthProvider";
import TaskHeader from "../component/ui/TaskHeader";
import { TaskList } from "../component/ui/TaskList";


function Home() {

    const { user, logout } = useAuth();
    const [sysDate, setSysDate] = useState(new Date());

    return (
        <main className="flex h-screen w-full flex-col bg-[#FCFBF8]">
            <TaskHeader sysDate={sysDate} onDateChange={setSysDate} />
            <div className="w-full h-full bg-[#fafafa] p-6">
                <div className="grid grid-cols-10 gap-5 h-full">
                    <section className="col-span-5 bg-[#FEFDFD] rounded-2xl border border-gray-200">
                        {/* 여기에 할 일 목록이 들어갈 예정*/}
                        <TaskList sysDate={sysDate} />
                    </section>
                    <section className="col-span-4 flex flex-col gap-5">
                        {/* 여기에 할일 3가지랑, 타임박싱 */}
                        <h2>메인 화면 (인증 완료)</h2>
                        <p>환영합니다, <strong>{user?.nickname}</strong>님!</p>
                        <button onClick={logout}>로그아웃</button>
                    </section>
                </div>
            </div>
            
        </main>
    )
}

export default Home;