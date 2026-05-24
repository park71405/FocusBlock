import {useState, useEffect} from "react";
import { type TaskResponse, type TaskServerResponse } from "../types/task";
import { taskApi } from "../api/taskApi";

export const useTask = () => {

    const [taskList, setTaskList] = useState<TaskResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            const taskList = await taskApi.getTasks();
            // 데이터 가공 
            const formattedTaskList: TaskResponse[] = taskList.map((task: TaskServerResponse) => ({
                no: task.no,
                completed: task.completeYn === 'N' ? false : true,
                title: task.title,
                description: task.description,
                category: "DEV",        // 추후 컬럼 추가
                date: task.dueDate,
                priority: task.level
            }));
            
            setTaskList(formattedTaskList);
            setError(null); // 에러 초기화

        } catch (err) {
            console.error('Fetch tasks failed:', err);
            setError('Task 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 컴포넌트 마운트 시 자동 호출
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();
    }, []);

    // 외부(컴포넌트)에서 사용할 상태와 함수를 반환
    return { taskList, isLoading, error, refreshTasks: fetchTasks };
};