/**
 * Created by zhouyang on 2017/6/8.
 */
define(["doT","jquery","observer"],function(doT,$,observer){

    /**
     * 防止重复提交的ajax post请求
     * @param pageId
     */
    function appPage(pageId) {

        var appPageUtils={
            pageId:"",
            setPageId: function (pageId) {
                if($(pageId).size()!=1){

                    alert(pageId);
                    console.error("pageId 异常,根据当前pageId找到的对象数为:"+$(pageId).size());
                }
                this.pageId=pageId;
            },
            msg:{
                /**
                 * 显示加载信息
                 */
                showToast: function () {
                    $('#loadingToast').fadeIn(100);
                },
                /**
                 * 关闭加载信息
                 */
                hideToast: function () {
                    $('#loadingToast').delay(300).fadeOut(200);
                },
                /**
                 * 弹出提示消息
                 * @param txt
                 */
                alert: function (txt) {
                    $("#iosDialog2 .iosDialog2_alert_txt").text(txt);
                    $("#iosDialog2").show();
                },
            },
            /**
             * 加载数据
             * @param url           url路径
             * @param requestObj
             * @param callBackFun
             * @returns {appPageUtils}
             */
            loadData: function (url,requestObj,callBackFun) {
                var that=this;

                $.post(url,requestObj, function (data) {
                    console.dir(data);
                    try{
                        data=eval("("+data+")");
                    }
                    catch (e){
                    }

                    $(that.pageId).html(doT.template($("#htmlTmpl").text())(data.data));
                    callBackFun(data,resultUtils);

                    //
                    resultUtils.pageData=data;
                });

                return this;
            },
            /**
             * 绑定页面事件
             * @param elementName
             * @param eventName
             * @param callBackFun
             * @returns {appPageUtils}
             */
            bindEvent: function (elementName,eventName,callBackFun) {

                $(this.pageId).on(eventName,elementName,function(){
                    callBackFun.call(this,resultUtils);
                });
                return this;
            },
        };
        var resultUtils={
            pageData:{},                //当前页通过 loadData加载的data对象
            pageCache:{},               //页面缓存
            msg:appPageUtils.msg,
            pageManager:window.pageManager,

            /**
             * 构造选项卡控件
             * @param forObj
             * @param title     选择栏显示文字
             * @param items
             */
            builderActionSheet: function (forObj,title,items) {
                var $iosActionsheet = $('#iosActionsheet');
                var $iosMask = $('#iosMask');
                var actionSheetControls={
                    /**
                     * 选中第N个元素
                     * @param index
                     */
                    selectIndex: function (index) {
                        var item=items[index];
                        forObj.parent().find(".actionsheet__value").val(item.value);

                        forObj.text(item.text);
                        forObj.attr("value",item.value);


                        observer.onEvent("actionSheet_selectedEvent");
                    },
                    hideSheet: function () {
                        var $iosActionsheet = $('#iosActionsheet');
                        var $iosMask = $('#iosMask');

                        $iosActionsheet.removeClass('weui-actionsheet_toggle');
                        $iosMask.fadeOut(200);

                        return this;
                    },
                    showSheet: function () {
                        $iosActionsheet.find(".weui-actionsheet__menu .weui-actionsheet__cell").remove();
                        for (var i = 0, size =items.length; i < size; i++) {
                            var item=items[i];
                            $iosActionsheet.find(".weui-actionsheet__menu").append("<div class=\"weui-actionsheet__cell\" value=\""+item.value+"\">"+item.text+"</div>")
                        }

                        var that=this;
                        $iosActionsheet.find(".weui-actionsheet__title-text").text(title);
                        $iosActionsheet.one("click",".weui-actionsheet__menu .weui-actionsheet__cell", function () {
                            actionSheetControls.selectIndex($(this).index());
                            that.hideSheet();
                        });

                        $iosActionsheet.show().addClass('weui-actionsheet_toggle');
                        $iosMask.fadeIn(200);
                    },
                    /**
                     * 监听选择事件
                     * @param callBackFun
                     */
                    addListenerSelect: function (callBackFun) {
                        observer.addEventListener("actionSheet_selectedEvent", function () {
                            callBackFun(forObj.parent().find(".actionsheet__value").val());
                        });
                    }
                };
                //附加隐藏文本
                forObj.parent().append('<input type="hidden" class="actionsheet__value" value="">');

                $('#iosMask').on('click', actionSheetControls.hideSheet);
                $('#iosActionsheetCancel').on('click', actionSheetControls.hideSheet);
                return actionSheetControls;
            },
            find: function (selector) {
                return $(appPageUtils.pageId+" "+selector);
            },
            tmpl: function (htmlId,data,animatedName) {
                animatedName=animatedName||"fadeInDown";
                return $(doT.template($(htmlId).text())(data)).addClass("animated").addClass(animatedName);
            }
        };


        var result= (function () {
            var appPageObj= appPageUtils;
            appPageObj.setPageId(pageId);

            //重写app的AJAX Post提交
            (function () {
                var isClick=false;
                $.extend({
                    appPost: function (url,params,callBackFun) {
                        if(isClick){
                            return ;
                        }
                        isClick=true;
                        result.msg.showToast();

                        $.post(url,params, function (data) {
                            result.msg.hideToast();
                            isClick=false;

                            if(data.status=="200"){
                                callBackFun(data,resultUtils);
                            }
                            else{
                                console.error(url,data);
                                result.msg.alert("接口异常,请联系管理员.");
                            }
                        });
                    }
                });
            })();

            //事件 初始化
            (function () {
                $("#dialogs").on("click","#iosDialog2 .iosDialog2_alert_ok",function(){
                    $("#iosDialog2").hide();
                });
            })();

            return appPageObj;
        })();

        return result;
    }

    return appPage;
});