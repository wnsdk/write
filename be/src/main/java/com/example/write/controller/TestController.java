package com.example.write.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    @GetMapping("")
    public ResponseEntity<String> pingPong() throws Exception {
        return new ResponseEntity<>("서버와 연결이 되었습니다.", HttpStatus.CREATED);
    }
}
