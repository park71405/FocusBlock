import { useState } from "react";
import TaskHeader from "./Home/TaskHeader";
import { TaskList } from "./Home/TaskList";
import { DailyFocusList } from "./Home/DailyFocusList";
import { TimeBlock } from "./Home/TimeBlock";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useFocusTask } from "../hooks/useFocusTask";
import { useTimeBoxTask } from "../hooks/useTimeBoxTask";
import { focusTaskApi } from "../api/focusTaskApi";
import { timeBoxTaskApi } from "../api/timeBoxTaskApi";
import type { TaskResponse } from "../types/task";

function Home() {

    const [sysDate, setSysDate] = useState(new Date());
    const [filter, setFilter] = useState('all');
    const { focusTaskList, error: focusError, refreshFocusTasks } = useFocusTask({ sysDate });
    const { timeBoxTaskList, error: timeBoxError, refreshTimeBoxTasks } = useTimeBoxTask({ sysDate });

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

        const task = active.data.current?.task as TaskResponse;
        if (!task) return;

        // TaskFilterList → TimeBlock 타임박싱 드롭
        if (overId === "timeboxing-drop-zone") {
            const now = new Date();
            const roundedMin = now.getMinutes() < 30 ? 0 : 30;
            const startTime = `${String(now.getHours()).padStart(2, "0")}:${String(roundedMin).padStart(2, "0")}`;
            const toDate = new Date(now);
            toDate.setMinutes(roundedMin + 60, 0, 0);
            const endHour = toDate.getHours() > 23 ? 23 : toDate.getHours();
            const endMin = toDate.getHours() > 23 ? 30 : toDate.getMinutes();
            const endTime = `${String(endHour).padStart(2, "0")}:${String(endMin).padStart(2, "0")}`;

            try {
                const status = await timeBoxTaskApi.createTimeBoxTasks({
                    taskNo: task.no,
                    blockDate: sysDate.toISOString().split("T")[0],
                    startTime,
                    endTime,
                });
                if (status === 200 || status === 201) {
                    refreshTimeBoxTasks();
                }
            } catch (err) {
                console.error("타임박스 생성 실패:", err);
            }
            return;
        }

        // TaskFilterList → DailyFocusList 크로스 드롭
        const isOverDropZone = overId === "important-drop-zone" || overId.startsWith("focus-");
        if (!isOverDropZone) return;

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
                            <TaskList sysDate={sysDate} filter={filter} changeFilter={setFilter} />
                        </section>
                        <section className="col-span-5 flex flex-col gap-5">
                            {/* 여기에 할일 3가지랑, 타임박싱 */}
                            <DailyFocusList
                                sysDate={sysDate}
                                focusTaskList={focusTaskList}
                                error={focusError}
                                refreshFocusTasks={refreshFocusTasks}
                            />
                            <TimeBlock
                                sysDate={sysDate}
                                timeBoxTaskList={timeBoxTaskList}
                                error={timeBoxError}
                                refreshTimeBoxTasks={refreshTimeBoxTasks}
                            />
                        </section>
                    </div>
                </DndContext>
            </div>
        </main>
    )
}

export default Home;