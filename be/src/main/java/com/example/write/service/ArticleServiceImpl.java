package com.example.write.service;

import com.example.write.domain.dto.request.ArticleReqDto;
import com.example.write.domain.dto.response.ArticleResDto;
import com.example.write.domain.entity.Article;
import com.example.write.domain.entity.ArticleId;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final PromptRepository promptRepository;
    private final PromptService promptService;

    @Override
    public Article saveArticle(ArticleReqDto articleReqDto) {

        User user = userRepository.findById(articleReqDto.getUserId()).orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_USER));
        Prompt prompt = promptRepository.findById(articleReqDto.getPromptId()).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));

        Optional<Article> optionalArticle = Optional.empty();
        if (articleReqDto.getUserId() != null && articleReqDto.getPromptId() != null) {
            ArticleId articleId = ArticleId.builder()
                    .userId(articleReqDto.getUserId())
                    .promptId(articleReqDto.getPromptId())
                    .build();
            optionalArticle = articleRepository.findById(articleId);
        }

        Article savedArticle = null;

        // 처음 저장이라면
        if (optionalArticle.isEmpty()) {
            ArticleId articleId = getArticleId(prompt.getPromptId(), user.getUserId());
            Article article = Article.builder()
                    .body(articleReqDto.getBody())
                    .articleId(articleId)
                    .prompt(prompt)
                    .user(user)
                    .build();

            savedArticle = articleRepository.save(article);

            // 글감 사용 횟수 증가
            prompt.updateUsageCount(prompt.getUsageCount() + 1);
            promptRepository.save(prompt);
        }
        else {
            Article article = optionalArticle.get();
            article.updateBody(articleReqDto.getBody());
            savedArticle = articleRepository.save(article);
        }

        return savedArticle;
    }

    @Override
    public void deleteArticle(Long promptId, Long userId) {
        ArticleId articleId = getArticleId(promptId, userId);
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        articleRepository.delete(article);

        // 글감 사용 횟수 감소
//        Prompt prompt = article.getPrompt();
//        prompt.updateUsageCount(prompt.getUsageCount() - 1);
//        promptRepository.save(prompt);
    }

    @Override
    public Article getArticle(Long id, Long userId) {
        ArticleId articleId = getArticleId(id, userId);

        Article article = articleRepository.findById(articleId).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        if (!article.getUser().getUserId().equals(userId)) {
            throw new BaseException(ErrorMessage.ACCESS_DENIED);
        }
        return article;
    }

    private static ArticleId getArticleId(Long promptId, Long userId) {
        return ArticleId.builder()
                .promptId(promptId)
                .userId(userId)
                .build();
    }

    @Override
    public List<ArticleResDto> getArticles(Long userId) {
        List<Article> articles = articleRepository.findByUserId(userId);
        List<ArticleResDto> articleResDtos = new ArrayList<>();

        for (Article article : articles) {
            ArticleResDto articleResDto = ArticleResDto.builder()
                    .promptResDto(promptService.findById(article.getPrompt().getPromptId()))
                    .body(article.getBody())
                    .score(article.getScore())
                    .evaluation(article.getEvaluation())
                    .evaluatedAt(article.getEvaluatedAt())
                    .createdAt(article.getCreatedAt())
                    .modifiedAt(article.getModifiedAt())
                    .build();
            articleResDtos.add(articleResDto);
        }

        return articleResDtos;
    }

    @Override
    public Article evaluateArticle(ArticleReqDto articleReqDto) {
        ArticleId articleId = getArticleId(articleReqDto.getPromptId(), articleReqDto.getUserId());
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        article.updateEvaluation(articleReqDto.getScore(), article.getEvaluation());
        return articleRepository.save(article);
    }
}
