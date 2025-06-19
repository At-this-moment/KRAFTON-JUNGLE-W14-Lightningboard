package com.myboard.backend.controller

import com.myboard.backend.dto.CommentDto
import com.myboard.backend.entity.Comment
import com.myboard.backend.service.CommentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.security.core.Authentication


@RestController
@RequestMapping("/api/posts/{postId}/comments")
class CommentController(private val commentService: CommentService) {

    @PostMapping
    fun createComment(
        @PathVariable postId: Long,
        @RequestBody commentDto: CommentDto,
        authentication: Authentication
    ): ResponseEntity<CommentDto> {
        val createdComment = commentService.createComment(
            postId, 
            commentDto.content, 
            authentication.name  // author를 서버에서 직접 설정
        )
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment)
    }


    @DeleteMapping("/{commentId}") // comments 뒤에 {commentId} 추가
    fun deleteComment(
        @PathVariable postId: Long,
        @PathVariable commentId: Long,
        authentication: Authentication
    ): ResponseEntity<Unit> {
        val username = authentication.name
        commentService.deleteComment(commentId, username)
        return ResponseEntity.noContent().build()
    }
}