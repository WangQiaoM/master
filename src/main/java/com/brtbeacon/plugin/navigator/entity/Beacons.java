package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;

/**
 * Beacons
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/29 1437
 */
public class Beacons extends BaseEntity<Integer> {
    /**
     * beacons.beacons
     */
    private String beacons;

    /**
     * beacons.total
     */
    private Integer total;

    public String getBeacons() {
        return beacons;
    }

    public void setBeacons(String beacons) {
        this.beacons = beacons == null ? null : beacons.trim();
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}