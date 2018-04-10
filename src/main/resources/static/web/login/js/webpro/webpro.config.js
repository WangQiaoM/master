/**
 * 主框架配置文件
 */
define(["webpro"],function(webpro){
    webpro();

    //微信配置
    var wecharConfig={
        appName:"testusercar",
        grantJsSDKUrl:""
    };

    //地图配置
    var mapConfig={
        currentCity:"重庆",
        "lng":0,
        "lat":0,
        "lv":13
    };

    //文字颜色
    var fontColor={
        "待安装":"Peru",
        "执行中":"RoyalBlue",
        "待审核":"Peru",
        "已认证手机":"LimeGreen",
        "已审核":"LimeGreen",
        "未使用":"red",
        "待结算":"Peru",
        "任务完成":"LimeGreen",
        "使用中":"RoyalBlue",
        "审核通过":"LimeGreen",
        "已绑定OBD":"LimeGreen",
        "可预约":"red",
        "用户审核":"#757575",
        "用户类型":"#757575",
        "使用状态":"#757575",
        "绑定状态":"#757575",
        "签订状态":"#757575",
        "车主类型":"#757575",
        "推送消息状态":"#757575",
        "服务网点用户":"#757575",
        "平台用户":"#757575",
        "新注册":"#757575",
        "无数据":"red",
        "已生成":"LimeGreen",
        "暂无申请":"red",
        "OBD+广告":"red"
    };

    return {
        basePath:"http://localhost:8081/api/",
        uploadUrl:"http://test.looks.net.cn:8011/upload",                       //上传地址
        uploadImgWidth:500,                                                     //上传图片宽度
        isDebug:true,                                                           //是否为调试模式
        wecharConfig:wecharConfig,
        mapConfig:mapConfig,
        fontColor:fontColor
    }
});
