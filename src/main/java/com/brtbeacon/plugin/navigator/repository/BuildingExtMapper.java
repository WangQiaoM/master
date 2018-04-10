package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.BuildingExt;
import com.brtbeacon.plugin.navigator.entity.BuildingExtExample;

/**
 * BuildingExtMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/21 1703
 */
@MyBatisRepository
public interface BuildingExtMapper extends BaseExampleMapper<BuildingExt, BuildingExtExample, Integer> {
}