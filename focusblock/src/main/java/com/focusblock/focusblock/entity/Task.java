package com.focusblock.focusblock.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_no")
    private int no;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "complete_yn")
    @ColumnDefault("'N'")
    private char completeYn;

    @Column(name = "level")
    private String level;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "insert_id")
    private String insertId;

    @Column(name = "insert_date")
    private LocalDate insertDate;

    @Column(name = "update_id")
    private String updateId;

    @Column(name = "update_date")
    private LocalDate updateDate;

    @Builder
    public Task(String title, String description, String level, LocalDate dueDate){
        this.title = title;
        this.description = description;
        this.level = level;
        this.dueDate = dueDate;
    }

}
