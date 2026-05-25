package com.focusblock.focusblock.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaskCompletedUpdateReqeust {

    char completeYn;

}
