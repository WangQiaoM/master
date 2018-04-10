package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.NavHash;
import com.brtbeacon.plugin.navigator.entity.NavHashExample;
import com.brtbeacon.plugin.navigator.repository.NavHashMapper;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * NavHashServiceImpl
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/15 1140
 */
//@Service
public class NavHashServiceImpl extends BaseServiceSupport<NavHash, NavHashExample, String> implements NavHashService {
    private NavHashMapper mapper;

    @Autowired
    public void setMapper(NavHashMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public NavHashMapper getMapper() {
        return this.mapper;
    }
}