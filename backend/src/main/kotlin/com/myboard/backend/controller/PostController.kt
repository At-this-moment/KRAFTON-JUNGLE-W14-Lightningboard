package com.myboard.backend.controller

import com.myboard.backend.dto.PostDetailDto
import com.myboard.backend.dto.PostDto
import com.myboard.backend.dto.PostResponse
import com.myboard.backend.service.PostService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import com.myboard.backend.dto.PostUpdateDto


@RestController
@RequestMapping("/api/posts")
class PostController(private val postService: PostService) {

    @GetMapping
    fun getAllPosts(): ResponseEntity<List<PostResponse>> =
        ResponseEntity.ok(postService.getAllPostResponses())

    @GetMapping("/{id}")
    fun getPostDetail(@PathVariable id: Long): ResponseEntity<PostDetailDto> =
        ResponseEntity.ok(postService.getPostDetailById(id))

    @PostMapping
    fun createPost(@RequestBody postDto: PostDto, authentication: Authentication): ResponseEntity<PostDto> {
        val createdPost = postService.createPost(postDto, authentication.name)
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost)
    }

    @PutMapping("/{id}")
    fun updatePost(
        @PathVariable id: Long,
        @RequestBody updateDto: PostUpdateDto
    ): ResponseEntity<PostDto> {
        val updatedPost = postService.updatePost(id, updateDto)
        return ResponseEntity.ok(updatedPost)
    }


    @DeleteMapping("/{id}")
    fun deletePost(@PathVariable id: Long, authentication: Authentication): ResponseEntity<Unit> {
        val username = authentication.name
        return try {
            postService.deletePostByIdAndAuthor(id, username)
            ResponseEntity.noContent().build()
        } catch (ex: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (ex: NoSuchElementException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }
}
