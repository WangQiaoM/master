/**
 * Created by zhouyang on 2017/4/20.
 * 地图控件
 *
 * css:
 */
define(["webpro.config","jqueryEasyui","async!BMap"],function(webproConfig){

    var lng=webproConfig.mapConfig.lng;
    var lat=webproConfig.mapConfig.lat;
    var mapLv=webproConfig.mapConfig.lv;

    /**
     *
     * @param jsonData
     * @param modeType
     * @constructor
     */
    function MapControls(jsonData,modeType){

        // 百度地图API功能
        var mapControl = new BMap.Map("map-content");

        /**
         * 地图控件
         */
        var mapContorls={

            /**
             * 增加地图点信息
             * @param point
             * @param imgUrl
             * @param width
             * @param height
             */
            addPointByImg:function(point,imgUrl,width,height){
                var myIcon = new BMap.Icon(imgUrl, new BMap.Size(width,height));
                var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
                mapControl.addOverlay(marker);                      // 将标注添加到地图中

                return marker;
            },

            /**
             * TODO 文本
             * @param point
             * @param title
             * @returns {*}
             */
            addPointByTxt:function(point,title){

                return txtMarker;
            },

            /**
             * 增加带动画的点
             */
            addPointByAnimation:function(title,lng,lat){
                var point = new BMap.Point(lng, lat);
                var marker = new BMap.Marker(point);            // 创建标注

                mapControl.addOverlay(marker);                  // 将标注添加到地图中

                mapControl.panTo(new BMap.Point(lng,lat));

                marker.setAnimation(BMAP_ANIMATION_BOUNCE);     //跳动的动画
                var label = new BMap.Label(title,{offset:new BMap.Size(20,-10)});

                label.setStyle({                                   //给label设置样式，任意的CSS都是可以的
                    position:"initial",
                    fontSize:"12px",               //字号
                    border:"0",                    //边
                    height:"30px",                //高度
                    lineHeight:"30px",            //行高，文字垂直居中显示
                    cursor:"pointer",
                    backgroundColor:"#333",
                    color:"#fff",
                    padding:"5px"
                });
                marker.setLabel(label);

                return marker;
            },

            /**
             * 绘制线
             * @param pointArr
             */
            addLineByPointArr:function(pointArr,color){
                mapControl.addOverlay(new BMap.Polyline(pointArr, {strokeColor: color}));
            },

            /**
             * 增加地图点击事件
             */
            addEventClickListener:function(){

                mapControl.addEventListener("click", function(e){
                    $(".mapControl .map-des .latTxt").text(e.point.lat);
                    $(".mapControl .map-des .lngTxt").text(e.point.lng);

                    var point = new BMap.Point(e.point.lng,e.point.lat);
                    var marker = new BMap.Marker(point);// 创建标注
                    mapControl.clearOverlays();
                    mapControl.addOverlay(marker);             // 将标注添加到地图中

                    $("input[name='"+controlName+"-lng']").val(e.point.lng);
                    $("input[name='"+controlName+"-lat']").val(e.point.lat);
                });
            },

            /**
             * 地图移动
             * @param lng
             * @param lat
             */
            movePoint:function(lng,lat){
                mapControl.panTo(new BMap.Point(lng, lat));
            },

            /**
             * 清理图层点位信息
             */
            clearPoint:function(){
                mapControl.clearOverlays();
            }
        };

        //初始化控件
        (function () {
            $(".mapControl").each(function() {
                var self = $(this);
                var controlName=self.attr("name");

                // 创建Map实例
                mapControl.centerAndZoom(new BMap.Point(106.534, 29.535), 13);  	// 初始化地图,设置中心点坐标和地图级别
                mapControl.addControl(new BMap.MapTypeControl());   				// 添加地图类型控件
                mapControl.setCurrentCity("重庆");          						// 设置地图显示的城市 此项是必须设置的
                mapControl.enableScrollWheelZoom(true);     						// 开启鼠标滚轮缩放


            });
        })();

        //加载标记
        (function () {
            if(typeof(mapControl)=="undefined"||typeof(jsonData.lat)=="undefined"){return;}

            $(".mapControl .map-des .latTxt").text(jsonData.lat);
            $(".mapControl .map-des .lngTxt").text(jsonData.lnt);

            var point = new BMap.Point(jsonData.lnt,jsonData.lat);
            var marker = new BMap.Marker(point);// 创建标注
            mapControl.clearOverlays();
            mapControl.addOverlay(marker);             // 将标注添加到地图中

            $("input[name$='-lng']").val(jsonData.lnt);
            $("input[name$='-lat']").val(jsonData.lat);

            //定位标记
            mapControl.centerAndZoom(point, 13);
        })();

        //浮动模块事件
        (function(){
            //初始位置
            //$(".flow-card").css({"left":$(window).width()-$(".flow-card").width()-10});
            $(".flow-card").css({"left":10});

            //记录初始高宽度
            $(".flow-card-body").each(function(){
                $(this).attr("pHeight",$(this).height());
                $(this).attr("pWidth",$(this).width());
            });

            //隐藏.显示模块
            $(".flow-card-body .flow-title i").click(function(){
                var cardObj=$(this).parent().parent().parent();
                var point=$(this);
                var cardBody=cardObj.find(".flow-card-body");

                if(point.hasClass("fa-caret-down")){
                    cardObj.find(".flow-grid").fadeOut(300);
                    cardBody.delay(300).animate({height:"25px",width:"150px"},300);
                }
                else{
                    cardBody.animate({height:cardBody.attr("pHeight"),width:cardBody.attr("pWidth")},300);
                    cardObj.find(".flow-grid").delay(300).fadeIn(300);
                }

                point.toggleClass("fa-caret-down");
                point.toggleClass("fa-caret-up");
            });

            //绑定模块拖拽事件
            $(".flow-card").draggable({
                handle: ".flow-title"
            });
        })();

        return mapContorls;
    }

    return MapControls;
});