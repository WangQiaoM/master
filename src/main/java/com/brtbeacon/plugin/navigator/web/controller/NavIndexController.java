package com.brtbeacon.plugin.navigator.web.controller;

import com.brtbeacon.persistent.mybatis.entity.PageBounds;
import com.brtbeacon.plugin.common.http.RespResult;
import com.brtbeacon.plugin.navigator.entity.Beacons;
import com.brtbeacon.plugin.navigator.entity.BeaconsExample;
import com.brtbeacon.plugin.navigator.service.BeaconsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 临时入口
 * Created by HuangPeng on 2017-09-15 10:20
 **/
@Controller
@RequestMapping("/scan_log")
public class NavIndexController {


    @Resource
    private BeaconsService beaconsService;

    /**
     * 正式入口
     *
     *  model 返回数据集合
     * @return navigator视图
     */
    @RequestMapping(method = RequestMethod.GET)
    public String index(String appId, Model model) {

        model.addAttribute("appId",appId);
        return "scan_log";
    }


    @RequestMapping(value = "/beacons",method = RequestMethod.GET)
    public String beacons() {
        return "init";
    }

    @RequestMapping(value = "/saveBeacons", method = RequestMethod.POST)
    public void saveBeacons(Beacons beacons){
        beaconsService.save(beacons);
    }

    @ResponseBody
    @RequestMapping(value = "/selectBeacons",method = RequestMethod.GET)
    public RespResult selectBeacons(Integer offset, Integer limit){

        RespResult.Builder builder = new RespResult.Builder();
        PageBounds pageBounds = new PageBounds(offset,limit);
        List<Beacons> beaconsList = beaconsService.findByExample(null,pageBounds);
        builder.data("records", beaconsList);
        builder.data("total", pageBounds.getTotal());
        return builder.build();
    }




}
