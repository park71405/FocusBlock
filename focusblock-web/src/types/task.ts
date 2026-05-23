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