package com.focusblock.focusblock.repository;

import com.focusblock.focusblock.entity.TimeBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TimeBlockRepository extends JpaRepository<TimeBlock, Integer> {

    @Query("SELECT tb, t " +
            "FROM Task t " +
            "   JOIN TimeBlock tb ON t.no = tb.task.no " +
            "WHERE tb.blockDate = :blockDate AND t.insertId = :userId AND t.deleteYn != 'Y' " +
            "ORDER BY tb.startTime ASC ")
    List<TimeBlock> findTimeBoxTaskList(LocalDate blockDate, String userId);

}
