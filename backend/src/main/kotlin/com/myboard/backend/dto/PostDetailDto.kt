package com.myboard.backend.dto

import com.myboard.backend.entity.Post
import java.time.LocalDateTime

data class PostDetailDto(
    val id: Long?,
    val title: String,
    val content: String,
    val author: String,
    val createdAt: LocalDateTime?,
    val comments: List<CommentDto>
)

fun Post.toDetailDto(): PostDetailDto = PostDetailDto(
    id = this.id,
    title = this.title,
    content = this.content,
    author = this.author,
    createdAt = this.createdAt,
    comments = this.comments.map { it.toCommentDto() }
)
