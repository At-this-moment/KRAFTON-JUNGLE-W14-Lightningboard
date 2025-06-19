package com.myboard.backend.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtUtil: JwtUtil,
    private val userDetailsService: UserDetailsService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")

        println("Authorization 헤더: $authHeader")

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            val jwt = authHeader.substring(7)
            val username = jwtUtil.extractUsername(jwt)

            println("추출된 username: $username")

            if (SecurityContextHolder.getContext().authentication == null) {
                try {
                    val userDetails = userDetailsService.loadUserByUsername(username)
                    if (jwtUtil.validateToken(jwt, userDetails)) {
                        val authToken = UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.authorities
                        )
                        authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                        SecurityContextHolder.getContext().authentication = authToken

                        println("JWT 인증 성공: $username")
                    } else {
                        println("JWT 유효성 검증 실패: $username")
                    }
                } catch (ex: Exception) {
                    println("JWT 인증 과정에서 오류 발생: ${ex.message}")
                }
            } else {
                println("이미 인증된 사용자: ${SecurityContextHolder.getContext().authentication.name}")
            }
        } else {
            println("JWT 헤더가 없거나 올바르지 않음")
        }

        filterChain.doFilter(request, response)
    }

    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        val path = request.requestURI
        return path.startsWith("/api/auth/signup") || path.startsWith("/api/auth/login")
    }
}