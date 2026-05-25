import { useCallback, useEffect, useState } from "react";
import { focusTaskApi } from "../api/focusTaskApi";
import type { FocusTaskResponse } from "../types/task";

export const useFocusTask = ({ sysDate }: { sysDate: Date }) => {

    const [focusTaskList, setFocusTaskList] = useState<FocusTaskResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFocusTasks = useCallback(async () => {
        setIsLoading(true);
        try {

            const focusTaskList = await focusTaskApi.getFocusTasks(sysDate);

            setFocusTaskList(focusTaskList);
            setError(null); // 에러 초기화

        } catch (err) {
            console.error('Fetch focus tasks failed:', err);
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }

    }, [sysDate]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFocusTasks();
    }, [fetchFocusTasks]);

    return { focusTaskList, isLoading, error, refreshFocusTasks: fetchFocusTasks };

};