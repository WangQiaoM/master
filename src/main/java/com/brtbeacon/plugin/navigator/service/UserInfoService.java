package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseService;
import com.brtbeacon.plugin.navigator.entity.UserInfo;
import com.brtbeacon.plugin.navigator.entity.UserInfoExample;

/**
 * UserInfoService
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/13 1752
 */
public interface UserInfoService extends BaseService<UserInfo, UserInfoExample, Integer> {
    UserInfo isExist(String username, String password);
}