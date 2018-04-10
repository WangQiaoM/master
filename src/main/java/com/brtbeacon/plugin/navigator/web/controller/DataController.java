package com.brtbeacon.plugin.navigator.web.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.brtbeacon.plugin.common.http.RespResult;
import com.brtbeacon.plugin.navigator.entity.*;
import com.brtbeacon.plugin.navigator.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

/**
 * 数据接口控制器
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/19
 */
@RestController
@RequestMapping("/data")
public class DataController {
    private static final Logger log = LoggerFactory.getLogger(DataController.class);

    private MapService mapService;

    private RecommendationService recommendationService;

    private ShareInfoService shareInfoService;

    @Resource
    private BuildingDeployService buildingDeployService;

    @Resource
    private AdImageService adImageService;

    @Autowired
    public void setMapService(MapService mapService) {
        this.mapService = mapService;
    }

    @Autowired
    public void setRecommendationService(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @Autowired
    public void setShareInfoService(ShareInfoService shareInfoService) {
        this.shareInfoService = shareInfoService;
    }


    /**
     * 检索点位信息
     *
     * @param buildingID 建筑本地ID
     * @param name 点位名称
     * @return
     */
    @RequestMapping(value = "/poi", method = RequestMethod.GET)
    public RespResult poiSearch(String buildingID,
                                @RequestParam("name") String name) {

        if (StringUtils.isEmpty(buildingID)) {
            throw new IllegalArgumentException("建筑信息不存在,请仔细核对");
        }

        String token = buildingDeployService.getBuildingToken(buildingID);

        if (StringUtils.isEmpty(token)){
            throw new IllegalArgumentException("建筑Token不存在,请仔细核对");
        }

        // name 处理
        try {
            name = URLDecoder.decode(name,"utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        RespResult.Builder builder = new RespResult.Builder();

        JSONObject response = mapService.findPoiInfoByName(buildingID, token, name);

        Boolean success = response.getBoolean("success");
        if (success != null && success) {
            JSONArray mapdatas = response.getJSONArray("mapdatas");
            if (mapdatas != null) {

                JSONArray mapdatasNew = dealWithRepeat(mapdatas);

                log.info("Data处理重复数据条数=》 {}",mapdatas.size()-mapdatasNew.size());
                builder.data("records", mapdatasNew);
            }
            Integer length = response.getInteger("records");
            if (length != null) {
                builder.data("length", length);
            }

        } else {
            builder.code(RespResult.Code.Failure).message("地图接口 [" + response.getString("err") + "]");
        }
        return builder.build();
    }

    private JSONArray dealWithRepeat(JSONArray mapdatas) {

        //创建新的数据容器
        JSONArray mapdatasNew = new JSONArray();

        if (mapdatas==null|| mapdatas.size()==0){
            return mapdatasNew;
        }

        for(int i = 0;i<mapdatas.size();i++){
            // 处理重复数据
            boolean isExist = true;
            for (int j=0;j<mapdatasNew.size();j++){
                if (mapdatasNew.getJSONObject(j).getInteger("FLOOR_NUMBER")==mapdatas.getJSONObject(i).getInteger("FLOOR_NUMBER")&&mapdatasNew.getJSONObject(j).getString("NAME").equals(mapdatas.getJSONObject(i).getString("NAME"))&&
                        Math.abs(mapdatasNew.getJSONObject(j).getInteger("LABEL_X")-mapdatas.getJSONObject(i).getInteger("LABEL_X"))<1.1&&
                        Math.abs(mapdatasNew.getJSONObject(j).getInteger("LABEL_Y")-mapdatas.getJSONObject(i).getInteger("LABEL_Y"))<1.1&&
                        mapdatasNew.getJSONObject(j).getInteger("LAYER")<mapdatas.getJSONObject(i).getInteger("LAYER")){
                    isExist = false;
                    break;
                }
            }
            if ("07550011".equals(mapdatas.getJSONObject(i).getString("BUILDING_ID"))){
                isExist = false;
            }

            if ("150014".equals(mapdatas.getJSONObject(i).getString("CATEGORY_ID"))&&!"4".equals(mapdatas.getJSONObject(i).getString("LAYER"))){
                isExist = false;
            }

            if (isExist){
                mapdatasNew.add(mapdatas.getJSONObject(i));
            }
        }
        return mapdatasNew;
    }

    /**
     * 保存推荐信息
     *
     * @param recommendation
     * @return
     */
    @RequestMapping(value = "/recommendation", method = RequestMethod.POST)
    public RespResult saveOrUpdateRecommendation(Recommendation recommendation) {
        //recommendation.setUserId(account.getId());

        int save = recommendationService.saveOrUpdateRecommendation(recommendation);

        RespResult.Builder builder = new RespResult.Builder();
        if (save < 1) {
            builder.code(RespResult.Code.Failure).message("数据未入库");
        }
        return builder.build();
    }

    /**
     * 获取推荐项
     *
     * @return
     */
    @RequestMapping(value = "/recommendation/{id}", method = RequestMethod.GET)
    public RespResult getRecommendation(@PathVariable("id") Long id) {
        RespResult.Builder builder = new RespResult.Builder();
        Recommendation recommendation = recommendationService.findOne(id);
        builder.result(recommendation);
        return builder.build();
    }

    /**
     * 删除推荐项
     *
     * @return
     */
    @RequestMapping(value = "/recommendation/{id}", method = RequestMethod.DELETE)
    public RespResult deleteRecommendation(@PathVariable("id") Long id) {
        RespResult.Builder builder = new RespResult.Builder();

        Recommendation db = recommendationService.findOne(id);

        /*if (db.getUserId().longValue() != account.getId().longValue()) {
            throw new IllegalArgumentException("数据不存在或已删除");
        }*/

        int delete = recommendationService.delete(id);

        if (delete == 0) {
            builder.code(RespResult.Code.Failure);
        }
        return builder.build();
    }

    /**
     * 获取推荐项
     *
     * @param buildingID    建筑标识
     * @return
     */
    @RequestMapping(value = "/recommendation", method = RequestMethod.GET)
    public RespResult getRecommendation(String buildingID) {
        RespResult.Builder builder = new RespResult.Builder();

        RecommendationExample example = new RecommendationExample();
        example.createCriteria().andBuildingIdEqualTo(buildingID);
        example.setOrderByClause("priority asc");

        List<Recommendation> recommendations = recommendationService.findByExample(example);
        builder.data("records", recommendations);
        return builder.build();
    }

    /**
     * 更新推荐项优先级
     *
     * @return
     */
    @RequestMapping(value = "/recommendation/priority", method = RequestMethod.PUT)
    public RespResult updateRecommendationPriority(String buildingID,
                                                   @RequestParam("priority") Long[] priorities) {
        RespResult.Builder builder = new RespResult.Builder();

        // 更新优先级
        int update = recommendationService.updateRecommendationPriority(priorities);
        if (update == 0) {
            builder.code(RespResult.Code.Failure);
        }

        RecommendationExample example = new RecommendationExample();

        example.createCriteria().andBuildingIdEqualTo(buildingID);
        example.setOrderByClause("priority asc");
        // 拉取最新的
        List<Recommendation> recommendations = recommendationService.findByExample(example);
        builder.data("records", recommendations);
        return builder.build();
    }

    /**
     * 获取分享信息
     *
     * @param id      记录ID
     * @return
     */
    @RequestMapping(value = "/share/{id}", method = RequestMethod.GET)
    public RespResult getShare(@PathVariable("id") Long id) {
        RespResult.Builder builder = new RespResult.Builder();
        ShareInfo info = shareInfoService.findOne(id);
        if (info != null ) {
            builder.result(info);
        }
        return builder.build();
    }

    /**
     * 保存分享信息
     *
     * @param info    分享信息
     * @return
     */
    @RequestMapping(value = "/share", method = RequestMethod.POST)
    public RespResult saveOrUpdateShare(ShareInfo info) {
        RespResult.Builder builder = new RespResult.Builder();
        //info.setUserId(account.getId());
        int save = shareInfoService.saveOrUpdate(info);
        if (save == 0) {
            builder.code(RespResult.Code.Failure);
        }
        return builder.build();
    }


    /**
     * 广告信息
     * @param buildingID
     * @return
     */
    @RequestMapping(value = "/adImage/select", method = RequestMethod.GET)
    public RespResult adImageSelect(String buildingID){

        if (StringUtils.isEmpty(buildingID)){
            throw new IllegalStateException("建筑BuildingID 为空");
        }

        RespResult.Builder builder = new RespResult.Builder();

        AdImageExample example = new AdImageExample();
        example.createCriteria().andBuildingIdEqualTo(buildingID);
        List<AdImage> list = adImageService.findByExample(example);

        builder.data("records", list);
        return builder.build();
    }

    /**
     * 新增或修改广告
     * @param adImage
     * @return
     */
    @RequestMapping(value = "/adImage/createOrUpdate",method = RequestMethod.POST)
    public RespResult adImageCreate(AdImage adImage){

        RespResult.Builder builder = new RespResult.Builder();

        if (StringUtils.isEmpty(adImage.getId())){
            adImageService.save(adImage);
        }else {
            adImageService.update(adImage);
        }

        return builder.build();
    }

    /**
     * 删除广告
     * @param id
     * @return
     */
    @RequestMapping(value = "/adImage/delete/{id}",method = RequestMethod.DELETE)
    public RespResult adImageDelete(@PathVariable("id") Integer id){

        if (StringUtils.isEmpty(id)){
            throw new IllegalStateException("数据id为空");
        }

        AdImage adImage = adImageService.findOne(id);
        if (StringUtils.isEmpty(adImage)){
            throw new IllegalStateException("数据不存在或已删除");
        }

        RespResult.Builder builder = new RespResult.Builder();

        int delete = adImageService.delete(id);
        if (delete==0){
            builder.code(RespResult.Code.Failure);
        }
        return builder.build();
    }


}
