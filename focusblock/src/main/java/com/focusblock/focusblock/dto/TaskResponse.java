package com.focusblock.focusblock.dto;

import com.focusblock.focusblock.entity.Task;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TaskResponse {

    private int no;
    private String title;
    private String description;
    private char completeYn;
    private String level;
    private LocalDate dueDate;

    public static TaskResponse from(Task task){
        return new TaskResponse(
                task.getNo(),
                task.getTitle(),
                task.getDescription(),
                task.getCompleteYn(),
                task.getLevel(),
                task.getDueDate()
        );
    }

}
