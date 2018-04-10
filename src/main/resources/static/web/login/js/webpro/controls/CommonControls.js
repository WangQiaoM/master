/**
 * Created by zhouyang on 2017/4/20.
 * 基础控件
 */

define(function(){

    /**
     *
     * @param jsonData
     * @param modeType
     * @constructor
     */
    function CommonControls(jsonData,modeType){
        //非编辑状态
        if(modeType=="view"){
            $("input,select").attr("readonly","readonly");
        }

        $("input,select").each(function () {

            if(typeof(jsonData[$(this).attr("name")])=="undefined"){
                return;
            }

            $(this).val(jsonData[$(this).attr("name")]);
        });
    }

    return CommonControls;
});