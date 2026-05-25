package com.focusblock.focusblock.controller;

import com.focusblock.focusblock.dto.TimeBlockCreateRequest;
import com.focusblock.focusblock.dto.TimeBlockResponse;
import com.focusblock.focusblock.dto.TimeBlockUpdateRequest;
import com.focusblock.focusblock.service.TimeBlockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("task/time_box")
@RequiredArgsConstructor
public class TimeBlockController {

    private final TimeBlockService timeBlockService;

    @GetMapping
    public ResponseEntity<List<TimeBlockResponse>> getTimeBoxTaskList(@RequestParam(value = "sysDate")LocalDate blockDate){
        List<TimeBlockResponse> timeBlockResponseList = timeBlockService.getTimeBoxTaskList(blockDate);

        return ResponseEntity.ok(timeBlockResponseList);
    }

    @PostMapping
    public ResponseEntity<TimeBlockResponse> createTimeBoxTask(@RequestBody @Valid TimeBlockCreateRequest request){
        TimeBlockResponse response = timeBlockService.createTimeBlock(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<TimeBlockResponse> updateTimeBoxTask(@RequestBody @Valid TimeBlockUpdateRequest request){
        timeBlockService.updateTimeBoxTask(request);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<Void> deleteTimeBoxTask(@PathVariable("no") int blockNo) {
        timeBlockService.deleteTimeBoxTask(blockNo);

        return ResponseEntity.noContent().build();
    }

}
