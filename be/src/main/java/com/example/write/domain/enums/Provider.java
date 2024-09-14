package com.example.write.domain.enums;

public enum Provider {
    GOOGLE("GOOGLE"),
    APPLE("APPLE");

    private final String value;

    Provider(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
