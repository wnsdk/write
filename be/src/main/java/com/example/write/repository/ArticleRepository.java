package com.example.write.repository;

import com.example.write.domain.entity.Article;
import com.example.write.domain.entity.ArticleId;
import com.example.write.domain.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, ArticleId> {
    @Query("SELECT a FROM Article a WHERE a.user.userId = :userId")
    List<Article> findByUserId(@Param("userId") Long userId);
}
