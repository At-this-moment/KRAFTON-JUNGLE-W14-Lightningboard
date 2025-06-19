package com.myboard.backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class Post(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var title: String,

    @Column(columnDefinition = "TEXT")
    var content: String,

    var author: String,

    val createdAt: LocalDateTime = LocalDateTime.now(),

    val expiresAt: LocalDateTime = LocalDateTime.now().plusMinutes(30),

    @OneToMany(mappedBy = "post", cascade = [CascadeType.ALL], orphanRemoval = true)
    val comments: List<Comment> = mutableListOf()
)
