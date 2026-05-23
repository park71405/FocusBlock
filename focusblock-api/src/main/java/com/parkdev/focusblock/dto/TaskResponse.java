package com.parkdev.focusblock.dto;

import com.parkdev.focusblock.entity.Task;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TaskResponse {

    private final int no;
    private final String title;
    private final String description;
    private final char complete_yn;
    private final LocalDateTime dueDate;
    private final String level;

    public static TaskResponse from(Task task){
        return new TaskResponse(
                task.getTaskNo(),
                task.getTitle(),
                task.getDescription(),
                task.getCompleteYn(),
                task.getDueDate(),
                task.getLevel()
        );
    }

}
