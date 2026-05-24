package com.focusblock.focusblock.service;

import com.focusblock.focusblock.dto.TaskCompletedUpdateReqeust;
import com.focusblock.focusblock.dto.TaskCreateRequest;
import com.focusblock.focusblock.dto.TaskResponse;
import com.focusblock.focusblock.dto.TaskUpdateRequest;
import com.focusblock.focusblock.entity.Task;
import com.focusblock.focusblock.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

    private final TaskRepository taskRepository;

    public List<TaskResponse> getTaskList(){
        List<Task> taskList = taskRepository.findActiveTaskList();

        return taskList.stream()
                .map(TaskResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskResponse createTask(TaskCreateRequest request){
        Task task = request.toEntity();

        Task savedTask = taskRepository.save(task);

        return TaskResponse.from(savedTask);
    }

    @Transactional
    public TaskResponse updateTask(int no, TaskUpdateRequest request){
        Task task = taskRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + "인 task가 없습니다."));

        task.update(request.getTitle(), request.getDescription(), request.getLevel(), request.getDueDate());

        return TaskResponse.from(task);
    }

    @Transactional
    public TaskResponse changeTaskCompleteYn(int no, TaskCompletedUpdateReqeust request){
        Task task = taskRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + "인 task가 없습니다."));

        task.changeCompleteYn(request.getCompleteYn());

        return TaskResponse.from(task);
    }

}
