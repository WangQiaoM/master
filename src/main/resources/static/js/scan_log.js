/**
 * Created by admin on 2017/11/27.
 */
var jsonp = document.createElement("script");
jsonp.src = "/api/v1/jsapi?appId="+$appId+"&callback=init_wx&url=" + encodeURIComponent(location.href.split('#')[0]);
document.getElementsByTagName("head")[0].appendChild(jsonp);


var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];

function compare(property)
{
    return function(a,b)
    {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
console.log(arr.sort(compare('age')));




function init_wx(res) {
    var r = res.data;

    //微信 参数配置
    wx.config({
        debug: true,
        appId: r.appId,					//必填
        timestamp: r.timestamp,			//必填
        nonceStr: r.nonceStr,			//必填
        signature: r.signature,			//必填
        jsApiList: [
            'checkJsApi',				//必填
            'startSearchBeacons',		//必填
            'stopSearchBeacons',		//必填
            'onSearchBeacons',			//必填
            'onMenuShareAppMessage',
            'onMenuShareTimeline'
        ]
    });


    wx.ready(function(){

        //停止扫描beacon功能
        wx.stopSearchBeacons({
            complete: function(res){}
        });


        wx.startSearchBeacons({
            ticket:"",
            complete:function(argv){
            }
        });




        //监控扫描beacon
        wx.onSearchBeacons({
            complete: function(argv) {

                var html = "";
                var beacons = argv.beacons;
                beacons.sort(function (a,b) {
                    return b.rssi - a.rssi;
                });

                for(var i =0;i<beacons.length;i++){
                    var major = beacons[i].major;
                    var minor = beacons[i].minor;
                    var rssi = beacons[i].rssi;
                    beacons[i].createTime = new Date().getTime();
                    html += "<span>major:"+major+"</span>&nbsp;&nbsp;<span>minor:"+minor+"</span>&nbsp;&nbsp;<span>rssi:"+rssi+"</span><br>";
                }


                var obj =  JSON.stringify(beacons);

                $.post("/scan_log/saveBeacons",{beacons:obj,total:beacons.length});


                $("body").html(html)
            }
        });



    });



}