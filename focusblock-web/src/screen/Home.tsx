import { useState } from "react";
import { useAuth } from "../component/context/AuthProvider";
import TaskHeader from "./Home/TaskHeader";
import { TaskList } from "./Home/TaskList";
import { DailyFocusList } from "./Home/DailyFocusList";
import { TimeBlock } from "./Home/TimeBlock";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useFocusTask } from "../hooks/useFocusTask";
import { focusTaskApi } from "../api/focusTaskApi";
import type { TaskResponse } from "../types/task";

function Home() {

    const { logout } = useAuth();
    const [sysDate, setSysDate] = useState(new Date());
    const { focusTaskList, error: focusError, refreshFocusTasks } = useFocusTask({ sysDate });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        // DailyFocusList 내부 순서 변경
        if (activeId.startsWith("focus-")) {
            if (activeId === overId) return;

            const oldIndex = focusTaskList.findIndex(ft => `focus-${ft.focus_no}` === activeId);
            const newIndex = focusTaskList.findIndex(ft => `focus-${ft.focus_no}` === overId);
            if (oldIndex === -1 || newIndex === -1) return;

            const reordered = arrayMove([...focusTaskList], oldIndex, newIndex);

            try {
                const status = await focusTaskApi.updateFocusTasks({
                    focusTasks: reordered.map((ft, idx) => ({
                        focusNo: ft.focus_no,
                        priorityOrder: idx + 1,
                    })),
                });
                if (status === 200) {
                    refreshFocusTasks();
                }
            } catch (err) {
                console.error("Focus task 순서 변경 실패:", err);
            }
            return;
        }

        // TaskFilterList → DailyFocusList 크로스 드롭
        const isOverDropZone = overId === "important-drop-zone" || overId.startsWith("focus-");
        if (!isOverDropZone) return;

        const task = active.data.current?.task as TaskResponse;
        if (!task) return;

        const alreadyExists = focusTaskList.some(ft => ft.task.no === task.no);
        if (alreadyExists) return;

        const maxList = focusTaskList.length >= 3 ? true : false;
        if(maxList) return;

        const priorityOrder = focusTaskList.length + 1;

        try {
            const status = await focusTaskApi.createFocusTasks({
                taskNo: task.no,
                focusDate: sysDate.toISOString().split("T")[0],
                priorityOrder,
            });
            if (status === 201 || status === 200) {
                refreshFocusTasks();
            }
        } catch (err) {
            console.error("Focus task 생성 실패:", err);
        }
    };

    return (
        <main className="flex h-screen w-full flex-col bg-[#FCFBF8]">
            <TaskHeader sysDate={sysDate} onDateChange={setSysDate} />
            <div className="w-full h-full bg-[#fafafa] p-6">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-10 gap-5 h-full">
                        <section className="col-span-5 bg-[#FEFDFD] rounded-2xl border border-gray-200">
                            {/* 여기에 할 일 목록이 들어갈 예정*/}
                            <TaskList sysDate={sysDate} />
                        </section>
                        <section className="col-span-5 flex flex-col gap-5">
                            {/* 여기에 할일 3가지랑, 타임박싱 */}
                            <DailyFocusList
                                sysDate={sysDate}
                                focusTaskList={focusTaskList}
                                error={focusError}
                                refreshFocusTasks={refreshFocusTasks}
                            />
                            <TimeBlock sysDate={sysDate} />
                        </section>
                    </div>
                </DndContext>
            </div>
            <button onClick={logout}>로그아웃</button>
            
        </main>
    )
}

export default Home;