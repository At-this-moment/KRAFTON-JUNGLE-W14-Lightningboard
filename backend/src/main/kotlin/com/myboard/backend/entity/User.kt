package com.myboard.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(unique = true)
    val username: String,

    val password: String,

    val role: String = "USER" // 기본 역할 (ROLE_USER)
)
