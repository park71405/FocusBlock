package com.focusblock.focusblock.repository;

import com.focusblock.focusblock.entity.DailyFocus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface FocusTaskRepository extends JpaRepository<DailyFocus, Integer> {

    @Query("SELECT df, t " +
            "FROM Task t " +
            "   JOIN DailyFocus df ON t.no = df.task.no " +
            "WHERE df.focusDate = :sysDate AND t.insertId = :userId AND t.deleteYn != 'Y' " +
            "ORDER BY df.priorityOrder ASC ")
    List<DailyFocus> findDailyFocusTaskList(LocalDate sysDate, String userId);

}
