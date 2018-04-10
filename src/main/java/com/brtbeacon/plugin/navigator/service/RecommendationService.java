package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseService;
import com.brtbeacon.plugin.navigator.entity.Recommendation;
import com.brtbeacon.plugin.navigator.entity.RecommendationExample;

/**
 * RecommendationService
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/19 1618
 */
public interface RecommendationService extends BaseService<Recommendation, RecommendationExample, Long> {

    int saveOrUpdateRecommendation(Recommendation recommendation);

    /**
     * 更新优先级
     *
     * @param priorities
     * @return
     */
    int updateRecommendationPriority(Long[] priorities);
}