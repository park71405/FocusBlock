import { type JSX } from "react";
import { Card, CardContent } from "../component/ui/card";
import { Alert } from "@material-tailwind/react";
import { Checkbox } from "../component/ui/checkbox";
import { Badge } from "../component/ui/badge";
import { Separator } from "../component/ui/separator";
import { cn } from "../lib/utils";
import { interText, taskSecondaryText, taskBadgeBase } from "../lib/styles";
import { useTask } from "../hooks/useTask";

export const TaskListSection = (): JSX.Element => {

    const { taskList, isLoading, error } = useTask();

    if(isLoading) {
        return (
            <button type="button" className="bg-indigo-500 ..." disabled>
                <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
                Processing…
            </button>
        )
    }

    if(error) {
        return (
            <Alert icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}  stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                </svg>}>
                {error}
            </Alert>
        )
    }

    return (
        <section aria-label="Task list" className="relative min-h-0 w-full flex-1">
            <Card className="flex h-full w-full flex-col overflow-hidden rounded-2xl border-0 bg-[#ffffffd9] shadow-[0px_4px_16px_#33332d14]">
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
                                        className={`mt-0 h-5.5 w-5.5 rounded-full border-2 shadow-none data-[state=checked]:border-[#c2c9b8] data-[state=checked]:bg-[#c2c9b8] data-[state=checked]:text-transparent ${task.completed ? "border-[#c2c9b8]" : "border-[#c2c6c9]"}`}
                                    />
                                    <div className="min-w-0 flex-1">
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
    );
};