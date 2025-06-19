package com.myboard.backend.repository

import com.myboard.backend.entity.Comment
import com.myboard.backend.entity.Post
import org.springframework.data.jpa.repository.JpaRepository

interface CommentRepository : JpaRepository<Comment, Long> {
    fun findByPost(post: Post): List<Comment>
}
