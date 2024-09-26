package com.example.write.domain.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class ArticleId implements Serializable {
    private Long userId;
    private Long promptId;

    // equals()와 hashCode() 메서드 구현
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ArticleId)) return false;
        ArticleId articleId = (ArticleId) o;
        return Objects.equals(userId, articleId.userId) &&
                Objects.equals(promptId, articleId.promptId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, promptId);
    }

    // Getter와 Setter 추가
}