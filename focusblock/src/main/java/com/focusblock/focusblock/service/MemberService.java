package com.focusblock.focusblock.service;

import com.focusblock.focusblock.common.JwtTokenProvider;
import com.focusblock.focusblock.dto.LoginRequest;
import com.focusblock.focusblock.dto.MemberCreateRequest;
import com.focusblock.focusblock.dto.MemberResponse;
import com.focusblock.focusblock.dto.TokenResponse;
import com.focusblock.focusblock.entity.Member;
import com.focusblock.focusblock.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public MemberResponse createMember(MemberCreateRequest request){
        if(memberRepository.existsByLoginId(request.getLoginId())) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }

        if(memberRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        String encodePassword = passwordEncoder.encode(request.getPassword());

        Member member = request.toEntity(encodePassword);
        Member savedMember = memberRepository.save(member);

        return MemberResponse.from(savedMember);
    }

    public TokenResponse login(LoginRequest request){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getLoginId(), request.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        return jwtTokenProvider.createToken(authentication);
    }

}
