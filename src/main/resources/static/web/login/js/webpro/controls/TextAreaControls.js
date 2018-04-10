/**
 * Created by zhouyang on 2017/4/20.
 * 富文本构造
 */
define(["webpro.config","jquery","wangEditor","logger"],function(webproConfig){

    /**
     * 构造富文本控件
     * @param jsonData      数据对象
     * @param modeType      视图状态
     */
    function builderTextAreaControls(jsonData,modeType){
        wangEditor.config.printLog = false;

        $(".textareaDiv textarea").each(function(){

            var thisObj = $(this);
            var htmlObj = $(this).parent();

            //数据赋值
            thisObj.val(jsonData[thisObj.attr("name")]);

            //非编辑状态
            if(modeType=="view"){
                //视图模态 构造HTML内容
                $(thisObj).hide();
                htmlObj.addClass("textareaDiv-blank");
                htmlObj.height(thisObj.height());
                htmlObj.append(thisObj.val());

            }
            //可编辑状态
            else{
                var editor = new wangEditor($(this));
                editor.config.uploadImgUrl = webproConfig.uploadUrl;
                //editor.config.uploadParams = {
                //    userID: webPro.setting.userID
                //};

                editor.create();
            }
        });

    }

    return builderTextAreaControls;
});