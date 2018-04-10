/**
 * Created by zhouyang on 2017/5/25.
 * config:
 * "wx.utils":"webpro/wechar/wx.utils",
 */
define(["webpro.config","weixin"],function(webproConfig,wx){

    var config={
        getAuthWechatUrl:webproConfig.basePath+"/wx/getAuthWechatUrl",            //得到微信
        grantJsSDKUrl:webproConfig.basePath+"/wx/grant-js-sdk",                   //微信 JS授权信息
        payRequestUrl:webproConfig.basePath+"/wx/sendPay",                       //交易提交页面
        //payBackUrl:webproConfig.baseUrl+""                                   //交易回调页面
    };

    //微信方法
    var wxUtils={
        /**
         * 执行支付操作
         * @param moneyVal          支付数额
         */
        runSendPay:function(moneyVal){

            $.ajax({
                url :config.payRequestUrl , //<span style="font-family:微软雅黑;">ajax调用微信统一接口获取prepayId</span>
                data :{
                    openid: $.getUrlParam("openid"),
                    money:moneyVal
                },
                dataType : "json",
                success : function(data) {
                    var dataObj=eval("("+data+")");

                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId" : dataObj.appId,                  //公众号名称，由商户传入
                        "timeStamp" : dataObj.timeStamp,          //时间戳，自 1970 年以来的秒数
                        "nonceStr" : dataObj.nonceStr,            //随机串
                        "package" : dataObj.package,              //
                        "signType" : dataObj.signType,            //微信签名方式:
                        "paySign" : dataObj.paySign               //微信签名
                    }, function(res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            alert("支付成功!");
                        } else {
                            alert("交易失败!");
                        }

                    });
                },
                error : function(data) {
                    alert("error");
                }
            });
        },

        /**
         * 扫码事件
         * @param backFun
         */
        scanQRCode:function(backFun){
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    backFun(res.resultStr);
                    //var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        },

    };

    //初始化 JS.SDK授权
    function WXControls(appName){
        var wxApiList = ['checkJsApi', 'chooseWXPay', 'hideMenuItems', 'onMenuShareTimeline','chooseImage', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','scanQRCode','getLocation','openLocation'];
        $.ajax({
            url : config.grantJsSDKUrl,
            async : false, //同步
            type : "POST",
            data:{
                appType:appName,
                url:window.location.href
            },
            dataType : "json",
            success : function(data) {
                console.dir(data);

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.noncestr, // 必填，生成签名的随机串
                    signature: data.signature,
                    jsApiList:wxApiList
                });

                config.AppId=data.appId;
            }
        });

        return wxUtils;
    }

    return WXControls;
});