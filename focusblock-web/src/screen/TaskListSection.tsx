import type { JSX } from "react";
import { Card, CardContent } from "../component/ui/card";
import { Checkbox } from "../component/ui/checkbox";
import { Badge } from "../component/ui/badge";
import { Separator } from "../component/ui/separator";
import { cn } from "../lib/utils";
import { interText, taskSecondaryText, taskBadgeBase } from "../lib/styles";

const tasks = [
    {
        completed: true,
        title: "",
        description: "",
        category: "Design",
        date: "May 3",
        priority: "Completed",
        rowBackground: "bg-[#ffffff80]",
        categoryBackground: "bg-[#c5cdd547]",
        categoryText: "text-[#797570]",
        priorityBackground: "bg-[#c2c9b8]",
        priorityText: "text-white",
    },
    {
        completed: false,
        title: "Setup backend API",
        description: "Implement JWT auth with refresh tokens rotation",
        category: "Dev",
        date: "May 7",
        priority: "High",
        rowBackground: "bg-[#ffffffe6]",
        categoryBackground: "bg-[#c2c9b847]",
        categoryText: "text-[#797570]",
        priorityBackground: "bg-[#ecdfd0]",
        priorityText: "text-[#3c3a38]",
    },
    {
        completed: false,
        title: "Write unit tests",
        description: "Outline goals and scope of unit testing for the project",
        category: "Writing",
        date: "May 10",
        priority: "Medium",
        rowBackground: "bg-[#ffffffe6]",
        categoryBackground: "bg-[#c2c9b847]",
        categoryText: "text-[#797570]",
        priorityBackground: "bg-[#ecdfd0]",
        priorityText: "text-[#3c3a38]",
    },
    {
        completed: false,
        title: "Write unit tests",
        description: "Outline goals and scope of unit testing for the project",
        category: "Writing",
        date: "May 10",
        priority: "Medium",
        rowBackground: "bg-[#ffffffe6]",
        categoryBackground: "bg-[#c2c9b847]",
        categoryText: "text-[#797570]",
        priorityBackground: "bg-[#ecdfd0]",
        priorityText: "text-[#3c3a38]",
    },
    {
        completed: false,
        title: "Write unit tests",
        description: "Outline goals and scope of unit testing for the project",
        category: "Writing",
        date: "May 10",
        priority: "Medium",
        rowBackground: "bg-[#ffffffe6]",
        categoryBackground: "bg-[#c2c9b847]",
        categoryText: "text-[#797570]",
        priorityBackground: "bg-[#ecdfd0]",
        priorityText: "text-[#3c3a38]",
    },
    {
        completed: false,
        title: "Write unit tests",
        description: "Outline goals and scope of unit testing for the project",
        category: "Writing",
        date: "May 10",
        priority: "Medium",
        rowBackground: "bg-[#ffffffe6]",
        categoryBackground: "bg-[#c2c9b847]",
        categoryText: "text-[#797570]",
        priorityBackground: "bg-[#ecdfd0]",
        priorityText: "text-[#3c3a38]",
    },
    {
        completed: false,
        title: "Write unit tests",
        description: "Outline goals and scope of unit testing for the project",
        category: "Writing",
        date: "May 10",
        priority: "Medium",
        rowBackground: "bg-[#ffffffe6]",
        categoryBackground: "bg-[#c2c9b847]",
        categoryText: "text-[#797570]",
        priorityBackground: "bg-[#ecdfd0]",
        priorityText: "text-[#3c3a38]",
    }
];

export const TaskListSection = (): JSX.Element => {
    return (
        <section aria-label="Task list" className="relative min-h-0 w-full flex-1">
            <Card className="flex h-full w-full flex-col overflow-hidden rounded-2xl border-0 bg-[#ffffffd9] shadow-[0px_4px_16px_#33332d14]">
                <CardContent className="flex-1 overflow-y-auto p-0">
                    <div className="flex w-full flex-col">
                        {tasks.map((task, index) => (
                            <div key={`${task.category}-${task.date}-${index}`}>
                                <article className={`flex w-full items-center gap-4 px-4 py-4.5 sm:px-7 sm:py-5.5 ${task.rowBackground}`}>
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
                                            className={cn(taskBadgeBase, "rounded-md px-2 py-0.75", task.categoryBackground, task.categoryText)}
                                        >
                                            {task.category}
                                        </Badge>
                                        <time className={taskSecondaryText}>
                                            {task.date}
                                        </time>
                                        <Badge className={cn(taskBadgeBase, "rounded-[7px] px-2.5 py-1", task.priorityBackground, task.priorityText)}>
                                            {task.priority}
                                        </Badge>
                                    </div>
                                </article>
                                {index < tasks.length - 1 && (
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