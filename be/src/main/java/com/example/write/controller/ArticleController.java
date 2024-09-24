package com.example.write.controller;

import com.example.write.config.jwt.JwtProvider;
import com.example.write.domain.dto.request.ArticleReqDto;
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

//    @GetMapping
//    public ResponseEntity<List<Article>> getArticles(HttpServletRequest request) {
//        String accessToken = jwtProvider.getToken(request);
//        Long userId = Long.parseLong(jwtProvider.getSub(accessToken));
//
//        List<Article> articles = articleService.getArticles(userId);
//        return ResponseEntity.ok(articles);
//    }
}
