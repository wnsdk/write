package com.example.write.repository;

import com.example.write.domain.entity.Article;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {
    List<Article> findAllByUser_UserIdOrderByCreatedAtDesc(Long userId);

    List<Article> findAllByUser_UserIdAndPrompt_PromptId(Long userId, Long promptId);

    List<Article> findAllByUser_UserIdAndPrompt_PromptIdOrderByCreatedAtDesc(Long userId, Long promptId);
}
