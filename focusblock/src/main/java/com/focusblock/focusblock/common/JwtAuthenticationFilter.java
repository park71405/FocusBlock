package com.focusblock.focusblock.common;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Request 헤더에서 JWT 토큰 추출
        String token = resolveToken(request);

        // 2. 토큰 유효성 검증 (앞서 JwtTokenProvider에 만든 validateToken 호출)
        if (token != null && jwtTokenProvider.validate(token)) {
            // 토큰이 유효하면 토큰으로부터 인증 객체(Authentication)를 가져옴
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // 🔥 중요: Spring Security 저장소(Context)에 인증 객체 저장 -> 403 프리패스 통행증 발행
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 3. 다음 보안 필터로 요청 넘기기
        filterChain.doFilter(request, response);
    }

    /**
     * HTTP Request 헤더에서 "Authorization: Bearer [토큰]" 형태로 들어오는 데이터 중
     * 앞의 접두사를 제거하고 순수 JWT 토큰 문자열만 추출하는 메서드
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // "Bearer " 가 7자리이므로 그 이후 문자열만 슬라이싱
        }
        return null;
    }

}
