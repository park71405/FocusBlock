package com.parkdev.focusblock.service;

import com.parkdev.focusblock.entity.Task;
import com.parkdev.focusblock.dto.TaskResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

    //private final TaskRepository taskRepository;

    //게시글 전체 조회
    /*public List<TaskResponse> findAllTask() {

        List<Task> taskList =  //taskRepository.findAllByOrderByDueDate();

        return taskList.stream()
                .map(TaskResponse::from)
                .collect(Collectors.toList());
    }*/

}
