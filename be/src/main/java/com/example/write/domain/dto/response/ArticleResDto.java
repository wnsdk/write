package com.example.write.domain.dto.response;

import com.example.write.domain.entity.Prompt;
import com.example.write.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ArticleResDto {
    private Long articleId;

    private PromptResDto promptResDto; // 관련 글감

    private String body; // 작성된 글 내용

    private Integer score;

    private String evaluation;

    private LocalDateTime evaluatedAt;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
