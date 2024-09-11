package com.example.write;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WriteApplication {

	public static void main(String[] args) {
		SpringApplication.run(WriteApplication.class, args);
	}
}
