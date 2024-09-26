package com.example.write.domain.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Embeddable
public class PromptTagId implements Serializable {
    private Long promptId;
    private Long tagId;

    // equals() 및 hashCode() 메서드 구현
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PromptTagId)) return false;
        PromptTagId that = (PromptTagId) o;
        return Objects.equals(promptId, that.promptId) && Objects.equals(tagId, that.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(promptId, tagId);
    }
}

