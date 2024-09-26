package com.example.write.controller;

import com.example.write.domain.dto.request.PromptReqDto;
import com.example.write.domain.dto.response.PromptResDto;
import com.example.write.domain.entity.Prompt;
import com.example.write.domain.enums.Mode;
import com.example.write.repository.PromptRepository;
import com.example.write.service.PromptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "글감 API", description = "글감(prompt) API")
@RestController
@RequestMapping("/prompt")
@RequiredArgsConstructor
public class PromptController {

    private final PromptService promptService;

    // Pageable: 요청 URL의 쿼리 파라미터에서 페이지 정보(예: ?page=0&size=10)를 자동으로 추출해줌.
    @Operation(summary = "글감 목록 불러오기", description = "글감 목록을 불러옵니다.")
    @Parameter(name = "pageable", description = "?page=0&size=10")
    @GetMapping("/prompts")
    public ResponseEntity<Page<PromptResDto>> getPrompts(@RequestParam(required = false) List<String> mode,
                                                         @RequestParam(required = false) List<String> difficulty,
                                                         @RequestParam(required = false) List<String> category,
                                                         @RequestParam(required = false) String writer,
                                                         @RequestParam(required = false) String query,
                                                         @RequestParam(required = false, defaultValue = "latest") String sort,
                                                         Pageable pageable) {
        Pageable sortedPageable = getSortedPageable(pageable, sort);
        Page<PromptResDto> promptResDtos = promptService.findPrompts(mode, difficulty, category, writer, query, sortedPageable);
        return ResponseEntity.ok(promptResDtos);
    }

    @Operation(summary = "글감 불러오기", description = "글감을 불러옵니다.")
    @GetMapping("/{id}")
    public ResponseEntity<PromptResDto> getPrompt(@PathVariable Long id) {
        PromptResDto promptResDtos = promptService.findById(id);

        return ResponseEntity.ok(promptResDtos);
    }

    @Operation(summary = "여러 글감 등록하기", description = "여러 개의 글감을 한꺼번에 등록합니다.")
    @PostMapping("/prompts")
    public ResponseEntity<List<PromptResDto>> createPrompts(@RequestBody List<PromptReqDto> promptReqDtos) {
        List<PromptResDto> createdPrompts = promptService.saveAll(promptReqDtos);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPrompts);
    }

    private Pageable getSortedPageable(Pageable pageable, String sort) {
        Sort sortOrder;

        switch (sort.toLowerCase()) {
            case "oldest":  // 오래된 순
                sortOrder = Sort.by(Sort.Direction.ASC, "createdAt");
                break;
            case "popular":  // 인기순
                sortOrder = Sort.by(Sort.Direction.DESC, "usageCount");  // 조회수나 인기 필드로 정렬
                break;
            case "latest":  // 최신순 (기본값)
            default:
                sortOrder = Sort.by(Sort.Direction.DESC, "createdAt");
                break;
        }

        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortOrder);
    }
}
