package com.brtbeacon.plugin.navigator.web.controller;

import com.brtbeacon.plugin.navigator.service.BuildingDeployService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 视图控制器
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/19
 */
@Controller
@RequestMapping("/view")
public class ViewController {

    @Resource
    private BuildingDeployService buildingDeployService;

    /**
     * 跳转视图
     *
     * @param buildingID 建筑标识
     * @return
     */
    @RequestMapping(value = "/{buildingID}")
    public String index(@PathVariable("buildingID")String buildingID) {
        return "redirect:/view/setup/" + buildingID;
    }

    /**
     * 设置视图
     *
     * @param buildingID    建筑标识
     * @return
     */
    @RequestMapping(value = "/setup/{buildingID}", method = RequestMethod.GET)
    public String setup(@PathVariable("buildingID")String buildingID, Model model, HttpSession session) {

        if (StringUtils.isEmpty(session.getAttribute("user"))){
            return "login";
        }

        if (StringUtils.isEmpty(buildingID)){
            throw new IllegalArgumentException("建筑标识为空");
        }

        model.addAttribute("user",session.getAttribute("user"));
        model.addAttribute("buildingID", buildingID);
        model.addAttribute("buildings", buildingDeployService.findByExample(null));
        return "pages/setup";
    }


    @RequestMapping(value = "/web", method = RequestMethod.GET)
    public String web(HttpServletRequest request, Model model) {

        if (StringUtils.isEmpty(request.getSession().getAttribute("user"))){
            return "login";
        }
        model.addAttribute("phone",request.getSession().getAttribute("user").toString());
        return "pages/setup";
    }


    /**
     * 分享设置视图
     *
     * @param buildingID  本地建筑ID
     * @param model
     * @return
     */
    @RequestMapping(value = "/setup/{buildingID}/share", method = RequestMethod.GET)
    public String share(@PathVariable("buildingID")String buildingID, Model model,HttpSession session) {
        if (StringUtils.isEmpty(session.getAttribute("user"))){
            return "login";
        }
        model.addAttribute("user",session.getAttribute("user"));
        model.addAttribute("buildingID",buildingID);
        model.addAttribute("buildings", buildingDeployService.findByExample(null));
        return "share";
    }


    /**
     * 推荐视图
     *
     * @param buildingID  建筑ID
     * @param id    推荐ID
     * @param model
     * @return
     */
    @RequestMapping(value = "/setup/{buildingID}/recommendation", method = RequestMethod.GET)
    public String recommendation(@PathVariable("buildingID")String buildingID,HttpSession session,
                                 @RequestParam(value = "id", required = false) Long id, Model model) {

        if (StringUtils.isEmpty(session.getAttribute("user"))){
            return "login";
        }
        model.addAttribute("user",session.getAttribute("user"));
        model.addAttribute("buildingID", buildingID);
        model.addAttribute("id", id);
        model.addAttribute("buildings", buildingDeployService.findByExample(null));
        return "recommendation";
    }


    /**
     * 广告视图
     * @param buildingID
     * @param model
     * @return
     */
    @RequestMapping(value = "/setup/{buildingID}/adImage", method = RequestMethod.GET)
    public String adImage(@PathVariable("buildingID") String buildingID,Model model,HttpSession session){
        if (StringUtils.isEmpty(session.getAttribute("user"))){
            return "login";
        }
        model.addAttribute("user",session.getAttribute("user"));
        model.addAttribute("buildingID",buildingID);
        model.addAttribute("buildings", buildingDeployService.findByExample(null));
        return "adImage";
    }

    /**
     * 新增广告视图
     * @param buildingID
     * @param model
     * @return
     */
    @RequestMapping(value = "/setup/{buildingID}/adImageCreate", method = RequestMethod.GET)
    public String adImageCreate(@PathVariable("buildingID") String buildingID,Model model,HttpSession session){
        if (StringUtils.isEmpty(session.getAttribute("user"))){
            return "login";
        }
        model.addAttribute("user",session.getAttribute("user"));
        model.addAttribute("buildingID",buildingID);
        //model.addAttribute("buildings", buildingDeployService.findByExample(null));
        return "adImage_create";
    }




    /**
     * 验证是否可以操作
     *
     * @param userId
     * @param buildingID
     */
    private void checkAvailable(Long userId, @PathVariable("buildingID")String buildingID) {
        // boolean available = userPluginService.isAvailable(userId, bxId);
       /* boolean available =
                buildingExt.getId().intValue() == bxId.intValue() && userId.longValue() == buildingExt.getUserId()
                                                                                                      .longValue();
        if (!available) {
            throw new IllegalStateException("您未为该建筑购买插件或您的建筑插件已到期!");
        }*/
    }
}
