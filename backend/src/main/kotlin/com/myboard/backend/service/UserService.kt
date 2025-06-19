package com.myboard.backend.service

import com.myboard.backend.dto.UserDto
import com.myboard.backend.entity.User
import com.myboard.backend.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder // 반드시 추가!
) {

    fun registerUser(userDto: UserDto): User {
        if (userRepository.existsByUsername(userDto.username)) {
            throw IllegalArgumentException("이미 존재하는 아이디입니다.")
        }

        val user = User(
            username = userDto.username,
            password = passwordEncoder.encode(userDto.password) // 이 부분이 핵심!
        )

        return userRepository.save(user)
    }
}