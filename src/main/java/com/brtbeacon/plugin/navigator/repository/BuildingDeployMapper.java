package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.BuildingDeploy;
import com.brtbeacon.plugin.navigator.entity.BuildingDeployExample;

/**
 * BuildingDeployMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/21 1132
 */
@MyBatisRepository
public interface BuildingDeployMapper extends BaseExampleMapper<BuildingDeploy, BuildingDeployExample, Integer> {
}