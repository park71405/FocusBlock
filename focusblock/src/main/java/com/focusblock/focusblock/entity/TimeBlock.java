package com.focusblock.focusblock.entity;

import com.focusblock.focusblock.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "time_block")
@ToString(exclude = "task")
public class TimeBlock extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "block_no")
    private Integer blockNo;

    @Column(name = "block_date", nullable = false)
    private LocalDate blockDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_no", nullable = false,
            foreignKey = @ForeignKey(name = "fk_time_block_task"))
    private Task task;

    @Builder
    public TimeBlock(LocalDate blockDate, LocalTime startTime, LocalTime endTime,
                     Task task) {
        validate(startTime, endTime);
        this.blockDate = blockDate;
        this.startTime = startTime;
        this.endTime   = endTime;
        this.task      = task;
    }

    private void validate(LocalTime start, LocalTime end) {
        if (!start.isBefore(end)) {
            throw new IllegalArgumentException(
                    "시작 시간은 종료 시간보다 빨라야 합니다. start=" + start + ", end=" + end
            );
        }
    }

}
