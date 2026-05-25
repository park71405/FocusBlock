package com.focusblock.focusblock.dto;

import com.focusblock.focusblock.entity.Task;
import com.focusblock.focusblock.entity.TimeBlock;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class TimeBlockCreateRequest {

    private int taskNo;

    @NotNull(message = "블록 날짜는 필수입니다.")
    private LocalDate blockDate;

    @NotNull(message = "시작 시간은 필수입니다.")
    private LocalTime startTime;

    @NotNull(message = "종료 시간은 필수입니다.")
    private LocalTime endTime;

    public TimeBlock toEntity(Task task){
        return TimeBlock.builder()
                .blockDate(this.blockDate)
                .startTime(this.startTime)
                .endTime(this.endTime)
                .task(task)
                .build();
    }

}
