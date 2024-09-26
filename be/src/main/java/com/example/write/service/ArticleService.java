package com.example.write.service;

import com.example.write.domain.dto.request.ArticleReqDto;
import com.example.write.domain.dto.response.ArticleResDto;
import com.example.write.domain.entity.Article;

import java.util.List;

public interface ArticleService {
    Article saveArticle(ArticleReqDto articleReqDto);

    void deleteArticle(Long promptId, Long userId);

    Article getArticle(Long id, Long userId);

    List<ArticleResDto> getArticles(Long userId);

    Article evaluateArticle(ArticleReqDto articleReqDto);
}
