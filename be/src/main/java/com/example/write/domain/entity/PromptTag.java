package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "prompt_tag")
public class PromptTag extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "promptId", referencedColumnName = "promptId", nullable = false)
    private Prompt prompt;

    @ManyToOne
    @JoinColumn(name = "tagId", referencedColumnName = "tagId", nullable = false)
    private Tag tag;
}
