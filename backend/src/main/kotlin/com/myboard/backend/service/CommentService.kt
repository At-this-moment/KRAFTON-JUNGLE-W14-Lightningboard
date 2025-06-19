package com.myboard.backend.service

import com.myboard.backend.dto.CommentDto
import com.myboard.backend.entity.Comment
import com.myboard.backend.repository.CommentRepository
import com.myboard.backend.repository.PostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val postRepository: PostRepository
) {
    fun getCommentsByPost(postId: Long): List<Comment> {
        val post = postRepository.findById(postId)
            .orElseThrow { NoSuchElementException("Post not found") }
        return commentRepository.findByPost(post)
    }

    fun createComment(postId: Long, content: String, username: String): CommentDto {
        val post = postRepository.findById(postId)
            .orElseThrow { NoSuchElementException("Post not found") }

        val comment = Comment(content = content, post = post, author = username)
        val savedComment = commentRepository.save(comment)

        return CommentDto.fromEntity(savedComment)
    }


    

    @Transactional
    fun updateComment(commentId: Long, content: String): Comment {
        val comment = commentRepository.findById(commentId)
            .orElseThrow { NoSuchElementException("Comment not found") }
        comment.content = content
        return comment
    }

    fun deleteComment(commentId: Long, username: String) {
        val comment = commentRepository.findById(commentId)
            .orElseThrow { NoSuchElementException("Comment not found") }

        val postAuthor = comment.post.author

        if (username != comment.author && username != postAuthor) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "권한이 없습니다.")
        }

        commentRepository.delete(comment)
    }

}