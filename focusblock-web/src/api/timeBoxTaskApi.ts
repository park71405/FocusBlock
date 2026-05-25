import axiosInstance from "./axiosInstance";
import type { CreateTimeBoxTaskRequest, TimeBoxTaskResponse, UpdateTimeBoxTaskRequest } from "../types/task";

export const timeBoxTaskApi = {

    getTimeBoxTasks: async (sysDate: Date): Promise<TimeBoxTaskResponse[]> => {
        const response = await axiosInstance.get("/task/time_box", { params: { sysDate: sysDate.toISOString().split("T")[0] } });
        return response.data;
    },

    createTimeBoxTasks: async (data: CreateTimeBoxTaskRequest): Promise<number> => {
        const response = await axiosInstance.post("/task/time_box", data);
        return response.status;
    },

    updateTimeBoxTasks: async (data: UpdateTimeBoxTaskRequest): Promise<number> => {
        const response = await axiosInstance.put("/task/time_box", data);
        return response.status;
    },

    deleteTimeBoxTasks: async (blockNo: number): Promise<number> => {
        const respones = await axiosInstance.delete(`/task/time_box/${blockNo}`);
        return respones.status;
    }
}