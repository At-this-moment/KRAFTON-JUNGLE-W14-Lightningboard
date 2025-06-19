package com.myboard.backend.dto

import com.myboard.backend.entity.Post
import java.time.LocalDateTime

data class PostDto(
    val id: Long?,
    val title: String,
    val content: String,
    val author: String,
    val createdAt: LocalDateTime?
)

fun Post.toDto() = PostDto(
    id = this.id,
    title = this.title,
    content = this.content,
    author = this.author,
    createdAt = this.createdAt
)
