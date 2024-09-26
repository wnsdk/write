package com.example.write.service;

import com.example.write.domain.dto.request.PromptReqDto;
import com.example.write.domain.dto.response.PromptResDto;
import com.example.write.domain.entity.Prompt;
import com.example.write.domain.entity.PromptTag;
import com.example.write.domain.entity.PromptTagId;
import com.example.write.domain.entity.Tag;
import com.example.write.domain.enums.Category;
import com.example.write.domain.enums.Difficulty;
import com.example.write.domain.enums.Mode;
import com.example.write.exception.BaseException;
import com.example.write.exception.ErrorMessage;
import com.example.write.repository.PromptRepository;
import com.example.write.repository.PromptTagRepository;
import com.example.write.repository.TagRepository;
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PromptServiceImpl implements PromptService {

    private final PromptRepository promptRepository;
    private final PromptTagRepository promptTagRepository;
    private final TagRepository tagRepository;

    @Override
    public Page<PromptResDto> findByMode(Pageable pageable, Mode mode) {
        Page<Prompt> prompts = promptRepository.findByMode(pageable, mode);

        return getPromptResDtos(pageable, prompts);
    }

    @Override
    public PromptResDto findById(Long id) {
        Prompt prompt = promptRepository.findById(id).orElseThrow(() -> new BaseException(ErrorMessage.CONTENT_NOT_EXIST));
        List<String> tagNames = getTagNames(prompt);

        return convertToDto(prompt, tagNames);
    }

    private List<String> getTagNames(Prompt prompt) {
        List<PromptTag> promptTags = promptTagRepository.findByPrompt_PromptId(prompt.getPromptId());
        List<String> tagNames = new ArrayList<>();
        for(PromptTag promptTag : promptTags) {
            tagNames.add(promptTag.getTag().getName());
        }
        return tagNames;
    }

    @Override
    public List<PromptResDto> saveAll(List<PromptReqDto> promptReqDtos) {
        List<PromptResDto> savedPromptResDtos = new ArrayList<>();

        for (PromptReqDto promptReqDto : promptReqDtos) {
            // Prompt 객체 생성
            Prompt prompt = Prompt.builder()
                    .category(promptReqDto.getCategory())
                    .mode(promptReqDto.getMode())
                    .difficulty(promptReqDto.getDifficulty())
                    .writer(promptReqDto.getWriter())
                    .title(promptReqDto.getTitle())
                    .titleKr(promptReqDto.getTitleKr())
                    .description(promptReqDto.getDescription())
                    .descriptionKr(promptReqDto.getDescriptionKr())
                    .body(promptReqDto.getBody())
                    .usageCount(0)
                    .build();

            PromptResDto promptResDto = convertToDto(promptReqDto);

            // Prompt 저장
            Prompt savedPrompt = promptRepository.save(prompt);

            // 태그 처리
            if (promptReqDto.getTags() != null) {
                for (String tagName : promptReqDto.getTags()) {
                    // 태그가 존재하는지 확인
                    Tag tag = tagRepository.findByName(tagName);
                    if (tag == null) {
                        tag = Tag.builder()
                                .name(tagName)
                                .build();
                        tagRepository.save(tag);
                    }

                    PromptTagId promptTagId = PromptTagId.builder()
                            .promptId(savedPrompt.getPromptId())
                            .tagId(tag.getTagId())
                            .build();

                    PromptTag promptTag = PromptTag.builder()
                            .prompt(savedPrompt)
                            .tag(tag)
                            .PromptTagId(promptTagId)
                            .build();
                    promptTagRepository.save(promptTag);

                    promptResDto.setTags(promptReqDto.getTags());
                }
            }

            savedPromptResDtos.add(promptResDto);
        }

        return savedPromptResDtos;
    }

    @Override
    public Page<PromptResDto> findPrompts(List<String> modes, List<String> difficulties, List<String> categories, String writer, String query, Pageable pageable) {
        Specification<Prompt> spec = Specification.where(null); // 초기 Specification

        if (modes != null && !modes.isEmpty()) {
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    root.get("mode").in(modes.stream().map(String::toUpperCase).collect(Collectors.toList())));
        }

        if (difficulties != null && !difficulties.isEmpty()) {
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    root.get("difficulty").in(difficulties.stream().map(String::toUpperCase).collect(Collectors.toList())));
        }

        if (categories != null && !categories.isEmpty()) {
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    root.get("category").in(categories.stream().map(String::toUpperCase).collect(Collectors.toList())));
        }

        if (writer != null && !writer.isEmpty()) {
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("writer"), writer));
        }

        if (query != null && !query.isEmpty()) {
            Specification<Prompt> titleSpec = (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("titleKr"), "%" + query + "%");

            Specification<Prompt> tagSpec = (root, criteriaQuery, criteriaBuilder) -> {
                // 태그와의 조인
                Join<Prompt, PromptTag> tagsJoin = root.join("promptTags"); // Prompt와 PromptTag의 관계
                return criteriaBuilder.like(tagsJoin.get("tag").get("name"), "%" + query + "%"); // 태그의 이름을 기준으로 like 조건 추가
            };

            // title 또는 tag 조건을 포함한 Specification 조합
            spec = spec.and(titleSpec.or(tagSpec));
        }

        // Prompt 엔티티를 Specification을 사용하여 조회하고, Page<PromptResDto>로 변환
        Page<Prompt> prompts = promptRepository.findAll(spec, pageable);

        return getPromptResDtos(pageable, prompts);
    }

//    Page<Prompt> -> Page<PromptResDto>
    private Page<PromptResDto> getPromptResDtos(Pageable pageable, Page<Prompt> prompts) {
        List<PromptResDto> promptResDtos = prompts.stream()
                .map(prompt -> {
                    List<String> tagNames = getTagNames(prompt);

                    // PromptResDto 생성자에 맞게 prompt 데이터를 매핑
                    return PromptResDto.builder()
                            .promptId(prompt.getPromptId())
                            .category(prompt.getCategory())
                            .mode(prompt.getMode())
                            .difficulty(prompt.getDifficulty())
                            .writer(prompt.getWriter())
                            .title(prompt.getTitle())
                            .titleKr(prompt.getTitleKr())
                            .description(prompt.getDescription())
                            .descriptionKr(prompt.getDescriptionKr())
                            .body(prompt.getBody())
                            .usageCount(prompt.getUsageCount())
                            .tags(tagNames)
                            .build();
                })
                .collect(Collectors.toList());

        return new PageImpl<>(promptResDtos, pageable, prompts.getTotalElements());
    }

    private static PromptResDto convertToDto(PromptReqDto promptReqDto) {
        PromptResDto promptResDto = PromptResDto.builder()
                .category(promptReqDto.getCategory())
                .mode(promptReqDto.getMode())
                .difficulty(promptReqDto.getDifficulty())
                .writer(promptReqDto.getWriter())
                .title(promptReqDto.getTitle())
                .titleKr(promptReqDto.getTitleKr())
                .description(promptReqDto.getDescription())
                .descriptionKr(promptReqDto.getDescriptionKr())
                .body(promptReqDto.getBody())
                .build();
        return promptResDto;
    }

    private static PromptResDto convertToDto(Prompt prompt, List<String> tagNames) {
        return PromptResDto.builder()
                .category(prompt.getCategory())
                .mode(prompt.getMode())
                .difficulty(prompt.getDifficulty())
                .writer(prompt.getWriter())
                .title(prompt.getTitle())
                .titleKr(prompt.getTitleKr())
                .description(prompt.getDescription())
                .descriptionKr(prompt.getDescriptionKr())
                .body(prompt.getBody())
                .usageCount(prompt.getUsageCount())
                .tags(tagNames)
                .build();
    }
    
}
