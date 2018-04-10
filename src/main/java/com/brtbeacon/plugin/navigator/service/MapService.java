package com.brtbeacon.plugin.navigator.service;

import com.alibaba.fastjson.JSONObject;
import net.sf.json.JSONArray;

import java.util.List;

import java.util.List;
import java.util.Map;

/**
 * MapService
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/19
 */
public interface MapService {

    /**
     * 建筑信息接口
     */
    String MAP_SERVICE_GET_USER_BUILDING = "http://web.sdk.map.brtbeacon.com/user/base/userBuilding/get";

    /**
     * 点位信息接口
     */
    String MAP_SERVICE_QUERY_POI_BY_NAME = "http://service.map.brtbeacon.com/user/mapdata/getMapDataByName";

    /**
     * 具体点位信息
     */
    String MAP_SERVICE_GET_POI = "http://service.map.brtbeacon.com/user/mapdata/getMapDataByPoiId?token=%1$s&buildingID=%2$s&poiId=%3$s";

    String MAP_SERVICE_GET_POILIST = "http://service.map.brtbeacon.com/user/mapdata/buthByPoiIds?token=%s&buildingID=%s";
    //测试外网撸路径 TODO   内网地址 10.172.155.172  外网 web.sdk.map.brtbeacon.com
    String WEB_SDK_MAP_BRTBEACON_COM = "http://web.sdk.map.brtbeacon.com/web/mapinfo/getByName";

    String YM_SHOP_INFO = "http://116.62.124.118:9898/mall/v1/suggester";

    /**
     * 获取建筑信息
     */
    String BUILDING_INFO = "https://web.sdk.map.brtbeacon.com/web/mapinfo/getBuilding?buildingID=%s&token=%s";

    /**
     * 获取用户建筑信息
     *
     * @param appKey
     * @param buildingId
     * @return
     */
    JSONObject getUserBuilding(String appKey, String buildingId);

    /**
     * 获取用户点位信息
     *
     * @param buildingID
     * @param token
     * @param name
     * @return
     */
    JSONObject findPoiInfoByName(String buildingID, String token, String name);

    /**
     * 获取点位信息
     *
     * @param buildingID
     * @param token
     * @param poiId
     * @return
     */
    JSONObject findPoiInfo(String buildingID, String token, String poiId);

    /**
     * 获取建筑token
     *
     * @param appKey
     * @param buildingId
     * @return
     */
    String getBuildingToken(String appKey, String buildingId);

    JSONObject selectPoiInfo(String buildingid, String token, String poid);

    JSONObject selectPoiInfoByPoidlist(List<String> parameterList, String buildingid, String token);

    /**
     * 检索地图信息
     * @param map
     * @return
     */
    String selectMapinfoByName(Map<String, Object> map);

    JSONObject selectBuildingInfo(String buildingId, String token);
}
