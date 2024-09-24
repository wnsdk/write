package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

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
    private Long articleId; // 고유 글 ID

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 작성한 유저

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prompt_id", nullable = false)
    private Prompt prompt; // 관련 글감

    @Lob
    @Column(nullable = false)
    private String body; // 작성된 글 내용

    public void updateBody(String body) {
        this.body = body;
    }
}
