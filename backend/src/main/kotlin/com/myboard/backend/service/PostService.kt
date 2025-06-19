package com.myboard.backend.service

import com.myboard.backend.dto.*
import com.myboard.backend.entity.Post
import com.myboard.backend.repository.PostRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import org.springframework.transaction.annotation.Transactional

@Service
class PostService(private val postRepository: PostRepository) {

    fun getAllPosts(): List<PostDto> =
        postRepository.findAll().map(Post::toDto)

    fun getPostDetailById(id: Long): PostDetailDto =
        postRepository.findById(id)
            .map(Post::toDetailDto)
            .orElseThrow { NoSuchElementException("게시글이 존재하지 않습니다: $id") }

    fun createPost(postDto: PostDto, username: String): PostDto =
        postRepository.save(Post(
            title = postDto.title,
            content = postDto.content,
            author = username,
            createdAt = LocalDateTime.now(),
            expiresAt = LocalDateTime.now().plusMinutes(5)
        )).toDto()

    @Transactional
    fun updatePost(id: Long, updateDto: PostUpdateDto): PostDto {
        val post = getPostById(id)
        post.title = updateDto.title
        post.content = updateDto.content

        val updatedPost = postRepository.save(post)

        return PostDto(
            id = updatedPost.id,
            title = updatedPost.title,
            content = updatedPost.content,
            author = updatedPost.author,
            createdAt = updatedPost.createdAt
        )
    }


    fun deletePostByIdAndAuthor(id: Long, author: String) {
        val post = postRepository.findById(id)
            .orElseThrow { NoSuchElementException("게시글이 존재하지 않습니다: $id") }
        if (post.author != author) throw IllegalArgumentException("권한이 없습니다.")
        postRepository.deleteById(id)
    }

    fun getAllPostResponses(): List<PostResponse> =
        postRepository.findAll().map { it.toResponse() }

    fun getPostById(id: Long): Post {
        return postRepository.findById(id)
            .orElseThrow { NoSuchElementException("Post not found") }
    }

}
