package com.focusblock.focusblock.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaskUpdateRequest {

    @NotBlank(message = "제목은 필수 입력값입니다.")
    private String title;

    private String description;
    private String level;
    private LocalDate dueDate;

}
