package com.example.write.exception;

import org.springframework.http.HttpStatus;

public enum ErrorMessage {
    CONTENT_NOT_EXIST(100, "콘텐츠가 존재하지 않습니다.", HttpStatus.NOT_FOUND),
    USER_EXIST(201, "이미 가입한 유저입니다.", HttpStatus.BAD_REQUEST),
    USER_NOT_EXIST(202, "존재하지 않는 유저입니다.", HttpStatus.BAD_REQUEST),
    DELETED_USER(203, "탈퇴한 유저입니다.", HttpStatus.BAD_REQUEST),
    INSUFFICIENT_REQUEST_DATA(300, "요청 데이터가 불충분합니다.", HttpStatus.BAD_REQUEST),
    REFRESH_TOKEN_EXPIRE(900, "refresh 토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED),
    REFRESH_TOKEN_NOT_MATCH(901, "refresh 토큰이 일치하지 않습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_EXPIRE(1000, "access 토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_INVALID(1001, "토큰이 잘못되었습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_NOT_LOAD(1002, "토큰을 불러오지 못하였습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_DENIED(1003, "권한이 없습니다.", HttpStatus.FORBIDDEN),
    ACCESS_TOKEN_INVALID_STRUCT(1010, "토큰이 구조가 잘못되었습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_INVALID_HEADER(1011, "토큰 해더가 손상되었습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_INVALID_PAYLOADS(1012, "토큰 정보가 손상되었습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_INVALID_SIGNATURE(1013, "access 토큰이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_EMPTY(1014, "access 토큰이 입력되지 않았습니다.", HttpStatus.UNAUTHORIZED);

    private final Integer code;
    private final String errMsg;
    private final HttpStatus httpStatus;

    ErrorMessage(int code, String errMsg, HttpStatus httpStatus) {
        this.code = code;
        this.errMsg = errMsg;
        this.httpStatus = httpStatus;
    }

    public int getErrorCode() {
        return code;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getErrorMessage() {
        return errMsg;
    }
}
