package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.Beacons;
import com.brtbeacon.plugin.navigator.entity.BeaconsExample;

/**
 * BeaconsMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/29 1437
 */
@MyBatisRepository
public interface BeaconsMapper extends BaseExampleMapper<Beacons, BeaconsExample, Integer> {
}