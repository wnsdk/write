package com.example.write.domain.dto.response;

import com.example.write.domain.enums.Category;
import com.example.write.domain.enums.Difficulty;
import com.example.write.domain.enums.Mode;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PromptResDto {
    private Long promptId; // 프롬프트 ID, 필요할 경우

    private Category category; // 카테고리
    private Mode mode; // 모드
    private Difficulty difficulty; // 난이도
    private String writer; // 작성자
    private String title; // 제목
    private String titleKr; // 제목(한글)
    private String description; // 설명
    private String descriptionKr; // 설명(한글)
    private String body; // 본문

    private List<String> tags; // 연결할 태그 ID 리스트

}
