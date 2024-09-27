package com.example.write.service;

import com.example.write.domain.dto.request.ArticleReqDto;
import com.example.write.domain.dto.response.ArticleResDto;
import com.example.write.domain.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleService {

    Article saveArticle(ArticleReqDto articleReqDto);

    void deleteArticle(Long articleId);

    Article getArticleById(Long articleId, Long userId);

    Page<ArticleResDto> getArticlesByUser(Long userId, Long promptId, Boolean isEvaluated, Pageable pageable);
}
