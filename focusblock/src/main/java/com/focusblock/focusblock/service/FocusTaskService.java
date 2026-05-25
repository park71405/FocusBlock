package com.focusblock.focusblock.service;

import com.focusblock.focusblock.common.SecurityUtil;
import com.focusblock.focusblock.dto.*;
import com.focusblock.focusblock.entity.DailyFocus;
import com.focusblock.focusblock.entity.Task;
import com.focusblock.focusblock.repository.FocusTaskRepository;
import com.focusblock.focusblock.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FocusTaskService {

    private final FocusTaskRepository focusTaskRepository;
    private final TaskRepository taskRepository;

    public List<FocusTaskResponse> getDailyFocusList(LocalDate sysDate) {
        String currentUserId = SecurityUtil.getCurrentLoginId();

        List<DailyFocus> dailyFocusList = focusTaskRepository.findDailyFocusTaskList(sysDate, currentUserId);

        return dailyFocusList.stream()
                .map(FocusTaskResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public FocusTaskResponse createDailyFocusTask(DailyFocusTaskRequest request){
        Task task = taskRepository.findById(request.getTaskNo())
                .orElseThrow(() -> new IllegalArgumentException(request.getTaskNo() + "인 task가 없습니다."));

        DailyFocus dailyFocus = request.toEntity(task);

        DailyFocus savedDailyFocus = focusTaskRepository.save(dailyFocus);

        return FocusTaskResponse.from(savedDailyFocus);
    }

    @Transactional
    public void updateFocusOrder(UpdateFocusOrderRequestDto requestDto) {
        for (UpdateDailyFocusRequestDto focusTask : requestDto.getFocusTasks()) {
            int focusNo = focusTask.getFocusNo();
            int priorityOrder = focusTask.getPriorityOrder();

            DailyFocus dailyFocus = focusTaskRepository.findById(focusNo)
                    .orElseThrow(() -> new IllegalArgumentException(focusNo + "인 focus task가 없습니다."));

            dailyFocus.changePriority(priorityOrder);
        }
    }

    @Transactional
    public void deleteDailyFocusTask(int taskNo){
        DailyFocus dailyFocus = focusTaskRepository.findById(taskNo)
                .orElseThrow(() -> new IllegalArgumentException(taskNo + "인 Daily Task 가 없습니다."));

        focusTaskRepository.deleteById(dailyFocus.getFocusNo());
    }

}
