package com.myboard.backend.tasks

import com.myboard.backend.repository.PostRepository
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired
import java.time.LocalDateTime

@Component
class ScheduledTasks(
    @Autowired val postRepository: PostRepository
) {
    @Scheduled(fixedRate = 60000) // 1분마다 실행
    fun deleteExpiredPosts() {
        val now = LocalDateTime.now()
        postRepository.deleteAllByExpiresAtBefore(now)
        println("만료된 게시글 삭제됨: $now")
    }
}
