package com.example.write.service;

import com.example.write.domain.dto.request.ArticleReqDto;
import com.example.write.domain.entity.Article;
import com.example.write.domain.entity.Prompt;
import com.example.write.domain.entity.User;
import com.example.write.exception.BaseException;
import com.example.write.exception.ErrorMessage;
import com.example.write.repository.ArticleRepository;
import com.example.write.repository.PromptRepository;
import com.example.write.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final PromptRepository promptRepository;

    @Override
    public Article saveArticle(ArticleReqDto articleReqDto) {

        User user = userRepository.findById(articleReqDto.getUserId()).orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_USER));
        Prompt prompt = promptRepository.findById(articleReqDto.getPromptId()).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));

        Optional<Article> optionalArticle = Optional.empty();
        if (articleReqDto.getArticleId() != null) {
            optionalArticle = articleRepository.findById(articleReqDto.getArticleId());
        }

        Article savedArticle = null;
        if (articleReqDto.getArticleId() == null || optionalArticle.isEmpty()) {
            Article article = Article.builder()
                    .body(articleReqDto.getBody())
                    .user(user)
                    .prompt(prompt)
                    .build();

            savedArticle = articleRepository.save(article);
        }
        else {
            Article article = optionalArticle.get();
            article.updateBody(articleReqDto.getBody());
            savedArticle = articleRepository.save(article);
        }

        return savedArticle;
    }

    @Override
    public Article getArticle(Long id, Long userId) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        if (!article.getUser().getUserId().equals(userId)) {
            throw new BaseException(ErrorMessage.ACCESS_DENIED);
        }
        return article;
    }
}
