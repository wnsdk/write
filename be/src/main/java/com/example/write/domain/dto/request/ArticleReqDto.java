package com.example.write.domain.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ArticleReqDto {

    private Long articleId;

    private Long userId;

    private Long promptId;

    private String body;
}
