export interface TaskServerResponse {
    no: number;
    completeYn: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    level: string;
}

export interface TaskResponse {
    no: number;
    completed: boolean;
    title: string;
    description: string;
    category: string;
    date: string;
    priority: string;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    tags: string;
    dueDate: string;
    level: string;
}

export interface UpdateTaskCompleteRequest {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    completeYn: String;
}

export interface FocusTask {
    no: number;
    title: string;
    description: string;
    dueDate: string;
    level: string
    completeYn: string
}

export interface FocusTaskResponse {
    focus_no: number;
    focus_date: string;
    priorityOrder: number;
    task: FocusTask
}

export interface CreateDailyFocusRequest {
    taskNo: number;
    focusDate: string;
    priorityOrder: number;
}

export interface UpdateDailFocusRequest {
    focusNo: number;
    priorityOrder: number;
}

export interface UpdateFocusOrderRequest {
    focusTasks: UpdateDailFocusRequest[];
}