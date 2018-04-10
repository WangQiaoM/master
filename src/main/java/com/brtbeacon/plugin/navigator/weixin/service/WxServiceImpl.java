package com.brtbeacon.plugin.navigator.weixin.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.brtbeacon.plugin.common.http.HttpRequester;
import com.brtbeacon.plugin.common.util.HttpClientUtil;
import com.brtbeacon.plugin.navigator.weixin.entity.Entry;
import com.brtbeacon.plugin.navigator.weixin.entity.WxConfig;
import okhttp3.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * WxServiceImpl
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/7/19 10:54
 */
@Service
public class WxServiceImpl implements WxService {
    private static final Logger log = LoggerFactory.getLogger(WxServiceImpl.class);

    private Map<String, Entry> accessTokenMap = new ConcurrentHashMap<>();
    private Map<String, Entry> jsApiTicketMap = new ConcurrentHashMap<>();

    @Override
    public String getAccessToken(WxConfig wxConfig) {
        Entry entry = accessTokenMap.get(wxConfig.getAppId());

        // 过期判定
        if (entry == null || entry.isExpired()) {
            entry = applyAccessToken(wxConfig.getAppId(), wxConfig.getAppSecret());
        }
        return entry.getValue();
    }

    @Override
    public String getJsApiTicket(WxConfig wxConfig) {
        Entry entry = jsApiTicketMap.get(wxConfig.getAppId());

        // 过期判定
        if (entry == null || entry.isExpired()) {
            entry = applyJsApiTicket(wxConfig.getAppId(), getAccessToken(wxConfig));
        }
        return entry.getValue();
    }

    /**
     * 通过授权过来
     * @param appId
     * @return
     */
    @Override
    public String getAuthorizationJsapiTicket(String appId) {
        Map<String,Object> paraMap = new HashMap<>();
        paraMap.put("appid",appId);
        paraMap.put("isFlush",0);
        JSONObject result = null;
        try {
            result = JSONObject.parseObject(HttpClientUtil.sendGetToString("http://wx.oauth.heymking.com/views/weixin/token/interfaces/getJsApiTiket",paraMap));
        } catch (Exception e) {
            throw new IllegalArgumentException("获取JsapiTicket失败，接口访问失败");
        }
        return result.getString("data");
    }

    /**
     * 申请访问令牌
     *
     * @param appId
     * @param appSecret
     * @return
     */
    private synchronized Entry applyAccessToken(String appId, String appSecret) {

        String service = String.format(ACCESS_TOKEN_API, appId, appSecret);
        Response response = HttpRequester.newInstance().get(service);

        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("获取访问令牌失败，微信接口返回错误");
        }

        try {
            String text = response.body().string();
            JSONObject json = JSON.parseObject(text);
            String access_token = json.getString("access_token");

            if (StringUtils.hasText(access_token)) {
                Entry entry = buildCacheEntry(json, access_token);
                accessTokenMap.put(appId, entry);
                return entry;
            } else {
                throw new IllegalArgumentException("获取访问令牌失败，" + json.getString("errmsg"));
            }
        } catch (IOException e) {
            throw new IllegalArgumentException("获取访问令牌失败，无法解析结果");
        } finally {
            response.close();
        }
    }



    /**
     * 申请JS-SDK调用凭证
     *
     * @param appId
     * @param accessToken
     * @return
     */
    private synchronized Entry applyJsApiTicket(String appId, String accessToken) {
        String service = String.format(JS_API_TICKET_API, accessToken);
        Response response = HttpRequester.newInstance().get(service);

        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("获取JS-SDK调用凭证失败，微信接口返回错误");
        }

        try {
            String text = response.body().string();
            JSONObject json = JSON.parseObject(text);
            String ticket = json.getString("ticket");

            if (StringUtils.hasText(ticket)) {
                Entry entry = buildCacheEntry(json, ticket);
                jsApiTicketMap.put(appId, entry);
                return entry;
            } else {
                throw new IllegalArgumentException("获取JS-SDK调用凭证失败，" + json.getString("errmsg"));
            }
        } catch (IOException e) {
            throw new IllegalArgumentException("获取JS-SDK调用凭证失败，无法解析结果");
        } finally {
            response.close();
        }
    }

    /**
     * 构建缓存实体
     *
     * @param json
     * @param value
     * @return
     */
    private Entry buildCacheEntry(JSONObject json, String value) {
        Entry entry = new Entry();
        entry.setValue(value);
        entry.setExpiresIn(json.getIntValue("expires_in"));
        entry.setTimestamp(Calendar.getInstance().getTimeInMillis());
        return entry;
    }




}
