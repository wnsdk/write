package com.example.write.controller;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    @GetMapping("")
    public ResponseEntity<String> pingPong throws Exception {
        return new ResponseEntity<>("서버와 연결이 되었습니다.", HttpStatus.CREATED);
    }
}
