///**
// *
// * 微信JS的工具类
// * 处理WX.JS.SDK的授权及封装常用的一些操作
// *
// * 依赖JS文件:
// * wx.config.js                                         配置文件
// * http://res.wx.qq.com/open/js/jweixin-1.0.0.js        微信提供的JS文件
// *
// * @param wxCon         微信对象:来源于wx提供的js对象
// * @param appName       微信应用名称,为了支持多微信应用
// * @param baseUrl
// * @returns {WXUtils}
// * @constructor
// */
//WXUtils=function(wxCon,appName,baseUrl) {
//    var wxApiList = ['checkJsApi', 'chooseWXPay', 'hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','scanQRCode','getLocation','openLocation'];
//
//    var config={
//        getAuthWechatUrl:baseUrl+"getAuthWechatUrl",            //得到微信
//        grantJsSDKUrl:baseUrl+"grant-js-sdk",                   //微信 JS授权信息
//        payRequestUrl:baseUrl+"blendPay",                       //交易提交页面
//        payBackUrl:baseUrl+""                                   //交易回调页面
//    };
//
//    var init=function(){
//        $.ajax({
//            url : config.grantJsSDKUrl,
//            async : false, //同步
//            type : "POST",
//            data:{
//                appType:appName,
//                url:window.location.href
//            },
//            dataType : "json",
//            success : function(data) {
//                console.dir(data);
//
//                wxCon.config({
//                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                    appId: data.appId, // 必填，公众号的唯一标识
//                    timestamp: data.timestamp, // 必填，生成签名的时间戳
//                    nonceStr: data.noncestr, // 必填，生成签名的随机串
//                    signature: data.signature,
//                    jsApiList:wxApiList
//                });
//
//
//                config.AppId=data.appId;
//            }
//        });
//    };
//    init();
//
//    //E={
//    //    /**
//    //     *
//    //     * @param urlApi
//    //     * @returns {string}
//    //     * @constructor
//    //     */
//    //    GetAuthorizedUrl:function(urlApi){
//    //        var grantedURL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=";
//    //        grantedURL = grantedURL + config.AppId;
//    //        var callbackUrl = DataService.Config.ServiceDomain + urlApi;
//    //        grantedURL = grantedURL + "&redirect_uri=" + encodeURIComponent(callbackUrl);
//    //        grantedURL = grantedURL + '&response_type=core&scope=snsapi_base&state=123#wechat_redirect';
//    //        return grantedURL;
//    //    }
//    //
//    //}
//
//    var E={
//
//        /**
//         * 监听扫码事件
//         * @param backFun
//         */
//        listennerScanQRCode:function(backFun){
//            wx.scanQRCode({
//                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
//                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
//                success: function (res) {
//                    backFun(res.resultStr);
//                    //var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
//                }
//            });
//        },
//
//
//        listennerChooseImage:function () {
//            wx.chooseImage({
//                count: 1, // 默认9
//                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
//                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//                success: function (res) {
//                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//                    console.warn("选取图片地址:",localIds);
//                }
//            });
//        },
//
//        //地图查看位置接口
//        openLocation:function (lat,lnt,name,address,infoUrl) {
//            wx.openLocation({
//                latitude:lat, // 纬度，浮点数，范围为90 ~ -90
//                longitude:lnt, // 经度，浮点数，范围为180 ~ -180。
//                name:name, // 位置名
//                address: address, // 地址详情说明
//                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
//                infoUrl: infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
//            });
//        },
//
//
//        //获取当前地理位置
//        getLocation:function () {
//            wx.getLocation({
//                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//                success: function (res) {
//                    console.warn("微信返回地址位置数据",res);
//                    console.info("微信返回经度数据",res.longitude);
//                    console.info("微信返回纬度数据",res.latitude);
//                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//                    // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//                    // var speed = res.speed; // 速度，以米/每秒计
//                    // var accuracy = res.accuracy; // 位置精度
//                    wx.openLocation({
//                        latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
//                        longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
//                        name: '测试名', // 位置名
//                        address: '火星路东拐东拐', // 地址详情说明
//                        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
//                        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
//                    });
//                }
//            });
//        },
//
//        /**
//         * 监听增员用户的分享操作
//         */
//        listennerShara:function(url,title,imgUrl,desc){
//        	wxCon.ready(function(){
//            	wxCon.onMenuShareTimeline({
//                    title: title,//
//                    link: url,
//                    imgUrl: imgUrl,
//                    success: function () {
//                   	 var $iosDialog2 = $('#iosDialog2');
//						 $iosDialog2.fadeIn(200);//执行的回调函数
//                    },
//                    cancel: function () {
//                   	 var $iosDialog1 = $('#iosDialog1');
//						 $iosDialog1.fadeIn(200);// 用户取消分享后执行的回调函数
//                    }
//                });
//
//            	 wxCon.onMenuShareQQ({
//                 	title: title, //标题
//                     link: url, //分享链接
//                     desc:desc, //分享描述
//                     imgUrl: imgUrl, //分享图标
//                     success: function () {
//                    	 var $iosDialog2 = $('#iosDialog2');
//						 $iosDialog2.fadeIn(200);//执行的回调函数
//                     },
//                     cancel: function () {
//                    	 var $iosDialog1 = $('#iosDialog1');
//						 $iosDialog1.fadeIn(200);// 用户取消分享后执行的回调函数
//                     }
//
//                 });
//
//            	 wxCon.onMenuShareAppMessage({
//             	  	title: title, // 分享标题
//             	    desc: desc, // 分享描述
//             	    link: url, // 分享链接
//             	    imgUrl: imgUrl, // 分享图标
//             	    type: '', // 分享类型,music、video或link，不填默认为link
//             	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//             	   success: function () {
//                  	 var $iosDialog2 = $('#iosDialog2');
//						 $iosDialog2.fadeIn(200);//执行的回调函数
//                   },
//                   cancel: function () {
//                  	 var $iosDialog1 = $('#iosDialog1');
//						 $iosDialog1.fadeIn(200);// 用户取消分享后执行的回调函数
//                   }
//                 });
//
//            	 wxCon.onMenuShareWeibo({
//            		    title: title, // 分享标题
//            		    desc: desc, // 分享描述
//            		    link: url, // 分享链接
//            		    imgUrl: imgUrl, // 分享图标
//            		    success: function () {
//                       	 var $iosDialog2 = $('#iosDialog2');
//   						 $iosDialog2.fadeIn(200);//执行的回调函数
//                        },
//                        cancel: function () {
//                       	 var $iosDialog1 = $('#iosDialog1');
//   						 $iosDialog1.fadeIn(200);// 用户取消分享后执行的回调函数
//                        }
//            	 });
//                wx.onMenuShareQZone({
//                    title: title, // 分享标题
//                    desc: desc, // 分享描述
//                    link: url, // 分享链接
//                    imgUrl: imgUrl, // 分享图标
//                    success: function () {
//                    var $iosDialog2 = $('#iosDialog2');
//                    $iosDialog2.fadeIn(200);//执行的回调函数
//                    },
//                    cancel: function () {
//                    var $iosDialog1 = $('#iosDialog1');
//                    $iosDialog1.fadeIn(200);// 用户取消分享后执行的回调函数
//                    }
//                });
//            });
//
//        },
//
//        /**
//         * 执行支付操作
//         * @param moneyVal          支付数额
//         */
//        runPay:function(moneyVal){
//
//            $.ajax({
//                url :config.payRequestUrl , //<span style="font-family:微软雅黑;">ajax调用微信统一接口获取prepayId</span>
//                data :{
//                    openid: $.getUrlParam("openid"),
//                    money:moneyVal
//                },
//                dataType : "json",
//                success : function(data) {
//                    if (parseInt(data.agent) < 5) {
//                        alert("您的微信版本低于5.0无法使用微信支付");
//                        return;
//                    }
//                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
//                        "appId" : data.appId,                  //公众号名称，由商户传入
//                        "timeStamp" : data.timeStamp,          //时间戳，自 1970 年以来的秒数
//                        "nonceStr" : data.nonceStr,            //随机串
//                        "package" : data.packageValue,         //<span style="font-family:微软雅黑;">商品包信息</span>
//                        "signType" : data.signType,            //微信签名方式:
//                        "paySign" : data.paySign               //微信签名
//                    }, function(res) {
//                        if (res.err_msg == "get_brand_wcpay_request:ok") {
//                            alert("支付成功!");
//                        } else {
//                            alert("交易失败!");
//                        }
//
//                    });
//                },
//                error : function(data) {
//                    alert("error");
//                }
//            });
//        }
//
//    };
//    return E;
//};
//
///**
// * 让路径转换为需要授权的路径
// * @param url
// * @constructor
// */
//WXUtils.AuthUrl=function(url,baseUrl){
//    var reStr="";
//    $.ajax({
//        url: baseUrl+"api/wx/getAuthWechatUrl",
//        async: false, //同步
//        type: "POST",
//        data: {
//            appName: "testusercar",
//            url: url
//        },
//        success: function (data) {
//            reStr=data;
//        }
//
//    });
//    return reStr;
//}
//
//
//
