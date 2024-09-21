package com.example.write.controller;

import com.example.write.domain.entity.Prompt;
import com.example.write.domain.enums.Mode;
import com.example.write.repository.PromptRepository;
import com.example.write.service.PromptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "글감 API", description = "글감(prompt) API")
@RestController
@RequestMapping("/prompt")
@RequiredArgsConstructor
public class PromptController {

    private final PromptService promptService;

    // Pageable: 요청 URL의 쿼리 파라미터에서 페이지 정보(예: ?page=0&size=10)를 자동으로 추출해줌.
    @Operation(summary = "작문 글감 목록 불러오기", description = "작문 글감 목록을 불러옵니다.")
    @Parameter(name = "pageable", description = "?page=0&size=10")
    @GetMapping("/writing")
    public ResponseEntity<Page<Prompt>> getWritingPrompts(Pageable pageable) {
        Page<Prompt> prompts = promptService.findByMode(pageable, Mode.WRITING);
        return ResponseEntity.ok(prompts);
    }

    @Operation(summary = "필사 글감 목록 불러오기", description = "필사 글감 목록을 불러옵니다.")
    @Parameter(name = "pageable", description = "?page=0&size=10")
    @GetMapping("/copying")
    public ResponseEntity<Page<Prompt>> getCopyingPrompts(Pageable pageable) {
        Page<Prompt> prompts = promptService.findByMode(pageable, Mode.COPYING);
        return ResponseEntity.ok(prompts);
    }

    @Operation(summary = "번역 글감 목록 불러오기", description = "번역 글감 목록을 불러옵니다.")
    @Parameter(name = "pageable", description = "?page=0&size=10")
    @GetMapping("/translating")
    public ResponseEntity<Page<Prompt>> getTranslatingPrompts(Pageable pageable) {
        Page<Prompt> prompts = promptService.findByMode(pageable, Mode.TRANSLATING);
        return ResponseEntity.ok(prompts);
    }
}
