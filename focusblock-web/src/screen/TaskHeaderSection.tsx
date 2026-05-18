import type { JSX } from "react";
import { Button } from "../component/ui/button";

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
                <h1 className="-mt-px w-fit [font-family: 'Inter',Helvetica] text-3xl font-bold leading-[normal] tracking-normal text-[#3c3a38] whitespace-nowrap">
                    {tasks.title}
                </h1>
                <p className="w-fit [font-family: 'Inter',Helvetica] text-[13px] font-normal leading-[normal] tracking-normal text-[#797570]">
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