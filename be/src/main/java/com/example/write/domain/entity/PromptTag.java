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
@Table(name = "prompt_tag")
public class PromptTag extends BaseTimeEntity {
    @EmbeddedId
    private PromptTagId PromptTagId;

    @ManyToOne
    @MapsId("promptId")
    @JoinColumn(name = "promptId", referencedColumnName = "prompt_id", nullable = false)
    private Prompt prompt;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tagId", referencedColumnName = "tag_id", nullable = false)
    private Tag tag;
}
