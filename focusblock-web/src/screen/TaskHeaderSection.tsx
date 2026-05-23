import type { JSX } from "react";
import { Button } from "../component/ui/button";
import { cn } from "../lib/utils";
import { interText } from "../lib/styles";

const tasks = {
    title: "My To-Do List",
    meta: "12 tasks . 7 remaining . 5 completed",
    actionLabel: "+ Add Task",
    //actionImage: "",
}

export const TaskHeaderSection = (): JSX.Element => {
    return (
        <header className="relative flex w-full items-start justify-between gap-4 self-stretch">
            <div className="flex min-w-0 flex-col items-start gap-1.5">
                <h1 className={cn("-mt-px w-fit text-3xl font-bold text-[#3c3a38] whitespace-nowrap", interText)}>
                    {tasks.title}
                </h1>
                <p className={cn("w-fit text-[13px] font-normal text-[#797570]", interText)}>
                    {tasks.meta}
                </p>
            </div>
            <Button 
                type="button" 
                variant="ghost" 
                className="h-auto shrink-0 p-0 hover:bg-transparent" 
                aria-label={tasks.actionLabel}
            >
                {tasks.actionLabel}
            </Button>
        </header>
    );
};