package com.example.write.domain.enums;

public enum Category {
    NOVEL("소설"),
    ESSAY("에세이"),
    DIALOGUE("대화"),
    INTERVIEW("인터뷰"),
    LETTER("편지"),
    DIARY("일기"),
    PLAY("희곡"),
    Editorial("논설문");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
