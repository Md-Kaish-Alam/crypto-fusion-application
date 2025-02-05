package com.nuwaish.crypto_fusion.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiResponse<T> {

    private T data;
    private String message;
    private int statusCode;

    // constructor

    public ApiResponse() {
    }

    public ApiResponse(T data, String message, int statusCode) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

    public ApiResponse(T data, int statusCode) {
        this.data = data;
        this.message = null;
        this.statusCode = statusCode;
    }

    public ApiResponse(String message, int statusCode) {
        this.data = null;
        this.message = message;
        this.statusCode = statusCode;
    }
}
