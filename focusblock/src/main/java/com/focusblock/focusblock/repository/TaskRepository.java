package com.focusblock.focusblock.repository;

import com.focusblock.focusblock.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findAllByOrderByDueDate();

    @Query("SELECT t " +
            "FROM Task t " +
            "WHERE t.completeYn = 'N' " +
            "   OR t.dueDate >= CURRENT_DATE " +
            "ORDER BY t.dueDate ASC ")
    List<Task> findActiveTaskList();

}
