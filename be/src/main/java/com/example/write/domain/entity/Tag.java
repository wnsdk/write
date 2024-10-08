package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
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
@Table(name = "tag")
public class Tag extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", nullable = false)
    private Long tagId;

    @Column(name = "name", length = 50, nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "tag")
    private Set<PromptTag> promptTags = new HashSet<>();
}