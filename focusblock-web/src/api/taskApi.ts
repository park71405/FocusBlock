import axios from "axios";
import type { TaskServerResponse, CreateTaskRequest } from "../types/task";

export const taskApi = {
    // 현재 날짜 기준 남은 task 와 오늘까지인 task 를 모두 가져오는 API
    getTasks: async (): Promise<TaskServerResponse[]> => {
        const response = await axios.get("/task");
        return response.data;
    },

    createTask: async (data: CreateTaskRequest): Promise<number> => {
        const response = await axios.post("/task", data);
        return response.status;
    },
}