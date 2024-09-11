package com.example.write.config.oauth;

import com.example.write.domain.entity.User;
import com.example.write.domain.enums.Provider;
import com.example.write.domain.enums.Role;
import lombok.Builder;

import java.util.Map;

@Builder
public record OAuth2UserInfo(
        String email,
        String name,
        String profile
) {

    public static OAuth2UserInfo of(String registrationId, Map<String, Object> attributes) {
        return switch (registrationId) {
            case "GOOGLE" -> ofGoogle(attributes);
            default -> throw new IllegalArgumentException("Invalid Provider Type.");
        };
    }

    private static OAuth2UserInfo ofGoogle(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .profile((String) attributes.get("picture"))
                .build();
    }

    public User toEntity() {
        return User.builder()
                .email(email)
                .name(name)
                .profile(profile)
                .role(Role.USER)
                .build();
    }
}
