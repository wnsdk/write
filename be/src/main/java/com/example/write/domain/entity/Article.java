package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "article")
public class Article extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long articleId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference  // article을 직렬화할 때는 user 정보가 직렬화된다.
    private User user; // 작성한 유저

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prompt_id", nullable = false)
    @JsonBackReference
    private Prompt prompt; // 관련 글감

    @Lob
    @Column(nullable = false)
    private String body; // 작성된 글 내용

    private Integer score;

    private String evaluation;

    @Column(name = "evaluated_at")
    private LocalDateTime evaluatedAt;

    public void updateBody(String body) {
        this.body = body;
    }

    public void updateEvaluation(Integer score, String evaluation) {
        this.score = score;
        this.evaluation = evaluation;
        this.evaluatedAt = LocalDateTime.now();
    }
}
