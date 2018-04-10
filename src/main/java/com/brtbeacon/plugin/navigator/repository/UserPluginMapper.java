package com.brtbeacon.plugin.navigator.repository;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.annotation.MyBatisRepository;
import com.brtbeacon.plugin.navigator.entity.UserPlugin;
import com.brtbeacon.plugin.navigator.entity.UserPluginExample;
import org.apache.ibatis.annotations.Param;

/**
 * UserPluginMapper
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/21 1747
 */
@MyBatisRepository
public interface UserPluginMapper extends BaseExampleMapper<UserPlugin, UserPluginExample, Integer> {

    /**
     * 根据签名寻找记录
     *
     * @param sign
     * @return
     */
    UserPlugin findBySignature(@Param("sign") String sign);
}