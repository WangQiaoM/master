package com.brtbeacon.plugin.navigator.weixin.entity;

/**
 * 微信配置实体
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/7/19 10:51
 */
public class WxConfig {

    private String appId;

    private String appSecret;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }
}
