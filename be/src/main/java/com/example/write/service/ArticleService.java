package com.example.write.service;

import com.example.write.domain.dto.request.ArticleReqDto;
import com.example.write.domain.entity.Article;

public interface ArticleService {
    Article saveArticle(ArticleReqDto articleReqDto);

    Article getArticle(Long id, Long userId);
}
