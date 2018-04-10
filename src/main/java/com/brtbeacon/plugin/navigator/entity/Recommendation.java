package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;

/**
 * Recommendation
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/13 1751
 */
public class Recommendation extends BaseEntity<Long> {
    /**
     * 建筑buildingID
     */
    private String buildingId;

    /**
     * 推荐名称
     */
    private String title;

    /**
     * 图标地址
     */
    private String imgUrl;

    /**
     * 排序
     */
    private Integer priority;

    /**
     * 点位信息
     */
    private String points;

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId == null ? null : buildingId.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl == null ? null : imgUrl.trim();
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points == null ? null : points.trim();
    }
}