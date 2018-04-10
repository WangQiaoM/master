/**
 * Created by zhouyang on 2017/4/20.
 */

define(["jquery"],function(){

    /**
     * 绑定日期控件
     * lyz.calendar.min.js(该控件有些BUG，需要重新封装)
     */
    function DateControls(parentWindow) {

        //$("input[mode='date-sel']").attr("readonly",true);

        $("input[mode='date-sel']").datebox({
            required:true,
            height:30,
            closeText: false,
            showSeconds: false,
            editable:false,
        });

        //if($("input[mode='date-sel']").size()>0){
        //    $("input[mode='date-sel']").calendar({parentWindow:$(window.parent.document),parentObj:parentWindow});
        //}
    }

    return DateControls;
});