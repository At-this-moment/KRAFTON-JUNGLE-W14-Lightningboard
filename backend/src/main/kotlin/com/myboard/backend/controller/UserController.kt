package com.myboard.backend.controller

import com.myboard.backend.dto.UserDto
import com.myboard.backend.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @PostMapping("/register")
    fun register(@RequestBody userDto: UserDto): ResponseEntity<String> {
        return try {
            userService.registerUser(userDto)
            ResponseEntity.ok("회원가입 성공")
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.CONFLICT).body(e.message)
        }
    }
}