import { useState, type JSX } from "react";
import { Button } from "../component/ui/button";
import { cn } from "../lib/utils";
import { interText } from "../lib/styles";
import { AddTaskModal } from "../component/AddTaskModal";

interface TaskHeaderSectionProps {
    onAdded?: () => void;
}

const HEADER = {
    title: "My To-Do List",
    meta: "12 tasks . 7 remaining . 5 completed",
    actionLabel: "+ Add Task",
};

export const TaskHeaderSection = ({ onAdded }: TaskHeaderSectionProps): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="relative flex w-full items-start justify-between gap-4 self-stretch">
                <div className="flex min-w-0 flex-col items-start gap-1.5">
                    <h1 className={cn("-mt-px w-fit font-semibold text-3xl text-[#3c3a38]")}>
                        {HEADER.title}
                    </h1>
                    <p className={cn("w-fit text-[13px] font-normal text-[#797570]", interText)}>
                        {HEADER.meta}
                    </p>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    className="shrink-0 font-medium bg-[#7a8c6a] text-white hover:bg-[#6a7c5a]"
                    aria-label={HEADER.actionLabel}
                    onClick={() => setIsModalOpen(true)}
                >
                    {HEADER.actionLabel}
                </Button>
            </header>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdded={onAdded}
                updateTaskInfo={null}
            />
        </>
    );
};