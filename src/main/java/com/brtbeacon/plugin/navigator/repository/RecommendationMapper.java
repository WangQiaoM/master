package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.Recommendation;
import com.brtbeacon.plugin.navigator.entity.RecommendationExample;

/**
 * RecommendationMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/13 1751
 */
@MyBatisRepository
public interface RecommendationMapper extends BaseExampleMapper<Recommendation, RecommendationExample, Long> {
}