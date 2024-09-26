package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
import com.example.write.domain.enums.Category;
import com.example.write.domain.enums.Difficulty;
import com.example.write.domain.enums.Mode;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
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

    @Column(name = "mode", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private Mode mode;

    @Column(name = "difficulty", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "title_kr")
    private String titleKr;

    @Lob
    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "description_kr")
    private String descriptionKr;

    @Lob
    @Column(name = "body", columnDefinition = "TEXT")
    private String body;

    @Column(name = "usage_count", nullable = false)
    private Integer usageCount;

    @OneToMany(mappedBy = "prompt", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PromptTag> promptTags;

    public void updateUsageCount(int usageCount) {
        this.usageCount = usageCount;
    }
}
