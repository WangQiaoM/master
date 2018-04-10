package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.UserInfo;
import com.brtbeacon.plugin.navigator.entity.UserInfoExample;

/**
 * UserInfoMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/13 1752
 */
@MyBatisRepository
public interface UserInfoMapper extends BaseExampleMapper<UserInfo, UserInfoExample, Integer> {
}