package com.brtbeacon.plugin.navigator.weixin.entity;

import java.util.Calendar;

/**
 * 缓存用实体
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/7/19 10:55
 */
public class Entry {

    String value;

    long timestamp;

    int expiresIn;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public int getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    /**
     * 容错，在过期前2分钟就判为过期
     *
     * @return
     */
    public boolean isExpired() {
        long expired = timestamp + expiresIn * 1000;
        return expired - 120000 < Calendar.getInstance().getTimeInMillis();
    }
}
