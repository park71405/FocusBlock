import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { interText } from "../../lib/styles";
import { cn } from "../../lib/utils";
import { ToggleGroupItem } from "../../component/ui/toggle-group";
import { useState, type JSX } from "react";
import { Card, CardContent } from "../../component/ui/card";
import type { TaskResponse } from "../../types/task";
import { taskApi } from "../../api/taskApi";
import { DraggableTaskItem } from "./DraggableTaskItem";

const tabs = [
    { label: "All", count: "12", value: "all"},
    { label: "UnFinished", count: "5", value: "UnFinished"},
    { label: "Complete", count: "3", value: "Complete"},
];

interface TaskFilterListProps {
    taskList: TaskResponse[];
    isLoading: boolean;
    error: string | null;
    setIsModalOpen: (isOpen: boolean) => void;
    setUpdateTaskInfo: (taskInfo: TaskResponse | null) => void;
    onUpdated?: () => void;
}

export const TaskFilterList = ({ taskList, isLoading, error, setIsModalOpen, setUpdateTaskInfo, onUpdated }: TaskFilterListProps): JSX.Element => {


    const [selectedTab, setSelectedTab] = useState("all");
    
    const updateCompleted = async (no: number, completed: boolean) => {
        console.log("update completed", no , completed);
        try {
            const status = await taskApi.updateCompleted(no, {completeYn: completed ? "Y" : "N"});

            if(status === 200) {
                onUpdated?.();
            }
        } catch (err) {
            console.error("태스크 생성 실패:", err);
        }
    };

    const updateTask = (task: TaskResponse) => {
        setIsModalOpen(true);
        setUpdateTaskInfo(task);
    }

    const fillteredTaskList = (value: string) => {
        console.log("fillteredTaskList", value);
    }

    if(error) {
        return (
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2" />
                 <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex gap-3 px-5 pb-4 border-b border-gray-100 text-sm">
                <section className="w-full">
                    <ToggleGroup
                        type="single"
                        value={selectedTab}
                        onValueChange={(value) => {
                            if(value) setSelectedTab(value);
                            fillteredTaskList(value);
                        }}
                        className="flex w-full flex-wrap items-center justify-start gap-1.5"
                    >
                        {tabs.map((tab) => {
                            const isActive = selectedTab === tab.value;

                            return (
                                <ToggleGroupItem
                                    key={tab.value}
                                    value={tab.value}
                                    className={`flex h-8 items-center rounded-md px-3  ${isActive ? "bg-[#C2CAB8] shadow-sm text-[#8D9C84]" : " text-[#7A7571] bg-[#D1CEC8] "}`}
                                >
                                    <span className="flex items-center gap-1.75">
                                        <span className={cn("mt-[-0.50px] text-[13px] font-normal", interText)}>
                                            {tab.label}
                                        </span>
                                    </span>
                                </ToggleGroupItem>
                            )
                        })}
                    </ToggleGroup>
                </section>
            </div>
            
            <div>
                <section aria-label="Task list" className="relative min-h-0 w-full flex-1">
                    <Card className={`flex h-full w-full flex-col overflow-hidden rounded-2xl border-0 bg-[#ffffffd9] shadow-[0px_4px_16px_#33332d14] ${isLoading?"animate-pulse":""}`}>
                        <CardContent className="flex-1 overflow-y-auto overflow-x-hidden p-0">
                            <div className="flex w-full flex-col">
                                {taskList.map((task, index) => (
                                    <DraggableTaskItem
                                        key={`${task.category}-${task.date}-${index}`}
                                        task={task}
                                        index={index}
                                        taskListLength={taskList.length}
                                        onComplete={updateCompleted}
                                        onEdit={updateTask}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </>
    )

}