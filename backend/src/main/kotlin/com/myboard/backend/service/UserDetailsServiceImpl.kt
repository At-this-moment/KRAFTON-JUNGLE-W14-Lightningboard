package com.myboard.backend.service

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import com.myboard.backend.repository.UserRepository
import org.springframework.security.core.userdetails.User as SecurityUser

@Service
class UserDetailsServiceImpl(
    private val userRepository: UserRepository
): UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            .orElseThrow { UsernameNotFoundException("User not found") }

        return SecurityUser.builder()
            .username(user.username)
            .password(user.password)
            .roles(user.role)
            .build()
    }
}
