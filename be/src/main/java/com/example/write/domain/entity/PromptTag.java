package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
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
    @JsonIgnore
    private Prompt prompt;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tagId", referencedColumnName = "tag_id", nullable = false)
    @JsonBackReference
    private Tag tag;

    @Override
    public String toString() {
        return "PromptTag{" +
                "PromptTagId=" + PromptTagId +
                '}';
    }
}
