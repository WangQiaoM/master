package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;

/**
 * BuildingDeploy
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/21 1132
 */
public class BuildingDeploy extends BaseEntity<Integer> {
    /**
     * nine_state_building_deploy.building_id
     */
    private String buildingId;

    /**
     * nine_state_building_deploy.token
     */
    private String token;

    /**
     * nine_state_building_deploy.appkey
     */
    private String appkey;

    /**
     * nine_state_building_deploy.name
     */
    private String name;

    /**
     * nine_state_building_deploy.app_id
     */
    private String appId;

    /**
     * 签名
     */
    private String sign;

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId == null ? null : buildingId.trim();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token == null ? null : token.trim();
    }

    public String getAppkey() {
        return appkey;
    }

    public void setAppkey(String appkey) {
        this.appkey = appkey == null ? null : appkey.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId == null ? null : appId.trim();
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign == null ? null : sign.trim();
    }
}