export interface TaskServerResponse {
    completeYn: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    level: string;
}

export interface TaskResponse {
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