package com.brtbeacon.plugin.common.http;

import com.alibaba.fastjson.JSON;
import okhttp3.*;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

/**
 * HttpRequester
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/15.
 */
public class HttpRequester {

    private static MediaType JSON_TYPE = MediaType.parse("application/json; charset=utf-8");

    private Request.Builder requestBuilder;

    private HttpRequester() {
        requestBuilder = new Request.Builder();
    }

    public static HttpRequester newInstance() {
        return new HttpRequester();
    }

    /**
     * 添加请求头
     *
     * @param name  名称
     * @param value 值
     * @return
     */
    public HttpRequester addHeader(String name, String value) {
        requestBuilder.addHeader(name, value);
        return this;
    }

    public Response get(String url) {
        return get(url, null);
    }

    public Response get(String url, Map<String, Object> params) {
        if (params != null && !params.isEmpty()) {
            StringBuilder builder = new StringBuilder(url);
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                if (builder.indexOf("?") < 0) {
                    builder.append("?");
                } else {
                    builder.append("&");
                }
                builder.append(entry.getKey()).append("=").append(String.valueOf(entry.getValue()));
            }
            url = builder.toString();
        }
        Request request = requestBuilder.url(url).get().build();
        requestBuilder = new Request.Builder();
        return execute(request);
    }

    /**
     * POST 请求
     *
     * @param url 地址
     * @return
     */
    public Response post(String url) {
        return post(url, null);
    }

    /**
     * POST 提交表单
     *
     * @param url    地址
     * @param params 参数
     * @return
     */
    public Response post(String url, Map<String, Object> params) {
        requestBuilder.url(url);
        FormBody.Builder builder = new FormBody.Builder();
        if (params != null && !params.isEmpty()) {
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                builder.add(entry.getKey(), String.valueOf(entry.getValue()));
            }

        } else {
            builder.add("_", String.valueOf(new Date().getTime()));
        }
        requestBuilder.post(builder.build());
        Request request = requestBuilder.build();
        requestBuilder = new Request.Builder();
        return execute(request);
    }

    /**
     * JSON 请求
     *
     * @param url 地址
     * @param e   对象
     * @param <E>
     * @return
     */
    public <E> Response json(String url, E e) {
        return json(url, JSON.toJSONString(e));
    }

    /**
     * JSON 请求
     *
     * @param url  地址
     * @param body 请求体
     * @return
     */
    public Response json(String url, String body) {
        requestBuilder.url(url).post(RequestBody.create(JSON_TYPE, body));
        Request request = requestBuilder.build();
        // 重置
        requestBuilder = new Request.Builder();
        return execute(request);
    }

    /**
     * 具体执行
     *
     * @param request
     * @return
     */
    private Response execute(Request request) {
        OkHttpClient client = new OkHttpClient.Builder().build();
        try {
            return client.newCall(request).execute();
        } catch (IOException e) {
            throw new IllegalArgumentException("Execute request failed: " + e.getMessage(), e);
        }
    }
}
