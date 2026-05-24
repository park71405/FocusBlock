package com.focusblock.focusblock.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "task")
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "UPDATE task SET delete_yn = 'Y', update_date = NOW() where id = ?")
@SQLRestriction("delete_yn = 'N'")
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
    private char completeYn = 'N';

    @Column(name = "level")
    private String level;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "insert_id")
    private String insertId;

    @CreatedDate
    @Column(name = "insert_date")
    private LocalDate insertDate;

    @Column(name = "update_id")
    private String updateId;

    @LastModifiedDate
    @Column(name = "update_date")
    private LocalDate updateDate;

    @Column(name = "delete_yn", nullable = false, length = 1)
    private char deleteYn = 'N';

    @Builder
    public Task(String title, String description, String level, LocalDate dueDate){
        this.title = title;
        this.description = description;
        this.level = level;
        this.dueDate = dueDate;
    }

    public void update(String title, String description, String level, LocalDate dueDate){
        this.title = title;
        this.description = description;
        this.level = level;
        this.dueDate = dueDate;
    }

    public void changeCompleteYn(char completeYn){
        this.completeYn = completeYn == 'N' ? 'Y' : 'N';
    }

}
