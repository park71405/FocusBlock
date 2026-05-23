package com.focusblock.focusblock.controller;

import com.focusblock.focusblock.dto.TaskResponse;
import com.focusblock.focusblock.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("task")
@RequiredArgsConstructor
public class taskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTaskList(){

        List<TaskResponse> taskResponseList = taskService.getTaskList();

        return ResponseEntity.ok(taskResponseList);
    }

}
