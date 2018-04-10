package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.Recommendation;
import com.brtbeacon.plugin.navigator.entity.RecommendationExample;
import com.brtbeacon.plugin.navigator.repository.RecommendationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * RecommendationServiceImpl
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/19 1618
 */
@Service
public class RecommendationServiceImpl extends BaseServiceSupport<Recommendation, RecommendationExample, Long>
        implements RecommendationService {
    private RecommendationMapper mapper;

    @Autowired
    public void setMapper(RecommendationMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public RecommendationMapper getMapper() {
        return this.mapper;
    }

    @Transactional
    @Override
    public int saveOrUpdateRecommendation(Recommendation recommendation) {
        if (recommendation.getId() == null) {
            // 验证最多23条记录
            final int allowSize = 23;
            if (countByRecommendation(recommendation) < allowSize) {
                return save(recommendation);
            }
            throw new IllegalArgumentException(String.format("只允许添加 %d 条推荐项", allowSize));
        }
        return update(recommendation);
    }

    @Transactional
    @Override
    public int updateRecommendationPriority(Long[] priorities) {
        int ret = 0;
        Recommendation recommendation;
        // 遍历重新更新优先级字段
        for (int i = 0; i < priorities.length; i++) {
            recommendation = new Recommendation();
            recommendation.setId(priorities[i]);
            recommendation.setPriority(i + 1);
            ret += update(recommendation);
        }
        return ret;
    }

    private long countByRecommendation(Recommendation recommendation) {
        RecommendationExample example = new RecommendationExample();
        example.createCriteria().andBuildingIdEqualTo(recommendation.getBuildingId());
        return countByExample(example);
    }
}