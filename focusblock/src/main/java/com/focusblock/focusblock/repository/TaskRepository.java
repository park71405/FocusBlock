package com.focusblock.focusblock.repository;

import com.focusblock.focusblock.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findAllByOrderByDueDate();

}
