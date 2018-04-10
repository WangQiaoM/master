package com.brtbeacon.plugin.navigator.web.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.brtbeacon.plugin.common.http.RespResult;
import com.brtbeacon.plugin.common.util.JsSdkUtils;
import com.brtbeacon.plugin.common.util.HttpRequestUtil;
import com.brtbeacon.plugin.navigator.entity.BuildingExt;
import com.brtbeacon.plugin.navigator.entity.Recommendation;
import com.brtbeacon.plugin.navigator.entity.RecommendationExample;
import com.brtbeacon.plugin.navigator.service.MapService;
import com.brtbeacon.plugin.navigator.service.RecommendationService;
import com.brtbeacon.plugin.navigator.weixin.entity.WxConfig;
import com.brtbeacon.plugin.navigator.weixin.service.WxService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * ApiController
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/24
 */
@RestController
@RequestMapping("/api/v1")
public class ApiController {
    private static final Logger log = LoggerFactory.getLogger(ApiController.class);
    final String WEB_SDK_MAP_BRTBEACON_COM ="https://web.sdk.map.brtbeacon.com/web/mapinfo/getByName";

    private RecommendationService recommendationService;
    private WxService wxService;

    @Resource
    private WxConfig wxConfig;

    @Resource
    private BuildingExt buildingExt;

    @Resource
    private MapService mapService;

    @Autowired
    public void setRecommendationService(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }
    @Autowired
    public void setWxService(WxService wxService) {
        this.wxService = wxService;
    }

    /**
     * 获取建筑推荐项目
     *
     * @param buildingID 建筑本地标识
     * @return
     */
    @RequestMapping(value = "/recommendation/{buildingID}", method = RequestMethod.GET)
    public RespResult recommendation(@PathVariable("buildingID")String buildingID) {
        RespResult.Builder builder = new RespResult.Builder();

        RecommendationExample example = new RecommendationExample();
        example.createCriteria().andBuildingIdEqualTo(buildingID);
        example.setOrderByClause("priority asc");

        List<Recommendation> recommendations = recommendationService.findByExample(example);
        builder.data("records", recommendations);

        System.out.println(JSONObject.toJSONString(builder));
        return builder.build();
    }

    /**
     * JS-SDK 签名
     *
     * @param url
     * @return
     */
    @RequestMapping(value = "/jsapi", method = RequestMethod.GET)
    public RespResult jsApiTicket(@RequestParam("url") String url,String appId) {

        Map<String, Object> signature = null;
        try {
            // 从微信端
            //String jsApiTicket = wxService.getJsApiTicket(wxConfig);
            // 从授权
            String jsApiTicket = wxService.getAuthorizationJsapiTicket(appId);
            log.info("JS-SDK 当前路径:{}",url);
            signature = JsSdkUtils.signature(url, appId, jsApiTicket);
            log.info("JS-SDK signature:{}",signature);
        } catch (Exception e) {
            signature = new HashMap<>();
            return new RespResult.Builder().data(signature).build();
        }
        return new RespResult.Builder().data(signature).build();
    }


    /**
     * 搜索
     * @param request
     * @return
     */
    @RequestMapping(value = "/searchforMapDatas", method = RequestMethod.GET)
    public String getSpaceNo (HttpServletRequest request){
        long startTime = System.currentTimeMillis();
        Map<String,Object> map = HttpRequestUtil.getParameterMap(request);

        //校验参数是否有效
        if (!checkParameter(map.get("name").toString())){
            return null;
        }

        //请求地图POI信息
        String result =  mapService.selectMapinfoByName(map);
        if (StringUtils.isEmpty(result)){
            result ="$variable.$ajaxQueryCallback[\"key-2\"]({\"records\":0,\"success\":true,\"mapdatas\":[]})";
        }
        System.out.println(result.substring(0,result.indexOf("(")));
        JSONObject mapJsonObject = JSONObject.parseObject(result.substring(result.indexOf("(")+1,result.lastIndexOf(")")));


        //处理地图设施数据(重复、添加属性)
        JSONArray mapDatas = dealWithRepeatDatas(mapJsonObject.getJSONArray("mapdatas"));


        mapJsonObject.put("mapdatas",mapDatas);
        mapJsonObject.put("records",mapDatas.size());


        log.info("消耗总时间==》 {}",System.currentTimeMillis()-startTime);
        return result.substring(0,result.indexOf("("))+"("+mapJsonObject.toString()+")";
    }



    /**
     * 处理重复数据
     * @param mapdatas
     * @return
     */
    private JSONArray dealWithRepeatDatas(JSONArray mapdatas) {

        JSONArray mapdatasNew = new JSONArray();
        if (mapdatas!=null&&mapdatas.size()>0)
        {
            for(int i = 0;i<mapdatas.size();i++)
            {

                // 处理重复数据
                boolean isExist = true;
                for (int j=0;j<mapdatasNew.size();j++)
                {
                    if (mapdatasNew.getJSONObject(j).getIntValue("FLOOR_NUMBER")==mapdatas.getJSONObject(i).getIntValue("FLOOR_NUMBER")&&mapdatasNew.getJSONObject(j).getString("NAME").equals(mapdatas.getJSONObject(i).getString("NAME"))&&
                            Math.abs(mapdatasNew.getJSONObject(j).getInteger("LABEL_X")-mapdatas.getJSONObject(i).getInteger("LABEL_X"))<1.1&&
                            Math.abs(mapdatasNew.getJSONObject(j).getInteger("LABEL_Y")-mapdatas.getJSONObject(i).getInteger("LABEL_Y"))<1.1&&
                            mapdatasNew.getJSONObject(j).getInteger("LAYER")<mapdatas.getJSONObject(i).getInteger("LAYER")){
                        isExist = false;
                        break;
                    }
                }

                // 排除扶梯LAYER不为4的数据
                if ("150014".equals(mapdatas.getJSONObject(i).getString("CATEGORY_ID"))&&!"4".equals(mapdatas.getJSONObject(i).getString("LAYER"))){
                    isExist = false;
                }

                if (isExist){
                    mapdatasNew.add(mapdatas.getJSONObject(i));
                }

            }
        }

        log.info("API处理重复数据条数=》 {}",mapdatas.size()-mapdatasNew.size());
        return mapdatasNew;

    }


    /**
     * 校验参数
     * @param name
     * @return
     */
    private boolean checkParameter(String name) {
        String regEx="[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】'；：”“’。，、？]";
        Pattern pattern = Pattern.compile(regEx);
        try
        {
            Matcher matcher = pattern.matcher(name);
            String value = matcher.replaceAll("").trim();
            if (!StringUtils.hasText(value)){
                return false;
            }
        } catch (Exception e)
        {
            return false;
        }

        return true;
    }

}
