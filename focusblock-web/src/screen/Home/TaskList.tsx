import { useState, type JSX } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { Button } from "../../component/ui/button";
import { TaskFilterList } from "./TaskFilterList";
import { useTask } from "../../hooks/useTask";
import type { TaskResponse } from "../../types/task";

export const TaskList = ({ sysDate }: { sysDate: Date }): JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateTaskInfo, setUpdateTaskInfo] = useState<TaskResponse | null>(null);
    const { taskList, isLoading, error, refreshTasks } = useTask({sysDate});

    return (
        <>
            <header className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                        전체 할일 목록
                    </h2>
                    <span className="px-2 py-0.5 text-xs rounded-md bg-[#c2c9b8] text-white font-medium">
                        12
                    </span>
                </div>
                <Button 
                    variant="ghost" 
                    className="px-4 py-2 rounded-md border bg-[#c2c9b8] border-[#c2c9b8] text-white text-sm font-medium hover:bg-[#6a7c5a] transition"
                    onClick={() => {setIsModalOpen(true); setUpdateTaskInfo(null);}}
                >
                    + 할일 추가
                </Button>
            </header>
            <div className="p-5">
                <TaskFilterList 
                    taskList={taskList} 
                    isLoading={isLoading} 
                    error={error}
                    setIsModalOpen={setIsModalOpen}
                    setUpdateTaskInfo={setUpdateTaskInfo}
                    onUpdated={refreshTasks}
                />
            </div>
            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdded={refreshTasks}
                updateTaskInfo={updateTaskInfo}
                sysDate={sysDate}
            />
        </>
    )
};