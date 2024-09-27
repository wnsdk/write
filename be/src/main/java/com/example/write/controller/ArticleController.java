package com.example.write.controller;

import com.example.write.config.jwt.JwtProvider;
import com.example.write.domain.dto.request.ArticleReqDto;
import com.example.write.domain.dto.response.ArticleResDto;
import com.example.write.domain.entity.Article;
import com.example.write.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "글 API", description = "글(article) API")
@RestController
@RequestMapping("/article")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final JwtProvider jwtProvider;

    @Operation(summary = "글 저장하기", description = "유저가 작성한 글을 저장합니다.")
    @PostMapping
    public ResponseEntity<Article> saveArticle(@Parameter(description = "글 내용") @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {

        String accessToken = jwtProvider.getToken(request);
        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));

        articleReqDto.setUserId(userId); // userId를 통해 User 객체 설정
        Article savedArticle = articleService.saveArticle(articleReqDto);

        return ResponseEntity.ok(savedArticle);
    }

    @Operation(summary = "글 불러오기", description = "articleId를 이용해 글을 불러옵니다.")
    @GetMapping("/{articleId}")
    public ResponseEntity<Article> getArticle(@PathVariable Long articleId, HttpServletRequest request) {

        String accessToken = jwtProvider.getToken(request);
        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));

        Article article = articleService.getArticleById(articleId, userId);

        return ResponseEntity.ok(article);
    }

    @Operation(summary = "내가 쓴 모든 글 불러오기", description = "userId를 이용해 글을 불러옵니다.")
    @GetMapping
    public ResponseEntity<Page<ArticleResDto>> getArticlesByUser(
            @RequestParam(required = false) Long promptId,  // 글감 종류
            @RequestParam(required = false) Boolean isEvaluated,    // ai 평가 여부
            @RequestParam(required = false, defaultValue = "latest") String sort,
            Pageable pageable,
            HttpServletRequest request) {

        Pageable sortedPageable = getSortedPageable(pageable, sort);

        String accessToken = jwtProvider.getToken(request);
        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));

        Page<ArticleResDto> articles = articleService.getArticlesByUser(userId, promptId, isEvaluated, sortedPageable);

        return ResponseEntity.status(200).body(articles);
    }

    @Operation(summary = "글 삭제하기", description = "articleId를 이용해 글을 삭제합니다.")
    @DeleteMapping("/{articleId}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long articleId) {

        articleService.deleteArticle(articleId);
        return ResponseEntity.noContent().build();
    }

    private Pageable getSortedPageable(Pageable pageable, String sort) {
        Sort sortOrder;

        switch (sort.toLowerCase()) {
            case "oldest":  // 오래된 순
                sortOrder = Sort.by(Sort.Direction.ASC, "modifiedAt");
                break;
            case "latest":  // 최신순 (기본값)
            default:
                sortOrder = Sort.by(Sort.Direction.DESC, "modifiedAt");
                break;
        }

        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortOrder);
    }
}
