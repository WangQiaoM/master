package com.brtbeacon.plugin.navigator.weixin.service;

import com.brtbeacon.plugin.navigator.weixin.entity.WxConfig;

/**
 * WxService
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/7/19 10:53
 */
public interface WxService {

    String ACCESS_TOKEN_API = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%1$s&secret=%2$s";

    String JS_API_TICKET_API = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%1$s&type=jsapi";

    String getAccessToken(WxConfig wxConfig);

    String getJsApiTicket(WxConfig wxConfig);

    String getAuthorizationJsapiTicket(String appId);
}
