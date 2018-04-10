package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;

/**
 * AdImage
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/14 1856
 */
public class AdImage extends BaseEntity<Integer> {
    /**
     * wh_ad_image.img_url
     */
    private String imgUrl;

    /**
     * 序列
     */
    private String sequence;

    /**
     * 建筑
     */
    private String buildingId;

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl == null ? null : imgUrl.trim();
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence == null ? null : sequence.trim();
    }

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId == null ? null : buildingId.trim();
    }
}