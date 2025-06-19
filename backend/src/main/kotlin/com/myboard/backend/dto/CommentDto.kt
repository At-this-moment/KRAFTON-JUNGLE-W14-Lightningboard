package com.myboard.backend.dto

import com.myboard.backend.entity.Comment
import java.time.LocalDateTime

data class CommentDto(
    val id: Long? = null,
    val content: String,
    val author: String? = null,  // nullable로 설정
    val createdAt: LocalDateTime? = null
) {
    companion object {
        fun fromEntity(comment: Comment) = CommentDto(
            id = comment.id,
            content = comment.content,
            author = comment.author,
            createdAt = comment.createdAt
        )
    }
}

fun Comment.toCommentDto() = CommentDto(
    id = this.id,
    content = this.content,
    author = this.author,
    createdAt = this.createdAt
)
