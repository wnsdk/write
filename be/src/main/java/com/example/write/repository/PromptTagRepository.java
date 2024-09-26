package com.example.write.repository;

import com.example.write.domain.entity.PromptTag;
import com.example.write.domain.entity.PromptTagId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromptTagRepository extends JpaRepository<PromptTag, PromptTagId> {
    List<PromptTag> findByPrompt_PromptId(Long promptId);
}
