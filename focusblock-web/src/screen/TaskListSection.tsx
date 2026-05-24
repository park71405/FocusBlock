import { useState, type JSX } from "react";
import { Card, CardContent } from "../component/ui/card";
import { Checkbox } from "../component/ui/checkbox";
import { Badge } from "../component/ui/badge";
import { Separator } from "../component/ui/separator";
import { cn } from "../lib/utils";
import { interText, taskSecondaryText, taskBadgeBase } from "../lib/styles";
import { type TaskResponse } from "../types/task";
import { taskApi } from "../api/taskApi";
import { AddTaskModal } from "../component/AddTaskModal";

interface TaskListSectionProps {
    taskList: TaskResponse[];
    isLoading: boolean;
    error: string | null;
    onUpdated?: () => void;
}

export const TaskListSection = ({ taskList, isLoading, error, onUpdated }: TaskListSectionProps): JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateTaskInfo, setUpdateTaskInfo] = useState<TaskResponse | null>(null);

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
        console.log("update task", task.no);

        setIsModalOpen(true);
        setUpdateTaskInfo(task);
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
            <section aria-label="Task list" className="relative min-h-0 w-full flex-1">
                <Card className={`flex h-full w-full flex-col overflow-hidden rounded-2xl border-0 bg-[#ffffffd9] shadow-[0px_4px_16px_#33332d14] ${isLoading?"animate-pulse":""}`}>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        <div className="flex w-full flex-col">
                            <div>
                                <article className={`flex w-full items-center gap-4 px-4 py-4.5 sm:px-7 sm:py-5.5 bg-[#ffffff80]`}>
                                    <Checkbox
                                        checked={true}
                                        className={`mt-0 h-5.5 w-5.5 rounded-full border-2 shadow-none data-[state=checked]:bg-[#c2c9b8] data-[state=checked]:text-transparent `}
                                    >
                                    </Checkbox>
                                </article>
                            </div>
                            <Separator className="h-px w-full bg-[#c2c6c959]" />
                            {taskList.map((task, index) => (
                                <div key={`${task.category}-${task.date}-${index}`}>
                                    <article className={`flex w-full items-center gap-4 px-4 py-4.5 sm:px-7 sm:py-5.5 "bg-[#ffffffe6]"`}>
                                        <Checkbox
                                            checked={task.completed}
                                            aria-label={
                                                task.title ? `Mark ${task.title} as completed`
                                                : "Completed task"
                                            }
                                            onClick={()=>updateCompleted(task.no, task.completed)}
                                            className={`mt-0 h-5.5 w-5.5 rounded-full border-2 shadow-none data-[state=checked]:border-[#c2c9b8] data-[state=checked]:bg-[#c2c9b8] data-[state=checked]:text-transparent ${task.completed ? "border-[#c2c9b8]" : "border-[#c2c6c9]"}`}
                                        />
                                        <div className="min-w-0 flex-1" onClick={()=>updateTask(task)}>
                                            {task.title ? (
                                                <div className="flex min-w-0 flex-col items-start gap-1.25">
                                                    <h3 className={cn("min-w-0 text-sm font-medium text-[#3c3a38]", interText)}>
                                                        {task.title}
                                                    </h3>
                                                    <p className={cn("min-w-0", taskSecondaryText)}>
                                                        {task.description}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="h-full min-h-5.5" />    
                                            )}
                                        </div>
                                        <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                                            <Badge
                                                variant="secondary"
                                                className={cn(taskBadgeBase, "rounded-md px-2 py-0.75", "bg-[#c2c9b847]", "text-[#797570]")}
                                            >
                                                {task.category}
                                            </Badge>
                                            <time className={taskSecondaryText}>
                                                {task.date}
                                            </time>
                                            <Badge className={cn(taskBadgeBase, "rounded-[7px] px-2.5 py-1", "bg-[#ecdfd0]", "text-[#3c3a38]")}>
                                                {task.priority}
                                            </Badge>
                                        </div>
                                    </article>
                                    {index < taskList.length - 1 && (
                                        <Separator className="h-px w-full bg-[#c2c6c959]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent> 
                </Card> 
            </section>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdded={onUpdated}
                updateTaskInfo={updateTaskInfo}
            />
        </>
    );
};