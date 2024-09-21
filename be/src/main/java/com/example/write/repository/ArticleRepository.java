package com.example.write.repository;

import com.example.write.domain.entity.Article;
import com.example.write.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
