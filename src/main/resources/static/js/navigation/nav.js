

//定位
var $location = null;

/*
 * init nav_location
 */

function _init_nav_location(){

    // 定位
    $location = new BRTLocation({
        token:_initToken,
        buildingID:_initBuildingID,
        enableHeatdata:true
    });

    //微信接口
    // var $url = "http://wx.oauth.user.heymking.com/views/base/apiTicketSignJsonp?callback=_init_wx_ready&appid=wx749ed2c85a2e541d&url=http://wx749ed2c85a2e541d.wxdh.pro.brtbeacon.net/demo/3D/index.html";

    var jsonp = document.createElement("script");
    jsonp.src = $url;
    document.getElementsByTagName("head")[0].appendChild(jsonp);


}

//执行 nav_function
_init_nav_location();



var initPlayAudioStatus = "";

/*
 * init wx_ready
 */

function _init_wx_ready(r){

    r = r.data;

    //微信 参数配置
    wx.config({
        debug: false,
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

        //开启beacon扫描
        $extend.fn_startSearchBeacons();

        var _locTimeOut = window.setTimeout(function(){},10);

        function _movePoint(point,callback){

            $location.setInertiaPoint(point);

            var _lnglat = brtmap.CoordProjection.mercatorToLngLat(point.x, point.y);

            $marker.locationIcon.panTo([_lnglat.lng, _lnglat.lat], $extend.queryFloorInfo(point.floor).mapID);

            callback && callback(_lnglat);

        }

        //监控扫描beacon
        wx.onSearchBeacons({
            complete: function(argv) {

                window.clearTimeout($nav.$bthTimeOut);

                $nav.$bthTimeOut = window.setTimeout(function(){

                    window.clearTimeout(_locTimeOut);

                    //未检查到定位
                    $state.USER_LOCATION = false;

                    // $marker.locationIcon.empty();

                    $extend.fn_startSearchBeacons();

                },20000);
                //关闭蓝牙提示
                $nav.$BluetoothAlert.close();

                //console.log(JSON.stringify($location));
                //计算定位
                $location.StartPositioning(argv, function(point, angle){


                    if(angle && $map){
                        $marker.locationIcon.setRotate(angle - $map.building.initAngle);
                    }

                    if(point){

                        window.clearTimeout($nav.$locTimeOut);
                        LoadingLayer2.hide();
                        $nav.$LocationAlert.close();

                        //用户已定位
                        $state.USER_LOCATION = true;

                        $variable.$locationPoint = point;


                        //用户导航选点 我的位置回调
                        if($variable.$selectPointCallee){
                            $variable.$selectPointCallee();
                            $variable.$selectPointCallee = null;
                        }

                        //模拟第一次定位成功 特殊处理
                        if(!$state.USER_LOCATION_FLOOR){

                            if($state.AUTO_CHANGE_FLOOR){

                                if(point.floor != $map.currentMapInfo.floorNumber){
                                    $extend.fn_setFloor($extend.queryFloorInfo(point.floor).mapID, function(){
                                        _movePoint(point,function(lnglat){
                                            $map.easeTo({
                                                center:lnglat,
                                                zoom:18,
                                                pitch:30
                                            });
                                        });
                                    })
                                }
                                else{
                                    _movePoint(point,function(lnglat){
                                        $map.easeTo({
                                            center:lnglat,
                                            zoom:18,
                                            pitch:30
                                        });
                                    });
                                }

                            }

                            //记录定位点楼层
                            $state.USER_LOCATION_FLOOR = point.floor;

                        }

                        //上次定位点楼层不等于更新定位点楼层
                        if($state.USER_LOCATION_FLOOR != point.floor && $state.AUTO_CHANGE_FLOOR){

                            $extend.fn_setFloor($extend.queryFloorInfo(point.floor).mapID, function(){
                                _movePoint(point,function(lnglat){
                                    $map.easeTo({
                                        center:lnglat,
                                        zoom:18,
                                        pitch:0
                                    });
                                });
                            });

                            //记录定位点楼层
                            $state.USER_LOCATION_FLOOR = point.floor;
                        }


                        //导航中
                        if($state.USER_NAVING){
                            $extend.fn_SetLocationPoint(point);
                            return;
                        }


                        //普通移动
                        _movePoint(point);  //x , y, floor,

                    }

                });

            }
        });


        wx.onMenuShareAppMessage({
            title: $shareInfo.title, // 分享标题
            desc: $shareInfo.desc, // 分享描述
            link: $shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://files.brtbeacon.com/pro/wxdh/icons/icon_default.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareTimeline({
            title: $shareInfo.title, // 分享标题
            link: $shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://files.brtbeacon.com/pro/wxdh/icons/icon_default.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

    });


}



/*
 * extend function
 */

function _nav_extend(){


    //开启beacon扫描
    $extend.fn_startSearchBeacons = function(){

        //关闭蓝牙提示
        $nav.$BluetoothAlert.close();
        //关闭定位提示
        $nav.$LocationAlert.close();

        //停止扫描beacon功能
        wx.stopSearchBeacons({
            complete: function(res){

                //开启扫描beacon功能
                wx.startSearchBeacons({
                    ticket: "",
                    complete: function(res){

                        //未开启蓝牙
                        if(res.errMsg.indexOf('bluetooth power off') > -1){

                            $nav.$BluetoothAlert = AlertLayer({
                                content:"<p class='bluetooth-tips-p1'>检测到您蓝牙已关闭</p><p class='bluetooth-tips-p2'>请开启蓝牙后再试.</p>",
                                button:[
                                    {
                                        name:'我知道了',
                                        callback:function(){}
                                    }
                                ]
                            });

                        }else if(res.errMsg.indexOf('location service disable') > -1){
                            $nav.$BluetoothAlert = AlertLayer({
                                content:"<p class='bluetooth-tips-p1'>定位服务未打开</p><p class='bluetooth-tips-p2'>请前往设置打开定位服务.</p>",
                                button:[
                                    {
                                        name:'我知道了',
                                        callback:function(){}
                                    }
                                ]
                            });
                        }
                        else{

                            $extend.fn_locationTips();

                        }

                    }
                });

            }
        });

    };


    //定位提示
    $extend.fn_locationTips = function(){
        //正在定位提示
        LoadingLayer2.show('正在定位...',$index.$container[0], function(){
            window.clearTimeout($nav.$locTimeOut);
        });

        $nav.$locTimeOut = window.setTimeout(function(){

            LoadingLayer2.hide();

            $nav.$LocationAlert = AlertLayer({
                content:"<p style='color:#ff3333'>未检查到您的位置</p><p style='color:#999999; font-size:0.8rem; margin-top:0.5rem;'>请确保网络流畅且处于场景内.</p>",
                button:[
                    {
                        name:'取消',
                        callback:function(){}
                    },
                    {
                        name:'再搜一次',
                        callback:function(){
                            $extend.fn_locationTips();
                        }
                    }
                ]
            });

        }, 20000);

    };


    //只计算一次终点虚拟坐标点(兼容一些poi无法到达终点的问题)
    var intersectionPoint = null, audioIndex = null, isPlayAudio = true, prevClass = '';

    var _resetRouteTime = 0,showRouteTime = new Date().getTime();

    // 更新定位点
    $extend.fn_SetLocationPoint = function(point){

        if(!$state.USER_NAVING || point.floor != $map.currentMapInfo.floorNumber) return;

        //只计算一次 并且定位点必须在终点楼层
        if( !intersectionPoint && $variable.$endPOI && point.floor == $variable.$endPOI.FLOOR_NUMBER){
            intersectionPoint = $extend.fn_getPointOfIntersection($variable.$endPOI);
        }

        var nearPoint = $extend.getNearPoint(point);

        console.log('nearPoint ->', nearPoint.minDistance);

        //定位点超过路径10米开外
        if(!nearPoint.point || nearPoint.minDistance > 18 || (point.floor != $variable.$startPOI.FLOOR_NUMBER && point.floor != $variable.$endPOI.FLOOR_NUMBER)){

            if(new Date().getTime() - _resetRouteTime <= 5000){ return;}

            _resetRouteTime = new Date().getTime();

            //经纬度转换坐标
            var _startPoint = brtmap.CoordProjection.mercatorToLngLat(point.x, point.y),
                _endPoint = brtmap.CoordProjection.mercatorToLngLat($variable.$endPoint.x, $variable.$endPoint.y);

            _startPoint.floor = point.floor;
            _endPoint.floor = $variable.$endPoint.floor;

            $map.resetRoute();
			 // LoadingLayer.show('重新规划中…');
            //规划路径
            $symbol.Route(_startPoint, _endPoint, function(result){
                _resetRouteTime = new Date().getTime();
            },$map,function (error) {
				/*LoadingLayer.hide();*/
            });

            $marker.locationIcon.panTo([_startPoint.lng, _startPoint.lat]);

        }
        else{

            $variable.$nearPoint = nearPoint.point;
            $variable.$nearPoint.floor = point.floor;


            //坐标转换经纬度
            var _lnglat = brtmap.CoordProjection.mercatorToLngLat(nearPoint.point.x, nearPoint.point.y);

            $marker.locationIcon.panTo([_lnglat.lng, _lnglat.lat]);

            if((new Date().getTime()) - showRouteTime >= 1000){

                showRouteTime = new Date().getTime();

                $map.showRoute({x:_lnglat.lng, y:_lnglat.lat, floor:point.floor});
            }


            var _$topBox = $index.$navingTopTips.find('.top-box'),
                _$bomBox = $index.$navingTopTips.find('.bom-box');


            //获取已经过的路径
            var pastRoute = $extend.getPastRouteOnNearPoint(nearPoint);

            //自动导航模式
            if($state.AUTO_NAV){

                $map.easeTo({
                    center:_lnglat,
                    bearing:pastRoute.currentPoint.angle + 90
                });

            }

            var _surDistance = Math.ceil(pastRoute.currentPoint.surDistance), _iconClass = 'straight', _iconText = '沿当前路线直行';

            if(_surDistance < 7 && pastRoute.nextPoint){
                //获取角度提示
                var angleTips = $extend.fn_getAngleTips(pastRoute.nextPoint.angle - pastRoute.currentPoint.angle);

                _iconClass = angleTips.icon;
                _iconText = angleTips.text;

                if((isPlayAudio || nearPoint.pointIndex != audioIndex) && (prevClass != _iconClass)){

                    $extend.playAudio(_iconText);

                    isPlayAudio = false;

                    audioIndex = nearPoint.pointIndex;

                    prevClass = _iconClass;

                }


            }

            if((nearPoint.pointIndex != audioIndex) && (prevClass != _iconClass)){
                $extend.playAudio(_iconText);

                isPlayAudio = true;

                audioIndex = nearPoint.pointIndex;

                prevClass = _iconClass;
            }

            var _distance = pastRoute.surDistCount;

            _$topBox.find('.heading-icon').attr('class','heading-icon ' + _iconClass);
            _$topBox.find('.tips-text').find('.p1').text(_iconText);
            _$topBox.find('.tips-text').find('.p2').text('剩' + Math.round(_distance) + '米');


            //分钟
            var _mins = Math.ceil(pastRoute.surDistCount / 1.5 / 60);

            //全程剩余米
            _$bomBox.find('.text').find('.b1').text(Math.ceil(pastRoute.surDistCount));
            //分钟
            _$bomBox.find('.text').find('.b2').text(Math.ceil(_mins));



            if(intersectionPoint){
                _distance = Math.sqrt((intersectionPoint.x - nearPoint.point.x) * (intersectionPoint.x - nearPoint.point.x) + (intersectionPoint.y - nearPoint.point.y) * (intersectionPoint.y - nearPoint.point.y));
            }

            console.log("全程剩余米",_distance);
            //全程剩余米小于6米  结束导航处理
            if(_distance < 10 && point.floor == $variable.$endPOI.FLOOR_NUMBER){

                if(point.floor != $map.currentMapInfo.floorNumber){
                    $extend.fn_setFloor($extend.queryFloorInfo(point.floor).mapID);
                }

                $index.$navingTopTips.removeClass('hideTop');
                $index.$navingBomButton.hideControl();

                _$topBox.find('.heading-icon').attr('class','heading-icon stop');
                _$topBox.find('.tips-text').find('.p1').text('您已到达终点附近！');

                //语音播报
                $extend.playAudio('已到达终点附近，本次导航结束，谢谢使用！');

                _$bomBox.find('.text').find('.b1').text('0');
                _$bomBox.find('.text').find('.b2').text('0');

                $index.$navOverTopTips.find('.left-box')
                    .find('.start-text').text($variable.$startPOI.NAME + ' ' + $variable.$startPOI.FLOOR_NAME)
                    .siblings('.end-text').text($variable.$endPOI.NAME + ' ' + $variable.$endPOI.FLOOR_NAME)
                    .siblings('.tips-text').find('b').text((pastRoute.sumDistCount * 0.12 / 7.70).toFixed(2));

                $index.$navOverTopTips.find('.right-box')
                    .find('.text').find('b').text(Math.ceil(pastRoute.sumDistCount));


                $index.$floor.show();
                $index.$search.show();


                var _lnglat = brtmap.CoordProjection.mercatorToLngLat($variable.$endPoint.x, $variable.$endPoint.y);

                $map.showRoute({x:_lnglat.lng, y:_lnglat.lat, floor:$variable.$endPoint.floor});

                //默认
                intersectionPoint = null;

                //结束导航状态
                $state.USER_NAVING = false;
                //关闭自动导航模式
                $state.AUTO_NAV = false;

                var _time = 5;

                !function(){

                    if(_time <= 0){

                        $index.$navingTopTips.removeClass('show');
                        $index.$navOverTopTips.addClass('show');

                        $index.$navingBomButton.find('.close').hide();
                        $index.$navingBomButton.find('.btn-box').find('.b-backmap').show().siblings().hide();
                        $index.$navingBomButton.showControl();

                        $marker.navEndIcon.empty();
                        $marker.endIcon.setLnglat([$variable.$endPoint.x, $variable.$endPoint.y], $variable.$endPOI.FLOOR_ID);

                        return;

                    }

                    _$topBox.find('.tips-text').find('.p2').text(_time + '秒之后结束导航');

                    _time--;

                    window.setTimeout(arguments.callee,1000);

                }();


            }

        }

    };


    // 获取导航路径最近点
    $extend.getNearPoint = function(point){

        var that = this;

        //路径
        this._routeResult = $variable.$routeResult.completeResult._allRoutePartArray;

        //路径楼层索引
        var _floorIndex = -100000;
        //最小距离
        var _minDistance = 100000000;
        //最小距离点索引
        var _minDistIndex = -100000;
        //路径线路最近的一个点
        var _currentPoint = null;


        //获取交叉点
        function _getClosePoint(point, point1, point2){

            var cross = (point2.x - point1.x) * (point.x - point1.x) + (point2.y - point1.y) * (point.y - point1.y);

            if(cross <= 0) return point1;

            var d2 = (point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y);

            if(cross >= d2) return point2;

            var r = cross / d2;

            var px = point1.x + (point2.x - point1.x) * r;
            var py = point1.y + (point2.y - point1.y) * r;

            return {x:px, y:py};

        }


        //先获取定位点与路径点 最小距离的点索引
        for(var i = 0; i < this._routeResult.length; i++){

            //定位点相同路径楼层
            if(point.floor == this._routeResult[i].mapInfo.floorNumber){

                var _points = this._routeResult[i].route;

                for(var k = 0, len = _points.length; k < len; k++){

                    var	_point1 = null,
                        _point2 = null;

                    if(k == len - 1){
                        _point1 = brtmap.CoordProjection.lngLatToMercator(_points[k][0], _points[k][1]),
                            _point2 = brtmap.CoordProjection.lngLatToMercator(_points[k][0], _points[k][1]);
                    }
                    else{
                        _point1 = brtmap.CoordProjection.lngLatToMercator(_points[k][0], _points[k][1]),
                            _point2 = brtmap.CoordProjection.lngLatToMercator(_points[k+1][0], _points[k+1][1]);
                    }

                    var _point = _getClosePoint(point, _point1, _point2);

                    var _d = Math.sqrt((point.x - _point.x) * (point.x - _point.x) + (point.y - _point.y) * (point.y - _point.y));

                    if(_d <= _minDistance){

                        _minDistance = _d;

                        _minDistIndex = k;

                        _floorIndex = i;

                        _currentPoint = _point;

                    }

                }

            }

        }

        return {
            point:_currentPoint,
            minDistance:_minDistance,
            routeFloorIndex:_floorIndex,
            pointIndex:_minDistIndex
        };

    };


    //获取已经过路径
    $extend.getPastRouteOnNearPoint = function(nearPoint){

        this._routeResult = $variable.$routeResult.completeResult._allRoutePartArray;

        //返回结果
        var _backResult = {
            sumDistCount:0,		//总距离
            pastDistCount:0,	//已路过距离
            surDistCount:0,		//剩余距离
            points:[],			//各路段集合
            currentPoint:null,	//当前路段
            nextPoint:null		//当前路段的下一路段
        };


        for(var i = 0; i < this._routeResult.length; i++){

            var _points = this._routeResult[i].route, _isNextPoint = false;

            for(var k = 0, len = _points.length; k < len; k++){

                var	_point1 = null,
                    _point2 = null;

                if(k == len - 1){
                    _point1 = brtmap.CoordProjection.lngLatToMercator(_points[k][0], _points[k][1]),
                        _point2 = brtmap.CoordProjection.lngLatToMercator(_points[k][0], _points[k][1]);
                }
                else{
                    _point1 = brtmap.CoordProjection.lngLatToMercator(_points[k][0], _points[k][1]),
                        _point2 = brtmap.CoordProjection.lngLatToMercator(_points[k+1][0], _points[k+1][1]);
                }


                var _angle = $extend.getTwoPointAngle(_point1, _point2);

                if(isNaN(_angle)){
                    _angle = 0;
                }

                var _distance = Math.sqrt((_point1.x - _point2.x) * (_point1.x - _point2.x) + (_point1.y - _point2.y) * (_point1.y - _point2.y));

                var _object = {
                    angle:_angle,
                    distance:_distance
                }

                //当前点下一路段
                if(_isNextPoint){
                    _backResult.nextPoint = _object;
                    _isNextPoint = false;
                }

                //当前点路段
                if(nearPoint.routeFloorIndex == i && nearPoint.pointIndex == k){
                    _backResult.currentPoint = _object;
                    _isNextPoint = true;

                    var _d = Math.sqrt((_point1.x - nearPoint.point.x) * (_point1.x - nearPoint.point.x) + (_point1.y - nearPoint.point.y) * (_point1.y - nearPoint.point.y));

                    //全线段已经过的距离
                    _backResult.pastDistCount = _backResult.sumDistCount + _d;

                    //当前段剩余距离
                    _backResult.currentPoint.surDistance = _object.distance - _d;

                }

                _backResult.points.push(_object);

                //全程线段距离
                _backResult.sumDistCount += _distance;
            }

        }

        _backResult.surDistCount = _backResult.sumDistCount - _backResult.pastDistCount;

        return _backResult;

    }


    //获取两点之间角度
    $extend.getTwoPointAngle = function(point1, point2){

        if(point1.constructor != Array){
            point1 = [point1.x,point1.y];
        }
        if(point2.constructor != Array){
            point2 = [point2.x,point2.y];
        }

        var x1 = point1[0],
            y1 = point1[1],
            x2 = point2[0],
            y2 = point2[1];

        var x = Math.abs(x1 - x2),
            y = Math.abs(y1 - y2),
            z = Math.sqrt(x*x+y*y);

        var rotat = Math.round(Math.asin(y/z)/Math.PI*180);

        // 第一象限
        if (x2 >= x1 && y2 <= y1) {
            rotat = rotat;
        }
        // 第二象限
        else if (x2 <= x1 && y2 <= y1) {
            rotat = 180 - rotat;
        }
        // 第三象限
        else if (x2 <= x1 && y2 >= y1) {
            rotat = 180 + rotat;
        }
        // 第四象限
        else if(x2 >= x1 && y2 >= y1){
            rotat = 360 - rotat;
        }

        return rotat; //角度
    }


    //获取角度提示
    $extend.fn_getAngleTips = function(angle){

        var _icon = 'straight'; //默认直行
        var _tips = '沿当前路线直行';

        if(angle > 180){
            angle = angle - 360;
        }
        else if(angle < -180){
            angle = 360 - Math.abs(angle);
        }


        //直行
        if(angle > -22.5 && angle < 22.5){
            _icon = 'straight';
            _tips = '沿当前路线直行';

        }
        //右前方
        else if(angle > 22.5 && angle < 67.5){
            _icon = 'rightfront';
            _tips = '前方请走右前方路口';
        }
        //右转
        else if(angle > 67.5 && angle < 112.5){
            _icon = 'turnright';
            _tips = '前方请右转';
        }
        //右后方
        else if(angle > 112.5 && angle < 157.5){
            _icon = 'lowerright';
            _tips = '前方请走右下方路口';
        }
        //直行
        else if(angle > 157.5 && angle < -157.5){
            _icon = 'straight';
            _tips = '请面向路线方向直行';
        }
        //左后方
        else if(angle > -157.5 && angle < -112.5){
            _icon = 'lowerleft';
            _tips = '前方请走左下方路口';
        }
        //左转
        else if(angle > -112.5 && angle < -67.5){
            _icon = 'turnleft';
            _tips = '前方请左转';
        }
        //左前方
        else if(angle > -67.5 && angle < -22.5){
            _icon = 'leftfront';
            _tips = '前方请走左前方路口';
        }

        return {icon:_icon, text:_tips};

    }


    //计算虚拟终点坐标点
    $extend.fn_getPointOfIntersection = function(endPOI){

        if(Math.ceil(endPOI.CATEGORY_ID) <= 800 || endPOI.NAME == ''){
            return {x:endPOI.LABEL_X, y:endPOI.LABEL_Y};
        }

        var _lnglat = brtmap.CoordProjection.mercatorToLngLat(endPOI.LABEL_X, endPOI.LABEL_Y);
        var _point = $map.project(_lnglat);

        var _poi = $extend.queryMapFeatures(_point);

        if(_poi){

            var _result = $variable.$routeResult.completeResult._allRoutePartArray;

            var _onPoint, _offPoint;

            for(var i = 0; i < _result.length; i++){

                if(endPOI.FLOOR_NUMBER == _result[i].mapInfo.floorNumber){

                    var _route = _result[i].route;

                    for(var k = _route.length - 1; k >= 0 ; k--){

                        var _lnglat2 = { lng:_route[k][0], lat:_route[k][1] };

                        var _point2 = $map.project(_lnglat2);

                        var _poi2 = $extend.queryMapFeatures(_point2);

                        if(!_poi2) continue;

                        if(_poi2.POI_ID == endPOI.POI_ID){
                            _onPoint = _lnglat2;
                        }else{
                            _offPoint = _lnglat2;
                            break;
                        }

                    }

                }

            }


            if(_onPoint && _offPoint){

                var _endPoint = null;

                for(var _distance = 1000; _distance > 1;){

                    var _centerLng = (_onPoint.lng + _offPoint.lng) / 2,
                        _centerLat = (_onPoint.lat + _offPoint.lat) / 2;

                    var _lnglat2 = {lng:_centerLng, lat:_centerLat};

                    var _poi2 = $extend.queryMapFeatures($map.project(_lnglat2));

                    if(_poi2 && _poi2.POI_ID == endPOI.POI_ID){
                        _onPoint = _lnglat2;
                    }
                    else{
                        _offPoint = _lnglat2;
                    }

                    var _point1 = brtmap.CoordProjection.lngLatToMercator(_onPoint.lng, _onPoint.lat),
                        _point2 = brtmap.CoordProjection.lngLatToMercator(_offPoint.lng, _offPoint.lat);

                    _distance = Math.sqrt((_point1.x - _point2.x) * (_point1.x - _point2.x) + (_point1.y - _point2.y) * (_point1.y - _point2.y));

                    _endPoint = _point1;

                }

                return _endPoint;

            }

            return null;

        }

    };


    //设置定位图标旋转
	/*$extend.fn_RotateMarker = function(angle){

	 // var _angle = angle - $map.building.initAngle;
	 var _angle = Math.ceil(angle) - 97;

	 $marker.locationIcon.setRotate(_angle);

	 };
	 */

}

// 执行extend
_nav_extend();