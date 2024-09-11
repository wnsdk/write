package com.example.write.config.oauth;

import com.example.write.domain.entity.User;
import com.example.write.domain.enums.Provider;
import com.example.write.domain.enums.Role;
import com.example.write.domain.enums.Status;
import com.example.write.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // 유저 정보(OAuth2UserInfo) 생성
        Map<String, Object> oAuth2UserAttributes = super.loadUser(userRequest).getAttributes();
        String registrationId = userRequest.getClientRegistration().getRegistrationId().toUpperCase();    // third-party id (ex. google)
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfo.of(registrationId, oAuth2UserAttributes);

        // 존재하지 않는 유저라면 회원가입, 존재하는 유저라면 업데이트
        Optional<User> findUser = userRepository.findByEmail(oAuth2UserInfo.email());
        User savedUser = null;
        if (findUser.isEmpty()) {
            User user = User.builder()
                    .email(oAuth2UserInfo.email())
                    .name(oAuth2UserInfo.name())
                    .profile(oAuth2UserInfo.profile())
                    .role(Role.USER)
                    .status(Status.ACTIVE)
                    .provider(Provider.valueOf(registrationId))
                    .build();
            savedUser = userRepository.save(user);
        }
        else {
            savedUser = findUser.get();
            savedUser.updateUser(oAuth2UserInfo.name(), oAuth2UserInfo.profile());
        }

        return new PrincipalDetails(savedUser, oAuth2UserAttributes);
    }
}
