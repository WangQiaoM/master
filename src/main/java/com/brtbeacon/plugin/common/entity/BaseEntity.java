package com.brtbeacon.plugin.common.entity;

import java.io.Serializable;

/**
 * BaseEntity
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/3/30
 */
public abstract class BaseEntity<ID extends Serializable> implements Serializable {

    /**
     * 主键
     */
    protected ID id;

    /**
     * 创建时间戳
     */
    protected Long createdTime;

    /**
     * 更新时间戳
     */
    protected Long updatedTime;

    public ID getId() {
        return id;
    }

    public void setId(ID id) {
        this.id = id;
    }

    public Long getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Long createdTime) {
        this.createdTime = createdTime;
    }

    public Long getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Long updatedTime) {
        this.updatedTime = updatedTime;
    }
}
