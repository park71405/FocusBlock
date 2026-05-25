import { useState, useEffect, type JSX } from "react";
import { cn } from "../../lib/utils";
import { interText } from "../../lib/styles";
import { Button } from "../../component/ui/button";
import { FiX } from "react-icons/fi";
import { taskApi } from "../../api/taskApi";
import type { TaskResponse } from "../../types/task";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: () => void;
  updateTaskInfo?: TaskResponse | null;
}

type Priority = "HIGH" | "MEDIUM" | "LOW";

const PRIORITY_STYLES: Record<Priority, { base: string; active: string }> = {
  HIGH: {
    base: "bg-[#fae8e4] text-[#c06060] hover:bg-[#f5dcd6]",
    active: "bg-[#c06060] text-white hover:bg-[#b05050]",
  },
  MEDIUM: {
    base: "bg-[#f5eed8] text-[#8b7040] hover:bg-[#ede4c8]",
    active: "bg-[#8b8c5a] text-white hover:bg-[#7a7b4e]",
  },
  LOW: {
    base: "bg-[#ddecd8] text-[#4a8060] hover:bg-[#d0e2cc]",
    active: "bg-[#4a8060] text-white hover:bg-[#3a7050]",
  },
};

export const AddTaskModal = ({ isOpen, onClose, onAdded, updateTaskInfo, sysDate }: AddTaskModalProps & { sysDate: Date }): JSX.Element | null => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [dueDate, setDueDate] = useState(sysDate.toISOString().split("T")[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (updateTaskInfo != null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(updateTaskInfo.title);
      setDescription(updateTaskInfo.description);
      setPriority(updateTaskInfo.priority as Priority);
      setDueDate(updateTaskInfo.date);
    } else {
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate(sysDate.toISOString().split("T")[0]);
    }
  }, [updateTaskInfo, sysDate]);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDueDate(sysDate.toISOString().split("T")[0]);
    setTags([]);
    setTagInput("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    try {
      let status: number;

      const requestData = {
        title: title.trim(),
        description: description.trim(),
        tags: tags.join(","),
        dueDate,
        level: priority,
      }

      if (updateTaskInfo != null){
        status = await taskApi.updateTask(updateTaskInfo.no, requestData);
      } else {
        status = await taskApi.createTask(requestData); 
      }

      if (status === 201 || status === 200) {
        onAdded?.();
        handleClose();
      }
      
    } catch (err) {
      console.error("태스크 생성 실패:", err);
    }
  };

  const handleDelete = async () => {
  
    if (!updateTaskInfo) return;

    try {
      
      const status = await taskApi.deleteTask(updateTaskInfo.no);

      if (status === 204) {
        onAdded?.();
        handleClose();
      }

    } catch (err) {
      console.error("태스크 삭제 실패:", err);
    }

    
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/15" onClick={handleClose} />

      <div className={cn("relative z-10 w-full max-w-125 mx-4 bg-white rounded-2xl shadow-2xl p-6", interText)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#3c3a38]">Task</h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center w-7 h-7 rounded-md text-[#797570] hover:text-[#3c3a38] hover:bg-[#f3f1ee] transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Task Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3c3a38] mb-1.5">
            Task Title <span className="text-[#c06060]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-3 py-2.5 text-sm text-[#3c3a38] bg-[#f9f8f6] border border-[#e8e5e1] rounded-lg outline-none focus:border-[#c2c9b8] placeholder:text-[#c2bfbb] transition-colors"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3c3a38] mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Add a description or notes..."
            rows={3}
            className="w-full px-3 py-2.5 text-sm text-[#3c3a38] bg-[#f9f8f6] border border-[#e8e5e1] rounded-lg outline-none focus:border-[#c2c9b8] placeholder:text-[#c2bfbb] resize-none transition-colors"
          />
        </div>

        {/* Due Date + Priority */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#3c3a38] mb-1.5">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-3 py-2.5 text-sm text-[#3c3a38] bg-[#f9f8f6] border border-[#e8e5e1] rounded-lg outline-none focus:border-[#c2c9b8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3c3a38] mb-1.5">Priority</label>
            <div className="flex gap-1.5">
              {(["HIGH", "MEDIUM", "LOW"] as Priority[]).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "flex-1 py-2 text-xs font-medium rounded-lg transition-colors",
                    priority === p ? PRIORITY_STYLES[p].active : PRIORITY_STYLES[p].base
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3c3a38] mb-1.5">Tags</label>
          <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 bg-[#f9f8f6] border border-[#e8e5e1] rounded-lg min-h-10.5">
            {tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium text-[#3c3a38] bg-[#e8e5e1] rounded-md"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                  className="text-[#a8a29f] hover:text-[#797570] leading-none ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={handleAddTag}
              placeholder="+ Add tag"
              className="flex-1 min-w-17.5 text-xs text-[#797570] bg-transparent outline-none placeholder:text-[#a8a29f]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            className="flex-1 h-10 text-sm font-medium text-[#797570] border-[#e8e5e1] bg-white hover:bg-[#f3f1ee] hover:text-[#3c3a38]"
          >
            {(!updateTaskInfo) ? "Cancel" : "Delete Task"}
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 h-10 text-sm font-medium bg-[#7a8c6a] text-white hover:bg-[#6a7c5a] disabled:opacity-40"
          >
            Save Task
          </Button>
        </div>
      </div>
    </div>
  );
};
