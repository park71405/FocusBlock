package com.focusblock.focusblock.dto;

import com.focusblock.focusblock.entity.DailyFocus;
import com.focusblock.focusblock.entity.Task;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyFocusTaskRequest {

    private int taskNo;
    private LocalDate focusDate;
    private int priorityOrder;

    public DailyFocus toEntity(Task task){
        return DailyFocus.builder()
                .focusDate(this.focusDate)
                .priorityOrder(this.priorityOrder)
                .task(task)
                .build();
    }

}
