package com.example.write.domain.entity;

import com.example.write.domain.BaseTimeEntity;
import com.example.write.domain.enums.Provider;
import com.example.write.domain.enums.Role;
import com.example.write.domain.enums.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "user")
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long userId;    // 고유 번호

    @Column(name = "email", nullable = false, unique = true)
    private String email;   // 사용자 이메일

    @Column(name = "name", nullable = false)
    private String name;    // 사용자 이름

    @Column(name = "profile")
    private String profile; // 프로필 사진 URL

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;      // 사용자 권한

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;  // 사용자 상태 (일시정지, 탈퇴 등)

    @Column(name = "provider", nullable = false)
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference   // user를 직렬화 할 때 articles는 직렬화되지 않는다.
    private List<Article> articles;

    public void updateStatus(Status status) {
        this.status = status;
    }

    public void updateUser(String name, String profile) {
        this.name = name;
        this.profile = profile;
    }
}
