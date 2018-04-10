/**
 * Created by Administrator on 2017/5/27.
 */
define(['jquery'],function(){
   var tab=function(clickDiv,controlDiv,addClass){//选项卡

       var $div=$("."+clickDiv);//列：div>p
       var $controlDiv=$("."+controlDiv);//列：div>p

       $div.click(function(){//给divClass下的子集绑定事件
           var $index=$(this).index();
           $(this).addClass(addClass).siblings().removeClass(addClass);
           $controlDiv.eq($index).show().siblings().hide();
       })
   };

   var modMeng=function (clickDiv,showDiv) {//蒙板层

       var $div=$("."+clickDiv);//触发
       var $showDiv=$("."+showDiv);//需要在蒙层显示的元素

       $div.click(function(){
           mode($showDiv)
           $showDiv.show();
       })
       var mode=function(){//添加模态框
           $("<div id='mo'></div>").click(function(){//添加模态框并给点击事件
               hidee();
           }).prependTo("body");//把模态框插入body最上面
       };
       var hidee=function(){//删除模态框
           $("#mo").remove();
           $showDiv.hide()
       }
   }

    return{
        tab: tab,
        modMeng:modMeng
    }
});