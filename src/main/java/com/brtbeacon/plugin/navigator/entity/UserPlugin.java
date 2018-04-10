package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;
import java.util.Date;

/**
 * UserPlugin
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/21 1747
 */
public class UserPlugin extends BaseEntity<Integer> {
    private static final long serialVersionUID = 1512669668396052975L;
    /**
     * dev_user_plugs.user_id
     */
    private Long userId;

    /**
     * dev_user_plugs.plugs_id
     */
    private Integer plugsId;

    /**
     * dev_user_plugs.end_time
     */
    private Date endTime;

    /**
     * 0：无效；1：有效；2：建筑创建中(可认为无效[过度状态])
     */
    private Integer status;

    /**
     * dev_user_plugs.building_extend_id
     */
    private Integer buildingExtendId;

    /**
     * dev_user_plugs.create_time
     */
    private Date createTime;

    /**
     * dev_user_plugs.signs
     */
    private String signs;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getPlugsId() {
        return plugsId;
    }

    public void setPlugsId(Integer plugsId) {
        this.plugsId = plugsId;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getBuildingExtendId() {
        return buildingExtendId;
    }

    public void setBuildingExtendId(Integer buildingExtendId) {
        this.buildingExtendId = buildingExtendId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getSigns() {
        return signs;
    }

    public void setSigns(String signs) {
        this.signs = signs == null ? null : signs.trim();
    }
}