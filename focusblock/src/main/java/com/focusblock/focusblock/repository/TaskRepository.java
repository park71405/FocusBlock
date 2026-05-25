package com.focusblock.focusblock.repository;

import com.focusblock.focusblock.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query("SELECT t " +
            "FROM Task t " +
            "WHERE t.completeYn = 'N' " +
            "   OR t.dueDate >= CURRENT_DATE " +
            "ORDER BY t.dueDate ASC ")
    List<Task> findActiveTaskList();

    @Query("SELECT t " +
            "FROM Task t " +
            "WHERE (t.completeYn = 'N' OR t.dueDate >= :sysDate ) " +
            "   AND insertId = :userId    " +
            "ORDER BY t.dueDate ASC ")
    List<Task> findActiveTaskList(LocalDate sysDate, String userId);

}
