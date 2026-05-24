package com.focusblock.focusblock.controller;

import com.focusblock.focusblock.dto.TaskCreateRequest;
import com.focusblock.focusblock.dto.TaskResponse;
import com.focusblock.focusblock.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody @Valid TaskCreateRequest request) {
        TaskResponse response = taskService.createTask(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    

}
