package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.ShareInfo;
import com.brtbeacon.plugin.navigator.entity.ShareInfoExample;

/**
 * ShareInfoMapper
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/21 1031
 */
@MyBatisRepository
public interface ShareInfoMapper extends BaseExampleMapper<ShareInfo, ShareInfoExample, Long> {
}