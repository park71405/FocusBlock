package com.focusblock.focusblock.dto;

import com.focusblock.focusblock.entity.Task;
import com.focusblock.focusblock.entity.TimeBlock;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeBlockResponse {

    private long blockNo;
    private LocalDate blockDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Task task;

    public static TimeBlockResponse from(TimeBlock timeBlock){
        return new TimeBlockResponse(
                timeBlock.getBlockNo(),
                timeBlock.getBlockDate(),
                timeBlock.getStartTime(),
                timeBlock.getEndTime(),
                timeBlock.getTask()
        );
    }

}
