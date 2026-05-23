package com.focusblock.focusblock.service;

import com.focusblock.focusblock.dto.TaskResponse;
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
        List<Task> taskList = taskRepository.findAllByOrderByDueDate();

        return taskList.stream()
                .map(TaskResponse::from)
                .collect(Collectors.toList());
    }

}
