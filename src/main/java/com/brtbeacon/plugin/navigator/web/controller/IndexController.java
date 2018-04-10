package com.brtbeacon.plugin.navigator.web.controller;

import com.brtbeacon.plugin.navigator.entity.UserInfo;
import com.brtbeacon.plugin.navigator.service.BuildingDeployService;
import com.brtbeacon.plugin.navigator.service.UserInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.UUID;

/**
 * IndexController
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/15.
 */
@Controller
public class IndexController {

    @Resource
    private BuildingDeployService buildingDeployService;

    @Resource
    private UserInfoService userInfoService;

    /**
     * 跳转到设置页面
     *
     * @return setup
     */
    /*@RequestMapping(value = "/")
    public String index() {
        return "redirect:/wait";
    }*/


    @RequestMapping(value = "/web")
    public String web() {
        return "login";
    }


    @ResponseBody
    @RequestMapping(value = "/login/validation")
    public String validation(HttpServletRequest request){
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (StringUtils.isEmpty(username)||StringUtils.isEmpty(password)){
            return "1";
        }

        UserInfo userInfo = userInfoService.isExist(username,password);
        if (StringUtils.isEmpty(userInfo)){
            return "0";
        }
        HttpSession session = request.getSession();
        userInfo.setLogin(userInfo.getLogin());
        session.setAttribute("user",userInfo);
        return buildingDeployService.findByExample(null).get(0).getBuildingId();
    }

    /**
     * 获取单个用户
     * @param session
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/user/getUserInfo",method = RequestMethod.GET)
    public UserInfo getUserInfo(HttpSession session){
        UserInfo sessionUser = (UserInfo) session.getAttribute("user");
        return userInfoService.findOne(sessionUser.getId());
    }

    /**
     * 新增或修改
     * @param userInfo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/user/saveOrUpdate",method = RequestMethod.POST)
    public int saveOrUpdate(UserInfo userInfo){
        int status=0;
        if (!StringUtils.isEmpty(userInfo)&&StringUtils.isEmpty(userInfo.getId())){
            status = userInfoService.save(userInfo);
        }else {
            status =userInfoService.update(userInfo);
        }
        return status;
    }



    @RequestMapping(value = "/exit")
    public String exit (HttpSession session){
        session.removeAttribute("user");
        return "login";
    }


    /*public static void main(String[] args) {
        String sign = UUID.randomUUID().toString().replaceAll("-", "");
        System.out.println(sign);
    }*/

}
