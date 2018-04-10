package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;

/**
 * NavHash
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/15 1140
 */
public class NavHash extends BaseEntity<String> {
    /**
     * 公众号标识
     */
    private String appId;

    /**
     * 建筑标识
     */
    private String buildingId;

    /**
     * 密钥
     */
    private String appKey;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId == null ? null : appId.trim();
    }

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId == null ? null : buildingId.trim();
    }

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey == null ? null : appKey.trim();
    }
}