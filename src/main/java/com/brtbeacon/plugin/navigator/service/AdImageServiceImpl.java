package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.AdImage;
import com.brtbeacon.plugin.navigator.entity.AdImageExample;
import com.brtbeacon.plugin.navigator.repository.AdImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * AdImageServiceImpl
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/14 1856
 */
@Service
public class AdImageServiceImpl extends BaseServiceSupport<AdImage, AdImageExample, Integer> implements AdImageService {
    private AdImageMapper mapper;

    @Autowired
    public void setMapper(AdImageMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public AdImageMapper getMapper() {
        return this.mapper;
    }
}