package com.example.write.service;

import com.example.write.domain.dto.request.PromptReqDto;
import com.example.write.domain.dto.response.PromptResDto;
import com.example.write.domain.enums.Mode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PromptService {
    Page<PromptResDto> findByMode(Pageable pageable, Mode mode);

    PromptResDto findById(Long id);

    List<PromptResDto> saveAll(List<PromptReqDto> promptReqDtos);

    Page<PromptResDto> findPrompts(List<String> mode, List<String> difficulty, List<String> category, String writer, String query, Pageable pageable);
}
