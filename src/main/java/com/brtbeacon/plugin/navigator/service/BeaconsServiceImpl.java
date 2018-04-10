package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.Beacons;
import com.brtbeacon.plugin.navigator.entity.BeaconsExample;
import com.brtbeacon.plugin.navigator.repository.BeaconsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * BeaconsServiceImpl
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/29 1437
 */
@Service
public class BeaconsServiceImpl extends BaseServiceSupport<Beacons, BeaconsExample, Integer> implements BeaconsService {
    private BeaconsMapper mapper;

    @Autowired
    public void setMapper(BeaconsMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public BeaconsMapper getMapper() {
        return this.mapper;
    }
}