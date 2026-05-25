package com.focusblock.focusblock.dto;

import com.focusblock.focusblock.entity.Member;
import lombok.Getter;

@Getter
public class MemberResponse {

    private final Long id;
    private final String loginId;
    private final String nickname;
    private final String email;

    private MemberResponse(Member member){
        this.id = member.getId();
        this.loginId = member.getLoginId();
        this.nickname = member.getNickname();
        this.email = member.getEmail();
    }

    public static MemberResponse from(Member member){
        return new MemberResponse(member);
    }

}
