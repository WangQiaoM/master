package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.UserPlugin;
import com.brtbeacon.plugin.navigator.entity.UserPluginExample;
import com.brtbeacon.plugin.navigator.repository.UserPluginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

/**
 * UserPluginServiceImpl
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/21 1703
 */
@Service
public class UserPluginServiceImpl extends BaseServiceSupport<UserPlugin, UserPluginExample, Integer>
        implements UserPluginService {
    private UserPluginMapper mapper;

    @Autowired
    public void setMapper(UserPluginMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public UserPluginMapper getMapper() {
        return this.mapper;
    }

    @Override
    public UserPlugin findAuthorization(Long userId, Integer bxId) {
        // 构建查询条件
        UserPluginExample example = new UserPluginExample();

        // 用户标识 建筑标识 插件标识
        UserPluginExample.Criteria criteria = example.createCriteria().andUserIdEqualTo(userId);
        criteria.andPlugsIdEqualTo(PLUGIN_IDENTITY_VALUE).andBuildingExtendIdEqualTo(bxId);
        // 有效 1, 无效 0
        criteria.andStatusEqualTo(1);
        // 有效时间倒序
        example.setOrderByClause("end_time desc");

        // 取一条
        List<UserPlugin> plugins = findByExample(example);
        if (plugins != null && plugins.size() > 0) {
            return plugins.get(0);
        }
        return null;
    }

    @Override
    public UserPlugin findBySignature(String sign) {
        return mapper.findBySignature(sign);
    }

    @Override
    public boolean isAvailable(Long userId, Integer bxId) {
        UserPlugin authorization = findAuthorization(userId, bxId);
        // 比较是否在有效期内
        if (authorization != null && authorization.getEndTime() != null) {
            long current = Calendar.getInstance().getTimeInMillis();
            return current < authorization.getEndTime().getTime();
        }
        return false;
    }
}