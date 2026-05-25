package com.focusblock.focusblock.dto;

import com.focusblock.focusblock.entity.DailyFocus;
import com.focusblock.focusblock.entity.Task;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class FocusTaskResponse {

    private int focus_no;
    private LocalDate focus_date;
    private int priorityOrder;
    private Task task;

    public static FocusTaskResponse from(DailyFocus dailyFocus){
        return new FocusTaskResponse(
                dailyFocus.getFocusNo(),
                dailyFocus.getFocusDate(),
                dailyFocus.getPriorityOrder(),
                dailyFocus.getTask()
        );
    }

}
