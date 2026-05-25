import type { CreateDailyFocusRequest, FocusTaskResponse, UpdateFocusOrderRequest } from "../types/task";
import axiosInstance from "./axiosInstance";


export const focusTaskApi = {

    getFocusTasks: async (sysDate: Date): Promise<FocusTaskResponse[]> => {
        const response = await axiosInstance.get("/task/focus", { params: { sysDate: sysDate.toISOString().split("T")[0] } });
        return response.data;
    },

    createFocusTasks: async (data: CreateDailyFocusRequest): Promise<number> => {
        const response = await axiosInstance.post("/task/focus", data);
        return response.status;
    },

    updateFocusTasks: async (data: UpdateFocusOrderRequest): Promise<number> => {
        const response = await axiosInstance.put("/task/focus", data);
        return response.status;
    },

    deleteDailyFocusTask: async (focusNo: number): Promise<number> => {
        const respones = await axiosInstance.delete(`/task/focus/${focusNo}`);
        return respones.status;
    }

}