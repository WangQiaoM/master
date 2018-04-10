package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.BuildingExt;
import com.brtbeacon.plugin.navigator.entity.BuildingExtExample;
import com.brtbeacon.plugin.navigator.repository.BuildingExtMapper;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * BuildingExtServiceImpl
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/21 1703
 */
//@Service
public class BuildingExtServiceImpl extends BaseServiceSupport<BuildingExt, BuildingExtExample, Integer> implements BuildingExtService {
    private BuildingExtMapper mapper;

    @Autowired
    public void setMapper(BuildingExtMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public BuildingExtMapper getMapper() {
        return this.mapper;
    }
}