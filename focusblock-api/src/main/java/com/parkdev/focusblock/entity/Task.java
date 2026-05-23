package com.parkdev.focusblock.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_no")
    private int taskNo;

    @NotNull
    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "complete_yn")
    @ColumnDefault("'N'")
    private char completeYn;
    
    //난이도
    @Column(name = "level")
    private String level;

    // 기한일시
    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "insert_id")
    private String insertID;

    @Column(name = "insert_date")
    private LocalDateTime insertDate;

    @Column(name = "update_id")
    private String updateID;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

}
