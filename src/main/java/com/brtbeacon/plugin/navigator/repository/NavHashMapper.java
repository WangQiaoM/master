package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.NavHash;
import com.brtbeacon.plugin.navigator.entity.NavHashExample;

/**
 * NavHashMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/15 1140
 */
@MyBatisRepository
public interface NavHashMapper extends BaseExampleMapper<NavHash, NavHashExample, String> {
}