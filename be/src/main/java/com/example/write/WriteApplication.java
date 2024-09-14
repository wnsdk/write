package com.example.write;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WriteApplication {

	@Value("${redirect.uri}")
	private String redirectUri;

	public static void main(String[] args) {
		SpringApplication.run(WriteApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			if (redirectUri == null) {
				System.out.println("redirectUri 값이 주입되지 않았습니다.");
			} else {
				System.out.println("redirectUri : " + redirectUri);
			}
		};
	}
}
