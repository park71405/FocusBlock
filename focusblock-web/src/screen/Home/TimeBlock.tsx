import { useEffect, useState, type JSX } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "../../lib/utils";
import type { TimeBoxTaskResponse } from "../../types/task";
import { timeBoxTaskApi } from "../../api/timeBoxTaskApi";

interface TimeBlockProps {
    sysDate: Date;
    timeBoxTaskList: TimeBoxTaskResponse[];
    error: string | null;
    refreshTimeBoxTasks: () => void;
}

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2);
    const m = i % 2 === 0 ? "00" : "30";
    return `${String(h).padStart(2, "0")}:${m}`;
});

interface TimeBlockItemProps {
    tb: TimeBoxTaskResponse;
    onDelete: (blockNo: number) => void;
    onUpdated: () => void;
}

const TimeBlockItem = ({ tb, onDelete, onUpdated }: TimeBlockItemProps) => {
    const [from, setFrom] = useState(tb.startTime);
    const [to, setTo] = useState(tb.endTime);

    const handleTimeChange = async (field: "startTime" | "endTime", value: string) => {
        const newFrom = field === "startTime" ? value : from;
        const newTo   = field === "endTime"   ? value : to;

        if (field === "startTime") setFrom(value);
        else setTo(value);

        try {
            const status = await timeBoxTaskApi.updateTimeBoxTasks({
                blockNo: tb.blockNo,
                startTime: newFrom,
                endTime: newTo,
            });
            if (status === 200) {
                onUpdated();
            }
        } catch (err) {
            console.error("타임박스 시간 수정 실패:", err);
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3">
            <select
                value={from}
                onChange={e => handleTimeChange("startTime", e.target.value)}
                className="border rounded-lg px-2 py-1 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#aad4d4]"
            >
                {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="text-gray-400">~</span>
            <select
                value={to}
                onChange={e => handleTimeChange("endTime", e.target.value)}
                className="border rounded-lg px-2 py-1 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#aad4d4]"
            >
                {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="text-sm text-gray-700 flex-1 min-w-0 truncate">
                {tb.task.title}
            </span>
            <button
                className="text-gray-400 hover:text-red-400 shrink-0"
                onClick={() => onDelete(tb.blockNo)}
            >
                ✕
            </button>
        </div>
    );
};

export const TimeBlock = ({ timeBoxTaskList, error, refreshTimeBoxTasks }: TimeBlockProps): JSX.Element => {

    const [timeLeft, setTimeLeft] = useState<number>(getMsUntilEndOfDay());
    const { setNodeRef, isOver } = useDroppable({ id: "timeboxing-drop-zone" });

    const deleteTimeBoxTask = async (blockNo: number) => {
        if(!blockNo) return;
        try {
            const status = await timeBoxTaskApi.deleteTimeBoxTasks(blockNo);
            if (status == 204) {
                refreshTimeBoxTasks();
            }
        } catch (err) {
            console.error("Daily Focus 태스크 삭제 실패:", err);
        }
    };

    useEffect(() => {
        const timerId = setInterval(() => {
            const remaining = getMsUntilEndOfDay();
            setTimeLeft(remaining <= 0 ? getMsUntilEndOfDay() : remaining);
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    if (error) {
        return (
            <div role="alert">
                <div className="border border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="h-1/2 bg-[#FEFDFD] rounded-2xl border border-[#dceeee] p-5 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                남은 시간 타임박싱
            </h3>
            <p className="text-sm text-gray-500 font-medium mb-5">
                {formatTime(timeLeft)}
            </p>
            <div
                id="timeboxing-drop-zone"
                ref={setNodeRef}
                className={cn(
                    "space-y-3 min-h-16 rounded-xl transition-colors",
                    isOver ? "bg-[#eef7f7] ring-2 ring-[#aad4d4] ring-dashed" : ""
                )}
            >
                {timeBoxTaskList.map(tb => (
                    <TimeBlockItem key={tb.blockNo} tb={tb} onDelete={deleteTimeBoxTask} onUpdated={refreshTimeBoxTasks} />
                ))}
                {timeBoxTaskList.length === 0 && !isOver && (
                    <p className="text-center text-sm text-gray-300 py-4">
                        할일을 여기로 드래그하세요
                    </p>
                )}
            </div>
        </div>
    );
};

const getMsUntilEndOfDay = (): number => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return midnight.getTime() - now.getTime();
};

const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `남은 시간 ${String(hours).padStart(2, "0")}시간 ${String(minutes).padStart(2, "0")}분 ${String(seconds).padStart(2, "0")}초`;
};
