package com.example.write.service;

import com.example.write.domain.dto.request.ArticleReqDto;
import com.example.write.domain.dto.response.ArticleResDto;
import com.example.write.domain.entity.Article;
import com.example.write.domain.entity.Prompt;
import com.example.write.domain.entity.PromptTag;
import com.example.write.domain.entity.User;
import com.example.write.exception.BaseException;
import com.example.write.exception.ErrorMessage;
import com.example.write.repository.ArticleRepository;
import com.example.write.repository.PromptRepository;
import com.example.write.repository.UserRepository;
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if (articleReqDto.getUserId() == null || articleReqDto.getPromptId() == null) {
            throw new BaseException(ErrorMessage.INSUFFICIENT_REQUEST_DATA);
        }

        List<Article> articles = articleRepository.findAllByUser_UserIdAndPrompt_PromptId(articleReqDto.getUserId(), articleReqDto.getPromptId());

        Article savedArticle = null;
        if (articleReqDto.getArticleId() == null && articles.isEmpty()) {
            savedArticle = saveNewArticle(articleReqDto);
        }
        else {
            savedArticle = saveOldArticle(articleReqDto);
        }

        return savedArticle;
    }

    /**
     * 새 글을 저장
     * @param articleReqDto
     * @return
     */
    private Article saveNewArticle(ArticleReqDto articleReqDto) {

        User user = userRepository.findById(articleReqDto.getUserId()).orElseThrow(() -> new BaseException(ErrorMessage.USER_NOT_EXIST));
        Prompt prompt = promptRepository.findById(articleReqDto.getPromptId()).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));

        Article article = Article.builder()
                .body(articleReqDto.getBody())
                .prompt(prompt)
                .user(user)
                .build();

        if (articleReqDto.getScore() != null && articleReqDto.getEvaluation() != null) {
            article.updateEvaluation(articleReqDto.getScore(), articleReqDto.getEvaluation());
        }

        // 글감 사용 횟수 증가
        prompt.updateUsageCount(prompt.getUsageCount() + 1);
        promptRepository.save(prompt);

        return articleRepository.save(article);
    }

    private Article saveOldArticle(ArticleReqDto articleReqDto) {

        if (articleReqDto.getArticleId() == null) {
            throw new BaseException(ErrorMessage.INSUFFICIENT_REQUEST_DATA);
        }

        Article article = articleRepository.findById(articleReqDto.getArticleId()).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        article.updateBody(articleReqDto.getBody());

        if (articleReqDto.getScore() != null && articleReqDto.getEvaluation() != null) {
            article.updateEvaluation(articleReqDto.getScore(), articleReqDto.getEvaluation());
        }

        return articleRepository.save(article);
    }

    @Override
    public void deleteArticle(Long articleId) {
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        articleRepository.delete(article);

        // 글감 사용 횟수 감소
//        Prompt prompt = article.getPrompt();
//        prompt.updateUsageCount(prompt.getUsageCount() - 1);
//        promptRepository.save(prompt);
    }

    /**
     *
     * @param articleId
     * @param userId
     * @return
     */
    @Override
    public Article getArticleById(Long articleId, Long userId) {
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        if (!article.getUser().getUserId().equals(userId)) {
            throw new BaseException(ErrorMessage.ACCESS_DENIED);
        }
        return article;
    }

    /**
     *
     * @param userId
     * @return 어떤 유저가 작성한 모든 글(최신순)
     */
    @Override
    public Page<ArticleResDto> getArticlesByUser(Long userId, Long promptId, Boolean isEvaluated, Pageable pageable) {
        Specification<Article> specification = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // userId로 필터링
            predicates.add(cb.equal(root.get("user").get("userId"), userId));

            // promptId가 null이 아닌 경우 필터링 조건 추가
            if (promptId != null) {
                predicates.add(cb.equal(root.get("prompt").get("promptId"), promptId));
            }

            // isEvaluated가 null이 아닌 경우 필터링 조건 추가 (evaluatedAt이 null인지 아닌지 판단)
            if (isEvaluated != null) {
                if (isEvaluated) {
                    predicates.add(cb.isNotNull(root.get("evaluatedAt")));
                } else {
                    predicates.add(cb.isNull(root.get("evaluatedAt")));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return articleRepository.findAll(specification, pageable).map(article -> ArticleResDto.builder()
                .articleId(article.getArticleId())
                .promptResDto(promptService.findById(article.getPrompt().getPromptId()))
                .body(article.getBody())
                .score(article.getScore())
                .evaluation(article.getEvaluation())
                .evaluatedAt(article.getEvaluatedAt())
                .createdAt(article.getCreatedAt())
                .modifiedAt(article.getModifiedAt())
                .build()
        );
    }
}
