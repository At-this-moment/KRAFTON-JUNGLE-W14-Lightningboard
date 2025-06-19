package com.myboard.backend.repository

import com.myboard.backend.entity.Post
import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDateTime

interface PostRepository : JpaRepository<Post, Long> {
    fun deleteAllByExpiresAtBefore(time: LocalDateTime)
}
