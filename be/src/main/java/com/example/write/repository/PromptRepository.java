package com.example.write.repository;

import com.example.write.domain.dto.response.PromptResDto;
import com.example.write.domain.entity.Prompt;
import com.example.write.domain.enums.Mode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface PromptRepository extends JpaRepository<Prompt, Long>, JpaSpecificationExecutor<Prompt> {
    Page<Prompt> findByMode(Pageable pageable, Mode mode);
}
