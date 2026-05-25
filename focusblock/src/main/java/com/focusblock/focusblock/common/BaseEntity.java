package com.focusblock.focusblock.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedBy
    @Column(name = "insert_id")
    private String insertId;

    @CreatedDate
    @Column(name = "insert_date")
    private LocalDate insertDate;

    @LastModifiedBy
    @Column(name = "update_id")
    private String updateId;

    @LastModifiedDate
    @Column(name = "update_date")
    private LocalDate updateDate;

}
