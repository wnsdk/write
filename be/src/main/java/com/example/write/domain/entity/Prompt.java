package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
import com.example.write.domain.enums.Category;
import com.example.write.domain.enums.Mode;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "prompt")
public class Prompt extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prompt_id", nullable = false)
    private Long promptId;

    @Column(name = "category", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "mode", nullable = false)
    @Enumerated(EnumType.STRING)
    private Mode mode;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "body")
    private String body;

    @OneToMany(mappedBy = "prompt")
    private Set<PromptTag> promptTags = new HashSet<>();
}
