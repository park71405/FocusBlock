package com.focusblock.focusblock.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeBlockUpdateRequest {

    private int blockNo;
    private LocalTime startTime;
    private LocalTime endTime;

}
