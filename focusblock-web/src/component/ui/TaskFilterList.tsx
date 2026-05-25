import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { interText, taskBadgeBase, taskSecondaryText } from "../../lib/styles";
import { cn } from "../../lib/utils";
import { ToggleGroupItem } from "./toggle-group";
import { useState, type JSX } from "react";
import { Card, CardContent } from "./card";
import type { TaskResponse } from "../../types/task";
import { taskApi } from "../../api/taskApi";
import { Checkbox } from "./checkbox";
import { Badge } from "./badge";
import { Separator } from "./separator";

const tabs = [
    { label: "All", count: "12", value: "all"},
    { label: "UnFinished", count: "5", value: "today"},
    { label: "Complete", count: "3", value: "complete"},
];

interface TaskFilterListProps {
    taskList: TaskResponse[];
    isLoading: boolean;
    error: string | null;
    onUpdated?: () => void;
}

export const TaskFilterList = ({ taskList, isLoading, error, onUpdated }: TaskFilterListProps): JSX.Element => {

    const [selectedTab, setSelectedTab] = useState("all");
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
        setIsModalOpen(true);
        setUpdateTaskInfo(task);
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
                        <CardContent className="flex-1 overflow-y-auto p-0">
                            <div className="flex w-full flex-col">
                                {taskList.map((task, index) => (
                                    <div key={`${task.category}-${task.date}-${index}`}>
                                        <article className={`flex w-full items-center gap-4 px-4 py-4.5 sm:px-7 sm:py-5.5 "bg-[#ffffffe6]"`}>
                                            <Checkbox
                                                checked={task.completed}
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
                                                ) : (<div className="h-full min-h-5.5" />)}
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                                                <Badge
                                                variant="secondary"
                                                className={cn(taskBadgeBase, "rounded-md px-2 py-0.75", "bg-[#c2c9b847]", "text-[#797570]")}
                                            >
                                                {task.category}
                                            </Badge>
                                            <time className={taskSecondaryText}>{task.date}</time>
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
            </div>
        </>
    )

}