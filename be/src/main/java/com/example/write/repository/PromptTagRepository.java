package com.example.write.repository;

import com.example.write.domain.entity.PromptTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromptTagRepository extends JpaRepository<PromptTag, Long> {
    List<PromptTag> findByPrompt_PromptId(Long promptId);
}
