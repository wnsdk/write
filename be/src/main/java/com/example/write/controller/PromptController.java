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
import org.springframework.web.bind.annotation.PathVariable;
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
    @Operation(summary = "글감 목록 불러오기", description = "글감 목록을 불러옵니다.")
    @Parameter(name = "pageable", description = "?page=0&size=10")
    @GetMapping("/list/{mode}")
    public ResponseEntity<Page<Prompt>> getPrompts(@PathVariable String mode, Pageable pageable) {
//        Mode promptMode;
//        switch (mode.toUpperCase()) {
//            case "WRITING":
//                promptMode = Mode.WRITING;
//                break;
//            case "COPYING":
//                promptMode = Mode.COPYING;
//                break;
//            case "TRANSLATING":
//                promptMode = Mode.TRANSLATING;
//                break;
//            default:
//                return ResponseEntity.badRequest().build(); // 잘못된 모드에 대한 처리
//        }

        Page<Prompt> prompts = promptService.findByMode(pageable, Mode.valueOf(mode.toUpperCase()));
        return ResponseEntity.ok(prompts);
    }

    @Operation(summary = "글감 불러오기", description = "글감을 불러옵니다.")
    @GetMapping("/{id}")
    public ResponseEntity<Prompt> getPrompt(@PathVariable Long id) {
        Prompt prompt = promptService.findById(id);

        return ResponseEntity.ok(prompt);
    }
}
