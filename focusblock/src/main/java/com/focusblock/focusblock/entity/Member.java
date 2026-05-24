package com.focusblock.focusblock.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member", uniqueConstraints = {
        @UniqueConstraint(name = "uk_member_login_id", columnNames = "login_id"),
        @UniqueConstraint(name = "uk_member_email", columnNames = "email")
})
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", nullable = false, length = 50)
    private String loginId;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "nickname", nullable = false, length = 100)
    private String nickname;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Builder
    private Member(String loginId, String password, String nickname, String email){
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
    }

}
