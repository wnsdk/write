package com.example.write.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "Sentence")
public class Sentence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "articleId", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "promptId", nullable = false)
    private Prompt prompt;

    @Column(name = "sentence", nullable = false, length = 255)
    private String sentence;
}
