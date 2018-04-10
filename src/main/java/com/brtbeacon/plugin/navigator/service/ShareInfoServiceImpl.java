package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.ShareInfo;
import com.brtbeacon.plugin.navigator.entity.ShareInfoExample;
import com.brtbeacon.plugin.navigator.repository.ShareInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * ShareInfoServiceImpl
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/19 1618
 */
@Service
public class ShareInfoServiceImpl extends BaseServiceSupport<ShareInfo, ShareInfoExample, Long>
        implements ShareInfoService {
    private ShareInfoMapper mapper;

    @Autowired
    public void setMapper(ShareInfoMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public ShareInfoMapper getMapper() {
        return this.mapper;
    }

    @Override
    public int saveOrUpdate(ShareInfo info) {
        ShareInfo one = findOne(info.getId());
        if (one != null) {
            return update(info);
        }
        return save(info);
    }
}