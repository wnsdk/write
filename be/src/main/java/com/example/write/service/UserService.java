package com.example.write.service;

import com.example.write.domain.entity.User;

public interface UserService {

    User registerUser(String name, String email, String profile, String role, String provider) throws Exception;

    User deleteUser(String email);

    User updateUser(String email, String name, String profile);
}
