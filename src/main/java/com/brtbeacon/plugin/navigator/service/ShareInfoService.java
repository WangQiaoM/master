package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseService;
import com.brtbeacon.plugin.navigator.entity.ShareInfo;
import com.brtbeacon.plugin.navigator.entity.ShareInfoExample;

/**
 * ShareInfoService
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/19 1618
 */
public interface ShareInfoService extends BaseService<ShareInfo, ShareInfoExample, Long> {

    int saveOrUpdate(ShareInfo info);

}