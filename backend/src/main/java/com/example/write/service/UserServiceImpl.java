package com.example.write.service;

//import com.example.write.config.jwt.JwtProvider;
import com.example.write.domain.entity.User;
import com.example.write.domain.enums.Provider;
import com.example.write.domain.enums.Role;
import com.example.write.domain.enums.Status;
import com.example.write.exception.BaseException;
import com.example.write.exception.ErrorMessage;
import com.example.write.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
//        registerUser("박관리", "admin@example.com", "https://bit.ly/4e9bnA3", "ADMIN");
//        registerUser("김유저", "user@example.com", "https://bit.ly/3RijqAK", "USER");
    }

    // 회원 가입
    @Override
    public User registerUser(String name, String email, String profile, String role, String provider) throws Exception {

        userRepository.findByEmail(email).ifPresent(user -> {
            // 이미 탈퇴했던 유저
            if (user.getStatus().getValue().equals(Status.DELETED.getValue())) {
                throw new BaseException(ErrorMessage.DELETED_USER);
            }
            // 이미 가입한 유저
            else {
                throw new BaseException(ErrorMessage.EXIST_USER);
            }
        });

        User user = User.builder()
                .name(name)
                .email(email)
                .profile(profile)
                .role(Role.valueOf(role))
                .status(Status.ACTIVE)
                .provider(Provider.valueOf(provider))
                .build();

        return userRepository.save(user);
    }

    // 회원 탈퇴
    @Override
    public User deleteUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_USER));
        user.setStatus(Status.DELETED);
        return user;
    }

    // 회원 수정
    @Override
    public User updateUser(String email, String name, String profile) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_USER));
        user.updateUser(name, profile);
        return user;
    }
}
