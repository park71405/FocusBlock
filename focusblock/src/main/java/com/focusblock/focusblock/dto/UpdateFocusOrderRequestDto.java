package com.focusblock.focusblock.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UpdateFocusOrderRequestDto {

    private List<UpdateDailyFocusRequestDto> focusTasks;

}
