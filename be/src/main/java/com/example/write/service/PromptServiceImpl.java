package com.example.write.service;

import com.example.write.domain.entity.Prompt;
import com.example.write.domain.enums.Mode;
import com.example.write.repository.PromptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PromptServiceImpl implements PromptService{

    private final PromptRepository promptRepository;

    @Override
    public Page<Prompt> findByMode(Pageable pageable, Mode mode) {
        return promptRepository.findByMode(pageable, mode);
    }
}
