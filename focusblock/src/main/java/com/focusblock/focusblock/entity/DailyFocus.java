package com.focusblock.focusblock.entity;

import com.focusblock.focusblock.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "daily_focus", uniqueConstraints = {
        @UniqueConstraint(name = "uq_daily_focus_date_task", columnNames = {"focus_date", "task_no"})
})
@EntityListeners(AuditingEntityListener.class)
@ToString(exclude = "task")
public class DailyFocus extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "focus_no")
    private int focusNo;

    @Column(name = "focus_date")
    private LocalDate focusDate;

    @Column(name = "priority_order", nullable = false)
    private Integer priorityOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_no", nullable = false, foreignKey = @ForeignKey(name = "fk_daily_focus_task"))
    private Task task;

    @Builder
    public DailyFocus(LocalDate focusDate, Integer priorityOrder, Task task){
        this.focusDate = focusDate;
        this.priorityOrder = priorityOrder;
        this.task = task;
    }

    public void changePriority(Integer newOrder){
        this.priorityOrder = newOrder;
    }

}
