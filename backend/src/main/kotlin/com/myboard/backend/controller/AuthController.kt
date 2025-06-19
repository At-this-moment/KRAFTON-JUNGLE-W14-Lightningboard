package com.myboard.backend.controller

import com.myboard.backend.entity.User
import com.myboard.backend.repository.UserRepository
import com.myboard.backend.security.JwtUtil
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

data class AuthRequest(val username: String, val password: String)
data class AuthResponse(val token: String)

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager,
    private val userDetailsService: UserDetailsService,
    private val jwtUtil: JwtUtil
) {

    @PostMapping("/signup")
    fun register(@RequestBody user: User): ResponseEntity<User> {
        val newUser = User(
            username = user.username,
            password = passwordEncoder.encode(user.password)
        )
        userRepository.save(newUser)
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser)
    }

    @PostMapping("/login")
    fun login(@RequestBody authRequest: AuthRequest): ResponseEntity<AuthResponse> {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                authRequest.username, authRequest.password
            )
        )
        val userDetails = userDetailsService.loadUserByUsername(authRequest.username)
        val token = jwtUtil.generateToken(userDetails)
        return ResponseEntity.ok(AuthResponse(token))
    }
}
