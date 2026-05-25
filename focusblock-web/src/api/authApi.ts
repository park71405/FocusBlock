import type { JoinRequest, LoginRequest, LoginResponse } from '../types/member';
import axiosInstance from './axiosInstance';

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post("/member/login", data);
    return response.data;
}

export const joinApi = async (data: JoinRequest): Promise<void> => {
    await axiosInstance.post("/member/join", data);
}