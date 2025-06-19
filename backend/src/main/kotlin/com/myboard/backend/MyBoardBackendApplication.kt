package com.myboard.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling // 추가 필수

@SpringBootApplication
@EnableScheduling // 이 어노테이션 추가
class MyBoardBackendApplication

fun main(args: Array<String>) {
    runApplication<MyBoardBackendApplication>(*args)
}
