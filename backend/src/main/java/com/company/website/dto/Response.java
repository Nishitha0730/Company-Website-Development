package com.company.website.dto;

public class Response {
    private String message;
    private Object data;

    public Response(String message, Object data) {
        this.message = message;
        this.data = data;
    }

    // ✅ Add getters (no need for setters if you only return)
    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }
}
