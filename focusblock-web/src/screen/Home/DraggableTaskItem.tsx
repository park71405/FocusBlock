import { useDraggable } from "@dnd-kit/core";
import type { TaskResponse } from "../../types/task";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Checkbox } from "@radix-ui/react-checkbox";
import { cn } from "../../lib/utils";
import { interText, taskBadgeBase, taskSecondaryText } from "../../lib/styles";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "../../component/ui/badge";

interface DraggableTaskItemProps {
    task: TaskResponse;
    index: number;
    taskListLength: number;
    onComplete: (no: number, completed: boolean) => void;
    onEdit: (task: TaskResponse) => void;
}

export const DraggableTaskItem = ({ task, index, taskListLength, onComplete, onEdit }: DraggableTaskItemProps) => {

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
            id: `task-${task.no}`,
            data: { task },
        });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
        : undefined;

    return (
        <div ref={setNodeRef} style={style} className={isDragging ? "opacity-50" : ""}>
            <article className={`flex w-full items-center gap-2 px-4 py-4.5 sm:px-7 sms:py-5.5 bg-[#ffffffe6]`}>
                <span
                    {...listeners}
                    {...attributes}
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 touch-none shrink-0"
                >
                    <RxDragHandleDots2 className="text-lg" />
                </span>
                <Checkbox
                    checked={task.completed}
                    onClick={() => onComplete(task.no, task.completed)}
                    className={`mt-0 h-5.5 w-5.5 rounded-full border-2 shadow-none data-[state=checked]:border-[#c2c9b8] data-[state=checked]:bg-[#c2c9b8] data-[state=checked]:text-transparent ${task.completed ? "border-[#c2c9b8]" : "border-[#c2c6c9]"}`}
                />
                <div className="min-w-0 flex-1" onClick={() => onEdit(task)}>
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
            {index < taskListLength - 1 && (
                <Separator className="h-px w-full bg-[#c2c6c959]" />
            )}
        </div>
    );

};