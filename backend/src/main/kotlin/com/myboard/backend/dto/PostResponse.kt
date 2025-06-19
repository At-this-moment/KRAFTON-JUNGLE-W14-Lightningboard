package com.myboard.backend.dto

import com.myboard.backend.entity.Post
import java.time.Duration
import java.time.LocalDateTime

data class PostResponse(
    val id: Long?,
    val title: String,
    val content: String,
    val author: String,
    val createdAt: LocalDateTime,
    val expiresAt: LocalDateTime,
    val remainingSeconds: Long
)

fun Post.toResponse(): PostResponse {
    val remainingSeconds = Duration.between(LocalDateTime.now(), this.expiresAt).seconds
    return PostResponse(
        id = this.id,
        title = this.title,
        content = this.content,
        author = this.author,
        createdAt = this.createdAt,
        expiresAt = this.expiresAt,
        remainingSeconds = if (remainingSeconds > 0) remainingSeconds else 0
    )
}
