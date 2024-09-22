package com.example.write.domain.enums;

public enum Difficulty {
    BEGINNER("초급"),
    INTERMEDIATE("중급"),
    ADVANCED("고급"),
    EXPERT("전문가"),;

    private final String value;

    Difficulty(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
