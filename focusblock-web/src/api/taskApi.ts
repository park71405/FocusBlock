import type { TaskServerResponse, CreateTaskRequest, UpdateTaskCompleteRequest } from "../types/task";
import axiosInstance from './axiosInstance';

export const taskApi = {
    // 현재 날짜 기준 남은 task 와 오늘까지인 task 를 모두 가져오는 API
    getTasks: async (): Promise<TaskServerResponse[]> => {
        const response = await axiosInstance.get("/task");
        return response.data;
    },

    createTask: async (data: CreateTaskRequest): Promise<number> => {
        const response = await axiosInstance.post("/task", data);
        return response.status;
    },

    updateTask: async (no: number, data: CreateTaskRequest): Promise<number> => {
        const response = await axiosInstance.put(`/task/${no}`, data);
        return response.status;
    },

    updateCompleted: async (no: number, data: UpdateTaskCompleteRequest): Promise<number> => {
        const response = await axiosInstance.put(`/task/updateCompleted/${no}`, data);
        return response.status;
    }
}