/**
 * Created by Administrator on 2017/4/27.
 */
var _sendCode = function (openid,url) {

    var isClick = new Boolean(true);

    var clear;
    var i = 60;
    var clear1 = function() {
        i--;
        $("#sendCode").text(i+"秒后可重试");
        if(i<=0){
            i=60;
            clearInterval(clear);
            isClick = true;
            $("#sendCode").removeAttr("disabled");
            $("#sendCode").text("获取验证码");
        }
    }

    //点击验证码事件（获取验证码）
    $("#sendCode").click(function () {
        var phoneNumber = $("#phoneNumber").val();
        if(phoneNumber.length!=11){  //判断电话号码是否为有效
            alert("请填写有效的电话号码")
            return;
        }
        if (phoneNumber.length==11&&isClick == true){
            var obj = new Object();
            obj.openid = openid;
            obj.phoneno = phoneNumber;
            isClick = false;
            $.post(url,obj,function (data) {   //获取验证码请求
                console.warn("返回数据为:",data)
                $("#sendCode").attr("disabled","disabled");
                clear = setInterval(clear1,1000);
            })
        }
    })


}