package com.example.write;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WriteApplication {

	@Value("${common}")
	private String common;

	@Value("${test}")
	private String test;

	public static void main(String[] args) {
		SpringApplication.run(WriteApplication.class, args);
	}

	@PostConstruct
	// application.yml 파일이 무엇으로 설정되었는지 확인용
	private void start() {
		System.out.println("common = " + common);
		System.out.println("test = " + test);
	}
}
