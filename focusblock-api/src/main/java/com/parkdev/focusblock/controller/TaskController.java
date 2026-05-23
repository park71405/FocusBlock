package com.parkdev.focusblock.controller;

import com.parkdev.focusblock.dto.TaskResponse;
import com.parkdev.focusblock.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> findAllTask() throws Exception {

        return null;
        //return ResponseEntity.ok(taskService.findAllTask());
    }

}
