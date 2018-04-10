package com.brtbeacon.plugin.navigator.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.brtbeacon.plugin.common.http.HttpRequester;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * MapServiceImpl
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/19
 */
@Service
public class MapServiceImpl implements MapService {

    @Override
    public JSONObject getUserBuilding(String appKey, String buildingId) {
        Map<String, String> params = new HashMap<>();
        params.put("appKey", appKey);
        params.put("buildingId", buildingId);

        Response response = HttpRequester.newInstance().json(MAP_SERVICE_GET_USER_BUILDING, params);

        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("接口 [MAP_SERVICE_GET_USER_BUILDING] 返回出错");
        }

        return handleResponseAndReturnJsonObject(response);
    }

    @Override
    public JSONObject findPoiInfoByName(String buildingID, String token, String name) {
        Map<String, Object> params = new HashMap<>();
        params.put("token", token);
        params.put("buildingID", buildingID);
        params.put("name", name);

        Response response = HttpRequester.newInstance().get(MAP_SERVICE_QUERY_POI_BY_NAME, params);

        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("接口 [MAP_SERVICE_QUERY_POI_BY_NAME] 返回出错");
        }
        return handleResponseAndReturnJsonObject(response);
    }

    @Override
    public JSONObject findPoiInfo(String buildingID, String token, String poiId) {
        String service = String.format(MAP_SERVICE_GET_POI, token, buildingID, poiId);
        Response response = HttpRequester.newInstance().get(service);

        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("接口 [MAP_SERVICE_QUERY_POI_BY_NAME] 返回出错");
        }
        return handleResponseAndReturnJsonObject(response);
    }

    @Override
    public String getBuildingToken(String appKey, String buildingId) {
        JSONObject response = getUserBuilding(appKey, buildingId);
        Boolean success = response.getBoolean("success");
        if (success != null && success) {
            JSONArray userBuildings = response.getJSONArray("userBuildings");
            if (userBuildings != null && userBuildings.size() > 0) {
                JSONObject building = userBuildings.getJSONObject(0);
                return building.getString("token");
            }
            throw new IllegalArgumentException("建筑地图信息不存在或已删除");
        }
        throw new IllegalArgumentException(response.getString("description"));
    }

    @Override
    public JSONObject selectPoiInfo(String buildingID, String token, String poiId) {
        String service = String.format(MAP_SERVICE_GET_POI, token, buildingID, poiId);
        Response response = HttpRequester.newInstance().get(service);

        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("接口 [MAP_SERVICE_QUERY_POI_BY_NAME] 返回出错");
        }
        return handleResponseAndReturnJsonObject(response);
    }

    @Override
    public JSONObject selectPoiInfoByPoidlist(List<String> parameterList, String buildingID, String token) {
        String service = String.format(MAP_SERVICE_GET_POILIST,token, buildingID);
        Map<String,Object> parameter = new HashMap<>();
        parameter.put("poiIds",parameterList);
        Response response = HttpRequester.newInstance().json(service, net.sf.json.JSONObject.fromObject(parameter));
        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("接口 [MAP_SERVICE_QUERY_POI_BY_NAME] 返回出错");
        }
        return handleResponseAndReturnJsonObject(response);
    }

    // 检索地图信息
    @Override
    public String selectMapinfoByName(Map<String, Object> params) {

        Response response = HttpRequester.newInstance().get(WEB_SDK_MAP_BRTBEACON_COM,params);
        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("接口 [MAP_SERVICE_QUERY_POI_BY_NAME] 返回出错");
        }
        return handleResponseAndReturnJsonObjectNew(response);
    }

    //获取建筑信息
    @Override
    public JSONObject selectBuildingInfo(String buildingId, String token) {
        Response response = HttpRequester.newInstance().get(String.format(BUILDING_INFO,buildingId,token));
        if (!response.isSuccessful()) {
            throw new IllegalArgumentException("接口 [MAP_SERVICE_QUERY_POI_BY_NAME] 返回出错");
        }
        return handleResponseAndReturnJsonObject(response);
    }


    private String handleResponseAndReturnJsonObjectNew(Response response) {
        try {
            return response.body().string();
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        } finally {
            response.close();
        }
    }


    private JSONObject handleResponseAndReturnJsonObject(Response response) {
        try {
            String string = response.body().string();
            return JSON.parseObject(string);
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        } finally {
            response.close();
        }
    }
}
