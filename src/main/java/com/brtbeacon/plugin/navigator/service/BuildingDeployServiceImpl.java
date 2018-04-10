package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.BuildingDeploy;
import com.brtbeacon.plugin.navigator.entity.BuildingDeployExample;
import com.brtbeacon.plugin.navigator.repository.BuildingDeployMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * BuildingDeployServiceImpl
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/14 1211
 */
@Service
public class BuildingDeployServiceImpl extends BaseServiceSupport<BuildingDeploy, BuildingDeployExample, Integer> implements BuildingDeployService {
    private BuildingDeployMapper mapper;

    @Autowired
    public void setMapper(BuildingDeployMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public BuildingDeployMapper getMapper() {
        return this.mapper;
    }

    @Override
    public String getBuildingToken(String buildingID) {
        BuildingDeployExample example = new BuildingDeployExample();
        example.createCriteria().andBuildingIdEqualTo(buildingID);
        List<BuildingDeploy> list = mapper.findByExample(example);
        if (list.size()>0){
            return list.get(0).getToken();
        }
        return null;
    }
}