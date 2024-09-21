package com.example.write.domain.enums;

public enum Mode {
    WRITING("WRITING"),
    COPYING("COPYING"),
    TRANSLATING("TRANSLATING");

    private final String value;

    Mode(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
