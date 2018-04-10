package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseService;
import com.brtbeacon.plugin.navigator.entity.BuildingDeploy;
import com.brtbeacon.plugin.navigator.entity.BuildingDeployExample;

/**
 * BuildingDeployService
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/14 1211
 */
public interface BuildingDeployService extends BaseService<BuildingDeploy, BuildingDeployExample, Integer> {
    String getBuildingToken(String buildingID);
}