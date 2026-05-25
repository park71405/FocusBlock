import { useEffect, useState, type JSX } from "react";


export const TimeBlock = ({ sysDate }: { sysDate: Date}): JSX.Element => {

    const [timeLeft, setTimeLeft] = useState<number>(getMsUntilEndOfDay());

    useEffect(() => {

        const timerId = setInterval(() => {
            const remaining = getMsUntilEndOfDay();
            
            if (remaining <= 0) {
                // 날짜가 바뀌면 다시 다음 자정까지의 시간으로 갱신
                setTimeLeft(getMsUntilEndOfDay());
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="h-1/2 bg-[#FEFDFD] rounded-2xl border border-[#dceeee] p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                남은 시간 타임박싱
            </h3>
            <p className="text-sm text-gray-500 font-medium mb-5">
                {formatTime(timeLeft)}
            </p>
            <div className="space-y-3">

            </div>
        </div>
    )

}

// 현재 시점부터 오늘 자정(24:00:00)까지 남은 밀리초(ms)를 계산하는 함수
const getMsUntilEndOfDay = (): number => {
    const now = new Date();

    const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // 내일로 날짜를 넘김
        0, 0, 0, 0         // 0시 0분 0초 0ms
    );

    return midnight.getTime() - now.getTime();
};

// 밀리초를 시, 분, 초 문자열로 포맷팅
const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `남은 시간 ${paddedHours}시간 ${paddedMinutes}분 ${paddedSeconds}초`;
};