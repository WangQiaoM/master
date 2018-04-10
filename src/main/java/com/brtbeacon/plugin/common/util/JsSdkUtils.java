package com.brtbeacon.plugin.common.util;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * JsSdk 辅助工具类
 *
 * @author Archx[archx@foxmail.com]
 * @date 2016/6/7 0007
 */
public abstract class JsSdkUtils {

    /**
     * 签名
     *
     * @param url      请求的全地址
     * @param appId    公众号标识
     * @param jsTicket 访问令牌
     * @return
     */
    public static Map<String, Object> signature(String url, String appId, String jsTicket) {
        // 生成签名
        Map<String, Object> map = new HashMap<>();
        long timestamp = System.currentTimeMillis() / 1000;
        String nonceStr = UUID.randomUUID().toString();

        map.put("appId", appId);
        map.put("timestamp", timestamp);
        map.put("nonceStr", nonceStr);

        StringBuilder buff = new StringBuilder();

        buff.setLength(0);
        buff.append("jsapi_ticket=").append(jsTicket).append("&noncestr=").append(nonceStr).append("&timestamp=")
                .append(timestamp);
        buff.append("&url=").append(url);

        String signature = DigestUtils.sha1(buff.toString()).toLowerCase();
        map.put("signature", signature);
        return map;
    }
}
