import type { JSX } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "../../lib/utils";
import type { FocusTaskResponse } from "../../types/task";
import { focusTaskApi } from "../../api/focusTaskApi";
import { SortableFocusItem } from "./SortableFocusItem";

interface DailyFocusListProps {
    sysDate: Date;
    focusTaskList: FocusTaskResponse[];
    error: string | null;
    refreshFocusTasks: () => void;
}

export const DailyFocusList = ({ focusTaskList, error, refreshFocusTasks }: DailyFocusListProps): JSX.Element => {

    const { setNodeRef, isOver } = useDroppable({ id: "important-drop-zone" });

    const deleteDailyFocusTask = async (focusTask: FocusTaskResponse) => {
        if (!focusTask) return;
        try {
            const status = await focusTaskApi.deleteDailyFocusTask(focusTask.focus_no);
            if (status == 204) {
                refreshFocusTasks();
            }
        } catch (err) {
            console.error("Daily Focus 태스크 삭제 실패:", err);
        }
    };

    if (error) {
        return (
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2" />
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    {error}
                </div>
            </div>
        );
    }

    const sortableIds = focusTaskList.map(ft => `focus-${ft.focus_no}`);

    return (
        <div className="h-1/2 bg-[#FEFDFD] rounded-2xl border border-[#f3dede] p-5 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                오늘의 가장 중요한 할일 3가지
            </h3>
            <div
                id="important-drop-zone"
                ref={setNodeRef}
                className={cn(
                    "space-y-3 min-h-24 rounded-xl transition-colors",
                    isOver ? "bg-[#f0f7ee] ring-2 ring-[#c2c9b8] ring-dashed" : ""
                )}
            >
                <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
                    {focusTaskList.map((focusTask, idx) => (
                        <SortableFocusItem
                            key={focusTask.focus_no}
                            focusTask={focusTask}
                            idx={idx}
                            onDelete={deleteDailyFocusTask}
                        />
                    ))}
                </SortableContext>
                {focusTaskList.length === 0 && !isOver && (
                    <p className="text-center text-sm text-gray-300 py-6">
                        할일을 여기로 드래그하세요
                    </p>
                )}
            </div>
        </div>
    );
};
