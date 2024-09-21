package com.example.write.repository;

import com.example.write.domain.entity.Prompt;
import com.example.write.domain.enums.Mode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromptRepository extends JpaRepository<Prompt, Long> {
    Page<Prompt> findByMode(Pageable pageable, Mode mode);
}
