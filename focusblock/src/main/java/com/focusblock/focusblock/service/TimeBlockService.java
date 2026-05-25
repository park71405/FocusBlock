package com.focusblock.focusblock.service;


import com.focusblock.focusblock.common.SecurityUtil;
import com.focusblock.focusblock.dto.TimeBlockCreateRequest;
import com.focusblock.focusblock.dto.TimeBlockResponse;
import com.focusblock.focusblock.dto.TimeBlockUpdateRequest;
import com.focusblock.focusblock.entity.Task;
import com.focusblock.focusblock.entity.TimeBlock;
import com.focusblock.focusblock.repository.TaskRepository;
import com.focusblock.focusblock.repository.TimeBlockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TimeBlockService {

    private final TimeBlockRepository timeBlockRepository;
    private final TaskRepository taskRepository;

    public List<TimeBlockResponse> getTimeBoxTaskList(LocalDate blockDate) {
        String currentUserId = SecurityUtil.getCurrentLoginId();

        List<TimeBlock> timeBlockList = timeBlockRepository.findTimeBoxTaskList(blockDate, currentUserId);

        return timeBlockList.stream()
                .map(TimeBlockResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public TimeBlockResponse createTimeBlock(TimeBlockCreateRequest request) {

        Task task = taskRepository.findById(request.getTaskNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 Task가 존재하지 않습니다. ID: " + request.getTaskNo()));

        TimeBlock timeBlock = request.toEntity(task);

        TimeBlock savedBlock = timeBlockRepository.save(timeBlock);

        return TimeBlockResponse.from(savedBlock);
    }

    @Transactional
    public void updateTimeBoxTask(TimeBlockUpdateRequest request){

        TimeBlock timeBlock = timeBlockRepository.findById(request.getBlockNo())
                .orElseThrow(() -> new IllegalArgumentException(request.getBlockNo() + "인 Time Block이 없습니다."));

        timeBlock.changeTime(request.getStartTime(), request.getEndTime());
    }

    @Transactional
    public void deleteTimeBoxTask(int blockNo){
        TimeBlock timeBlock = timeBlockRepository.findById(blockNo)
                .orElseThrow(() -> new IllegalArgumentException(blockNo + "인 Time Block이 없습니다."));

        timeBlockRepository.deleteById(timeBlock.getBlockNo());
    }

}
