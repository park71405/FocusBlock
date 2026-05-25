package com.focusblock.focusblock.controller;

import com.focusblock.focusblock.dto.TaskCompletedUpdateReqeust;
import com.focusblock.focusblock.dto.TaskCreateRequest;
import com.focusblock.focusblock.dto.TaskResponse;
import com.focusblock.focusblock.dto.TaskUpdateRequest;
import com.focusblock.focusblock.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("task")
@RequiredArgsConstructor
public class taskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTaskList(@RequestParam(value = "sysDate") LocalDate sysdate){

        List<TaskResponse> taskResponseList = taskService.getTaskList(sysdate);

        return ResponseEntity.ok(taskResponseList);
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody @Valid TaskCreateRequest request) {
        TaskResponse response = taskService.createTask(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{no}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable("no") int no, @RequestBody @Valid TaskUpdateRequest request){
        TaskResponse response = taskService.updateTask(no, request);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateCompleted/{no}")
    public ResponseEntity<TaskResponse> updateTaskCompleted(@PathVariable("no") int no, @RequestBody @Valid TaskCompletedUpdateReqeust request){
        TaskResponse response = taskService.changeTaskCompleteYn(no, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<Void> deleteTask(@PathVariable("no") int no){
        taskService.deleteTask(no);

        return ResponseEntity.noContent().build();
    }

}
