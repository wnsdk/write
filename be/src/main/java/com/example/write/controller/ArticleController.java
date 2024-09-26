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
    @PostMapping("/save")
    public ResponseEntity<Article> saveArticle(@Parameter(description = "글 내용") @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {

        String accessToken = jwtProvider.getToken(request);
        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));

        articleReqDto.setUserId(userId); // userId를 통해 User 객체 설정
        Article savedArticle = articleService.saveArticle(articleReqDto);

        return ResponseEntity.ok(savedArticle);
    }

    @Operation(summary = "글 불러오기", description = "articleId를 이용해 글을 불러옵니다.")
    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Long id, HttpServletRequest request) {

        String accessToken = jwtProvider.getToken(request);
        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));

        Article article = articleService.getArticle(id, userId);

        return ResponseEntity.ok(article);
    }

    @Operation(summary = "내가 쓴 글 불러오기", description = "userId를 이용해 글을 불러옵니다.")
    @GetMapping
    public ResponseEntity<List<ArticleResDto>> getArticle(HttpServletRequest request) {

        String accessToken = jwtProvider.getToken(request);
        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));

        List<ArticleResDto> articles = articleService.getArticles(userId);

        return ResponseEntity.status(200).body(articles);
    }

    @Operation(summary = "ai 평가 저장하기", description = "ai의 평가를 저장합니다.")
    @PostMapping("/evaluation")
    public ResponseEntity<Article> evaluateArticle(@Parameter(description = "글 내용") @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {

        String accessToken = jwtProvider.getToken(request);
        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));

        articleReqDto.setUserId(userId); // userId를 통해 User 객체 설정
        Article savedArticle = articleService.evaluateArticle(articleReqDto);

        return ResponseEntity.ok(savedArticle);
    }
}
