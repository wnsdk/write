package com.example.write.service;

import com.example.write.domain.entity.Prompt;
import com.example.write.domain.enums.Mode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PromptService {
    Page<Prompt> findByMode(Pageable pageable, Mode mode);
}
