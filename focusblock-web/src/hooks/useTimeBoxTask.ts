import { useCallback, useEffect, useState } from "react";
import { timeBoxTaskApi } from "../api/timeBoxTaskApi";
import type { TimeBoxTaskResponse } from "../types/task";

export const useTimeBoxTask = ({ sysDate }: { sysDate: Date }) => {

    const [timeBoxTaskList, setTimeBoxTaskList] = useState<TimeBoxTaskResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTimeBoxTasks = useCallback(async () => {
        setIsLoading(true);
        try {
            const list = await timeBoxTaskApi.getTimeBoxTasks(sysDate);
            setTimeBoxTaskList(list);
            setError(null);
        } catch (err) {
            console.error("Fetch time box tasks failed:", err);
            setError("데이터를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [sysDate]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTimeBoxTasks();
    }, [fetchTimeBoxTasks]);

    return { timeBoxTaskList, isLoading, error, refreshTimeBoxTasks: fetchTimeBoxTasks };
};
