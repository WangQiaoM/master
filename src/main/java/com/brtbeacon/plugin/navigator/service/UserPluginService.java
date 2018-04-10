package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseService;
import com.brtbeacon.plugin.navigator.entity.UserPlugin;
import com.brtbeacon.plugin.navigator.entity.UserPluginExample;

/**
 * UserPluginService
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/21 1703
 */
public interface UserPluginService extends BaseService<UserPlugin, UserPluginExample, Integer> {

    /**
     * 插件的ID标识
     */
    int PLUGIN_IDENTITY_VALUE = 1;

    /**
     * 查找授权信息
     *
     * @param userId 用户标识
     * @param bxId   建筑标识
     * @return
     */
    UserPlugin findAuthorization(Long userId, Integer bxId);

    /**
     * 根据签名查找建筑
     *
     * @param sign
     * @return
     */
    UserPlugin findBySignature(String sign);

    /**
     * 是否可用
     *
     * @param userId
     * @param bxId
     * @return
     */
    boolean isAvailable(Long userId, Integer bxId);
}