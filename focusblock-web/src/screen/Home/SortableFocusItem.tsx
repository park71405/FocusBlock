import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FocusTaskResponse } from "../../types/task";
import { cn } from "../../lib/utils";
import { RxDragHandleDots2 } from "react-icons/rx";
import { taskSecondaryText } from "../../lib/styles";

interface SortableFocusItemProps {
    focusTask: FocusTaskResponse;
    idx: number;
    onDelete: (focusTask: FocusTaskResponse) => void;
}

export const SortableFocusItem = ({ focusTask, idx, onDelete }: SortableFocusItemProps) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: `focus-${focusTask.focus_no}`,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between",
                isDragging ? "opacity-50 shadow-lg z-50" : ""
            )}
        >
            <div className="flex items-center gap-3">
                <span
                    {...listeners}
                    {...attributes}
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 touch-none"
                >
                    <RxDragHandleDots2 className="text-lg" />
                </span>
                <span className="text-sm font-semibold text-gray-400">{idx + 1}</span>
                <span className="ml-2 text-sm text-gray-700">
                    {focusTask.task.title}
                    <p className={cn("min-w-0", taskSecondaryText)}>
                        {focusTask.task.description}
                    </p>
                </span>
            </div>
            <button className="text-gray-400 hover:text-red-400" onClick={() => onDelete(focusTask)}>
                ✕
            </button>
        </div>
    );

}