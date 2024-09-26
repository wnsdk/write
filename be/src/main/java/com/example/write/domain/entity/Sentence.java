//package com.example.write.domain.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Getter
//@ToString
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@AllArgsConstructor(access = AccessLevel.PROTECTED)
//@Builder
//@Entity
//@Table(name = "Sentence")
//public class Sentence {
//
//    @EmbeddedId
//    private ArticleId articleId; // A 테이블의 복합키
//
//    @ManyToOne
//    @MapsId("articleId") // 복합키에서 외래키 매핑
//    @JoinColumns({
//            @JoinColumn(name = "user_id", referencedColumnName = "userId", insertable = false, updatable = false),
//            @JoinColumn(name = "prompt_id", referencedColumnName = "promptId", insertable = false, updatable = false)
//    })
//    private Article article; // A 테이블 (Article)과의 관계
//
//    @Column(name = "sentence", nullable = false, length = 255)
//    private String sentence;
//}
