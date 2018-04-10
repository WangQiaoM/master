package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.AdImage;
import com.brtbeacon.plugin.navigator.entity.AdImageExample;

/**
 * AdImageMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/14 1856
 */
@MyBatisRepository
public interface AdImageMapper extends BaseExampleMapper<AdImage, AdImageExample, Integer> {
}