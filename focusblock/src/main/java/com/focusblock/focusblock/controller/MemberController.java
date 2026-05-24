package com.focusblock.focusblock.controller;

import com.focusblock.focusblock.dto.LoginRequest;
import com.focusblock.focusblock.dto.MemberCreateRequest;
import com.focusblock.focusblock.dto.MemberResponse;
import com.focusblock.focusblock.dto.TokenResponse;
import com.focusblock.focusblock.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping()
    public ResponseEntity<MemberResponse> createMember(@RequestBody @Valid MemberCreateRequest request) {
        MemberResponse response = memberService.createMember(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest request, HttpServletResponse response){
        TokenResponse tokenDto = memberService.login(request);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokenDto.getRefreshToken())
                .maxAge(14 * 24 * 60 * 60)
                .path("/")
                .secure(false)
                .httpOnly(true)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(tokenDto.getAccessToken());
    }

}
