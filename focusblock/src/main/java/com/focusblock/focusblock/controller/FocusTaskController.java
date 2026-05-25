package com.focusblock.focusblock.controller;

import com.focusblock.focusblock.dto.DailyFocusTaskRequest;
import com.focusblock.focusblock.dto.FocusTaskResponse;
import com.focusblock.focusblock.dto.UpdateFocusOrderRequestDto;
import com.focusblock.focusblock.service.FocusTaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("task/focus")
@RequiredArgsConstructor
public class FocusTaskController {

    private final FocusTaskService focusTaskService;

    @GetMapping
    public ResponseEntity<List<FocusTaskResponse>> getDailyFocusTaskList(@RequestParam(value = "sysDate") LocalDate sysdate){
        List<FocusTaskResponse> focusTaskResponsesList = focusTaskService.getDailyFocusList(sysdate);

        return ResponseEntity.ok(focusTaskResponsesList);
    }

    @PostMapping
    public ResponseEntity<FocusTaskResponse> createDailyFocusTask(@RequestBody @Valid DailyFocusTaskRequest request){
        FocusTaskResponse response = focusTaskService.createDailyFocusTask(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<FocusTaskResponse> updateDailyFocusTask(@RequestBody UpdateFocusOrderRequestDto reqeust){
        focusTaskService.updateFocusOrder(reqeust);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<Void> deleteDailyFocusTask(@PathVariable("no") int taskNo) {
        focusTaskService.deleteDailyFocusTask(taskNo);

        return ResponseEntity.noContent().build();
    }

}
