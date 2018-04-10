package com.brtbeacon.plugin.common.http;

import java.util.HashMap;
import java.util.Map;

/**
 * 响应结果
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/19
 */
public class RespResult {

    /**
     * code 0: 正常 1:失败 -1:异常
     */
    private int code;

    private String message;

    private Object result;

    private Map<String, Object> data;

    public RespResult(Builder builder) {
        this.code = builder.code;
        this.message = builder.message;
        this.result = builder.result;
        this.data = builder.data;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public Object getResult() {
        return result;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public enum Code {

        Success(0), // 成功
        Failure(1),  // 失败
        Exception(-1); // 异常

        private final int code;

        Code(int code) {
            this.code = code;
        }

        public int code() {
            return this.code;
        }
    }

    public static class Builder {

        private int code;

        private String message;

        private Object result;

        private Map<String, Object> data;

        public Builder code(Code code) {
            this.code = code.code();
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder result(Object result) {
            this.result = result;
            return this;
        }

        public Builder data(String key, Object value) {
            if (this.data == null) {
                this.data = new HashMap<>();
            }
            this.data.put(key, value);
            return this;
        }

        public Builder data(Map<String, Object> map) {
            if (this.data == null) {
                this.data = new HashMap<>();
            }
            this.data.putAll(map);
            return this;
        }

        public RespResult build() {
            return new RespResult(this);
        }
    }
}
