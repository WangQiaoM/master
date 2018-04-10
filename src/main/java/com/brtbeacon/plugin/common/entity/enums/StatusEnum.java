package com.brtbeacon.plugin.common.entity.enums;

/**
 * StatusEnum
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/3/30
 */
public enum StatusEnum implements Description {

    None("未知"), Enabled("可用"), Disabled("不可用"), Deleted("删除");

    private final String description;

    StatusEnum(String description) {
        this.description = description;
    }

    @Override
    public String getDescription() {
        return description;
    }
}
