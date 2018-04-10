package com.brtbeacon.plugin.navigator.web.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.brtbeacon.plugin.common.util.IPUtil;
import com.brtbeacon.plugin.navigator.entity.*;
import com.brtbeacon.plugin.navigator.service.AdImageService;
import com.brtbeacon.plugin.navigator.service.BuildingDeployService;
import com.brtbeacon.plugin.navigator.service.MapService;
import com.brtbeacon.plugin.navigator.service.ShareInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

/**
 * NavController
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/24
 */
@Controller
public class NavController {
    private static final Logger log = LoggerFactory.getLogger(NavController.class);
    //private UserPluginService userPluginService;
    //private BuildingExtService buildingExtService;

    //private static JSONObject BUILD = null;

    @Resource
    private BuildingExt buildingExt;

    @Resource
    private BuildingDeployService buildingDeployService;

    @Resource
    private AdImageService adImageService;

    private MapService mapService;
    private ShareInfoService shareInfoService;

    @Autowired
    public void setMapService(MapService mapService) {
        this.mapService = mapService;
    }

    @Autowired
    public void setShareInfoService(ShareInfoService shareInfoService) {
        this.shareInfoService = shareInfoService;
    }


    /**
     * 正式入口
     *
     *  model 返回数据集合
     * @return navigator视图
     */
    @RequestMapping(value = "/{sign}/nav", method = RequestMethod.GET)
    public String init(HttpServletRequest request, @PathVariable("sign")String sign , Model model){


        String token = "";
        BuildingDeploy buildingDeploy = null;

        //查询标识符关联建筑信息
        if (StringUtils.isEmpty(sign)){
            buildingDeploy = buildingDeployService.findByExample(null).get(0);
        }else {

            BuildingDeployExample example = new BuildingDeployExample();
            example.createCriteria().andSignEqualTo(sign);
            List<BuildingDeploy> list = buildingDeployService.findByExample(example);

            if (list.size()>0){
                token = list.get(0).getToken();
                buildingDeploy = list.get(0);
            }
            if (!StringUtils.hasText(token)) {
                throw new IllegalArgumentException("未取得Token令牌");
            }
        }

        //获取偏转角值
        if (buildingDeploy!=null){
            double angle = selectBuildingInfo(buildingDeploy.getBuildingId(),buildingDeploy.getToken());

            model.addAttribute("angle",angle);
        }




        if (StringUtils.isEmpty(buildingDeploy.getAppId())){
            model.addAttribute("appId","wx749ed2c85a2e541d");
        }else {
            model.addAttribute("appId",buildingDeploy.getAppId());
        }

        model.addAttribute("buildingID", buildingDeploy.getBuildingId());
        model.addAttribute("token", token);
        model.addAttribute("title", buildingDeploy.getName());


        // POI 判定
        String poiId = request.getParameter("poiId");
        String click = request.getParameter("click");

        //分享
        if (StringUtils.hasText(poiId)&&!StringUtils.hasText(click)) {

            //无poiId 情况
            if("location".equals(poiId)){
                JSONObject poiInfo = new JSONObject();
                poiInfo.put("NAME","无名地址");
                poiInfo.put("POI_ID","location");
                poiInfo.put("CATEGORY_ID","999999");
                poiInfo.put("LABEL_X",request.getParameter("LABEL_X"));
                poiInfo.put("LABEL_Y",request.getParameter("LABEL_Y"));
                poiInfo.put("FLOOR_NAME",request.getParameter("FLOOR_NAME"));
                poiInfo.put("FLOOR_ID",request.getParameter("FLOOR_ID"));
                poiInfo.put("FLOOR_NUMBER",request.getParameter("FLOOR_NUMBER"));
                model.addAttribute("poi", poiInfo);
            }else {
                setPoiInformation(poiId, token, model, buildingDeploy.getBuildingId());
            }
        }

        //商铺
        if (StringUtils.hasText(click)) {
            setMarkingInfo(poiId, token, model,buildingDeploy.getBuildingId());
        }

        // 分享信息
        ShareInfoExample shareExample = new ShareInfoExample();
        shareExample.createCriteria().andBuildingIdEqualTo(buildingDeploy.getBuildingId());
        List<ShareInfo> shareList = shareInfoService.findByExample(shareExample);
        model.addAttribute("share", shareList.size() == 0 ? new ShareInfo() : shareList.get(0));

        // 广告图片
        AdImageExample adImageExample = new AdImageExample();
        adImageExample.createCriteria().andBuildingIdEqualTo(buildingDeploy.getBuildingId());
        List<AdImage> adImageList = adImageService.findByExample(adImageExample);
        model.addAttribute("adimages", adImageList);

        model.addAttribute("time",System.currentTimeMillis());
        model.addAttribute("domainName",buildingExt.getDomainName());
        model.addAttribute("buildingName",buildingDeploy.getName());
        model.addAttribute("sign",buildingDeploy.getSign());
        return "navigator";
    }


    private double selectBuildingInfo(String buildingId, String token) {

       JSONObject buildingInfo = mapService.selectBuildingInfo(buildingId,token);

       if (buildingInfo.getJSONArray("Buildings") ==null || buildingInfo.getJSONArray("Buildings").size()==0){
           throw new IllegalArgumentException("建筑过期或失效");
       }


        return buildingInfo.getJSONArray("Buildings").getJSONObject(0).getDoubleValue("initAngle");
    }


    private void setMarkingInfo(String poiId, String token, Model model, String buildingID) {
        JSONObject poiInfo = mapService.findPoiInfo(buildingID, token, poiId);
        Boolean success = poiInfo.getBoolean("success");
        if (success != null && success) {
            JSONArray mapdatas = poiInfo.getJSONArray("mapdatas");
            if (mapdatas != null && mapdatas.size() > 0) {
                JSONObject _poi = mapdatas.getJSONObject(0);

                JSONObject poi = new JSONObject();
                String name = _poi.getString("NAME");

                if (!StringUtils.hasText(name))
                    name = "无名地址";

                poi.put("NAME", name);
                poi.put("POI_ID",poiId);
                poi.put("FLOOR_NAME",_poi.getString("FLOOR_NAME"));
                poi.put("FLOOR_ID",_poi.getString("FLOOR_ID"));
                poi.put("FLOOR_NUMBER",_poi.getIntValue("FLOOR_NUMBER"));
                poi.put("LABEL_X",_poi.getDoubleValue("LABEL_X"));
                poi.put("LABEL_Y",_poi.getDoubleValue("LABEL_Y"));

                model.addAttribute("markingInfo",poi);
            }
        }
    }


    private void setPoiInformation(String poiId, String token, Model model, String buildingID) {

        JSONObject poiInfo = mapService.findPoiInfo(buildingID, token, poiId);
        Boolean success = poiInfo.getBoolean("success");
        if (success != null && success) {
            JSONArray mapdatas = poiInfo.getJSONArray("mapdatas");
            if (mapdatas != null && mapdatas.size() > 0) {
                JSONObject _poi = mapdatas.getJSONObject(0);

                JSONObject poi = new JSONObject();
                String name = _poi.getString("NAME");

                if (!StringUtils.hasText(name))
                    name = "无名地址";

                poi.put("NAME", name);
                poi.put("POI_ID",poiId);
                poi.put("FLOOR_NAME",_poi.getString("FLOOR_NAME"));
                poi.put("FLOOR_ID",_poi.getString("FLOOR_ID"));
                poi.put("FLOOR_NUMBER",_poi.getIntValue("FLOOR_NUMBER"));
                poi.put("LABEL_X",_poi.getDoubleValue("LABEL_X"));
                poi.put("LABEL_Y",_poi.getDoubleValue("LABEL_Y"));

                model.addAttribute("poi", poi);
            }
        }
    }


    public static String[] getIPXY(String ip) {

        String ak = "F454f8a5efe5e577997931cc01de3974";
        if (null == ip) {
            ip = "";
        }

        try {

            URL url = new URL("http://api.map.baidu.com/location/ip?ak=" + ak
                    + "&ip=" + ip + "&coor=bd09ll");
            InputStream inputStream = url.openStream();
            InputStreamReader inputReader = new InputStreamReader(inputStream);
            BufferedReader reader = new BufferedReader(inputReader);
            StringBuffer sb = new StringBuffer();
            String str;
            do {
                str = reader.readLine();
                sb.append(str);
            } while (null != str);


            str = sb.toString();
            if (null == str || str.isEmpty()) {
                return null;
            }


            // 获取坐标位子
            int index = str.indexOf("point");
            int end = str.indexOf("}}", index);


            if (index == -1 || end == -1) {
                return null;
            }


            str = str.substring(index - 1, end + 1);
            if (null == str || str.isEmpty()) {
                return null;
            }


            String[] ss = str.split(":");
            if (ss.length != 4) {
                return null;
            }


            String x = ss[2].split(",")[0];
            String y = ss[3];


            x = x.substring(x.indexOf("\"") + 1, x.indexOf("\"", 1));
            y = y.substring(y.indexOf("\"") + 1, y.indexOf("\"", 1));


            return new String[] { x, y };


        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


        return null;
    }


}
