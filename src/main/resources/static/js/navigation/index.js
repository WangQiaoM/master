


/*
 * 地图建筑配置
 */

// var _initBuildingID = buildingID = '00230021'; //'07550023'; //'00230021';
// var _initToken = 'caa0cb15378845ed829c781d509aa9ce'; //'caa0cb15378845ed829c781d509aa9ce';// '6f13e3d5e20e4e19922939a78f3b7b73';
// var _initFloorID = null; // '00230021F02'; //"07550023F01";

var $map = null;



/*
 * marker
 */

var $marker = {
	arrayIcon:[],
	selectedIcon:null,
	startIcon:null,
	endIcon:null,
	navEndIcon:null,
	locationIcon:null,
	poiArrIcon:[]
};

/*
 * init marker
 */
function _init_marker(){
	
	//定位点标记
	$marker.locationIcon = $symbol.Location({
		url:'/images/location_marker.png',
		size:0.8,
		offset:[0,-10],
		type:'map'
	},$map);
	$marker.arrayIcon.push($marker.locationIcon);
	
	
	//起点标记
	$marker.startIcon = new $symbol.Marker({
		url:'/images/start_marker.png',
		size:0.6,
		offset:[0,-35]
	},$map);
	$marker.arrayIcon.push($marker.startIcon);
	
	
	//终点标记
	$marker.endIcon = new $symbol.Marker({
		url:'/images/end_marker.png',
		size:0.6,
		offset:[0,-35]
	},$map);
	$marker.arrayIcon.push($marker.endIcon);
	
	
	//导航中的终点标记
	$marker.navEndIcon = new $symbol.Marker({
		url:'/images/mapnav/navEnd_marker.png',
		size:0.8,
		offset:[19,-40]
	},$map);
	$marker.arrayIcon.push($marker.navEndIcon);
	
	
	//选中poi标记
	$marker.selectedIcon = new $symbol.Marker({
		url:'/images/markered.png',
		size:0.6,
		offset:[0,-38]
	},$map);
	$marker.arrayIcon.push($marker.selectedIcon);
	
}



/*
 * init brtmap
 */

function _init_brtmap(){
	
	//初始化地图
// 	$map = new brtmap.TYMap({
// 	    container: 'brtmap',
// 	    buildingID: _initBuildingID,
// 		floorID:_initFloorID,
// //	    use3D:true,
// 	    center: [-74.50, 40],
// 	    pitch: 60,
// 	    bearing:60,
// 	    zoom: 9,
// 	    logoPosition: "bottom-right",
//
// //		_useFile: true,
// //		_apiHost: "http://files.brtbeacon.net", //http://files.brtbeacon.net",
// //		_apiRouteHost:"http://platalk.cn",
// //		_resourceRootDir: "map/custom/BrtMapResource/2.1.1",
// //		_vectorTileDir:"map/custom/BrtVectorTile/2.1.1"
// 	});

    $map = new brtmap.TYMap({
        container: 'brtmap',
        token:_initToken,
        buildingID: _initBuildingID,
        floorID:_initFloorID,
        //pitchWithRotate:false,
        use3D: true,
        pitch: 60,
        bearing:60,
        //zoom: 9,
        _apiRouteHost:"https://route.map.brtbeacon.com",
        logoPosition: "bottom-right"
        /*_apiHost: "http://platalk.cn",
        _resourceRootDir: "BrtMapResource",
        __ignoreToken: true*/
    });
	
	// mapready
	$map.on('mapready',function(){
		
		console.log('mapready -> $map ->', $map);
		
		//初始化 marker 标记
		_init_marker();


		//初始化 切换楼层列表
		$extend.fn_initFloorHtml($map.mapInfoArray);
		//选中楼层
		$extend.fn_selectedFloor(_initFloorID);
		
		$state.MAP_READY = true;
		
		$extend.mapReady();


		//app click跳转  或者 分享poi
		if($initMarkingPOI || $initSharePOI){
			
			//关闭自动切换楼层
			$state.AUTO_CHANGE_FLOOR = false;
			
			//延迟处理
			window.setTimeout(function(){
			
				//$initMarkingPOI
				if($initMarkingPOI){
					$extend.fn_showPOIInfoControl($initMarkingPOI);
				}
				//$initSharePOI
				else{

					//显示 app下载提示
					//$index.$appDownloadTips.show();
					
					$index.$toThisPlace.showControl().off().on('click','a',function(){
						
						//开启自动切换楼层
						$state.AUTO_CHANGE_FLOOR = true;
						
						//隐藏app下载提示
						//$index.$appDownloadTips.hide();
						
						$extend.fn_setNavStartAndEndPoint($initSharePOI,'end');
						
					});
					
					$marker.selectedIcon.setLnglat([$initSharePOI.LABEL_X, $initSharePOI.LABEL_Y]);
				}
				
			},200);
			
		}
		
		
	});
	
	
	// floorstart
	$map.on('floorstart',function(){
		
		//console.log('floorstart -> $map ->', $map);
		
		//隐藏所有自定义标注
		for(var i = 0; i < $marker.arrayIcon.length; i++){
			$marker.arrayIcon[i].hide();
		}
		
		if($state.MAP_READY){
			$marker.selectedIcon.empty();
			$index.$poiInfo.hideControl();
		}
		
	});
	
	
	// floorend
	$map.on('floorend',function(evt){

        $('div.head-container').find('.r-name').find('.fName').text(evt.mapInfo.floorName);

		//设置文字图标 随 缩放级别 而缩放
        var baseZoom = $map._baseZoom;
        $map.setLabelLayout("text-size", {stops: [[baseZoom, 10], [baseZoom + 0.5, 12], [baseZoom + 1, 13], [baseZoom + 1.5, 14], [baseZoom + 2, 15]]});
        $map.setFacilityLayout("icon-size", {stops: [[baseZoom - 1, 0.4], [baseZoom, 0.4], [baseZoom + 1, 0.5], [baseZoom + 2, 0.6], [baseZoom + 3, 0.7]]});

        //$map.setMaxBounds($map.currentMapInfo.getBounds(0.2));
		
		//console.log('floorend -> $map ->', $map);
		
		//显示所有自定义标注
		for(var i = 0; i < $marker.arrayIcon.length; i++){
			if($marker.arrayIcon[i]._floorID == $map._targetFloorID){
				$marker.arrayIcon[i].show();
			}
		}
		
		LoadingLayer.hide();
		
		//多楼层
		if($state.IS_SEARCH_ING && !$index.$startEndPoint.hasClass('show')){
			$extend.fn_showFloorAllMarker($map._targetFloorID);
		}else{
			$extend.fn_removePoiMarker();
		}


        //设置正北偏移角度(惯性导航需求)
        if($location){
            $location.setInertiaConfig({
                initAngle:$map.building.initAngle
            });
        }

		
	});


	// click
	$map.on('click',function(e){

		console.log(brtmap.CoordProjection.lngLatToMercator(e.lngLat.lng, e.lngLat.lat));

		 //用户导航中
		 if($state.USER_NAVING){


		 	var point = brtmap.CoordProjection.lngLatToMercator(e.lngLat.lng, e.lngLat.lat);
		 		point.floor = $map.currentMapInfo.floorNumber;

		 	$extend.fn_SetLocationPoint(point);

		 	return;
		 }


		//地图选点ing
		if($state.MAP_SELECT_POINT){
			
			$extend.fn_clickQueryNearbyPOI(e.lngLat);
			
			return;
		}


		//禁止地图点击
		if($state.IS_SEARCH_ING || $state.USER_NAVING || !$state.MAP_CLICK) return;


		// 显示 poi详情
		var poi = $extend.POIFormat($extend.queryMapFeatures(e.point));
		
		if(!poi || ($variable.$startPOI && $variable.$startPOI.POI_ID == poi.POI_ID)
			|| ($variable.$endPOI && $variable.$endPOI.POI_ID == poi.POI_ID)
			|| ($index.$poiInfo.data('poiInfo') && $index.$poiInfo.data('poiInfo').POI_ID == poi.POI_ID)
			|| (Math.ceil(poi.CATEGORY_ID) <= 800 || poi.NAME == ''))
		{
			return;
		}
		
		$extend.fn_showPOIInfoControl(poi);
		
		if($state.IS_SEARCH_ING){
			$index.$poiInfo.find('.close').hide().siblings('.btn-box').find('.btn-back').show();
		}else{
			$index.$poiInfo.find('.close').show().siblings('.btn-box').find('.btn-back').hide();
		}
		
	});
	
	
}

//执行 index brtmap
_init_brtmap();



/*
 * init index function
 */

function _init_index_container(){
	
	//首页搜索框点击
	$index.$search.on('click',function(){
		location.hash = 'search';
	})
	/*close*/
	.on('click','.close',function(e){
		e.stopPropagation();
		$extend.fn_resetInitMap();
	});
	
	
	
	//首页楼层切换
	$index.$floor
		/*显示隐藏楼层列表*/
		.on('click',function(e){
			e.stopPropagation();
			$(this).find('.ul').toggleClass('show');
		})
		/*楼层点击切换*/
		.on('click','.ul li',function(){
			
			var floorID = $(this).attr('floor-id');
			
			//切换楼层
			$extend.fn_setFloor(floorID);
			
			$(this).addClass('active').siblings().removeClass('active');
		});
	
	
	
	//放大缩小
	$index.$zoom
		.on('click','.zoomIn',function(){
			$map.zoomIn();
		})
		.on('click','.zoomOut',function(){
			$map.zoomOut();
		});
	
	
	//我的位置
	$index.$location
		.on('click',function(){

			if($state.USER_LOCATION){
				
				function _callee(){
					
					var _lnglat = null;
					
					if($state.USER_NAVING){
						
						if($variable.$nearPoint)
							_lnglat = brtmap.CoordProjection.mercatorToLngLat($variable.$nearPoint.x, $variable.$nearPoint.y);
						else{
							_lnglat = brtmap.CoordProjection.mercatorToLngLat($variable.$locationPoint.x, $variable.$locationPoint.y);
						}
						
					}
					else{

						if($variable.$startPOI&&$variable.$endPOI){
							return;
						}
						
						var poiInfo = $extend.getLocationPOI();
						
						$index.$locationPOI.showControl().find('.right').find('p').find('span').text(poiInfo.NAME + " " + poiInfo.FLOOR_NAME);
						
						_lnglat = brtmap.CoordProjection.mercatorToLngLat(poiInfo.LABEL_X, poiInfo.LABEL_Y);
						
					}
					
					var _pitch = $map.getPitch();
					
					$map.easeTo({
						center:_lnglat,
						zoom:18,
						pitch:_pitch <= 30 ? _pitch : 30
					});
					
				}

				if($variable.$locationPoint.floor != $map.currentMapInfo.floorNumber){
					
					var _floorInfo = $extend.queryFloorInfo($variable.$locationPoint.floor);
					
					$extend.fn_setFloor(_floorInfo.mapID, function(){
						_callee();
					});
					
				}
				else{
					_callee();
				}
				
			}else{

                if($variable.$startPOI&&$variable.$endPOI){
                    return;
                }

				$extend.fn_locationTips();
			}
			
		});
	
	
	
	//帮助按钮
	$index.$help
		.on('click',function(){
			$index.$helpContainer.addClass('show');
			$('.load-img').each(function(){
				var _src = $(this).attr('data-src');
				$(this).attr('src',_src);
			});
		});
	
	//帮助页 返回按钮
	$index.$helpContainer
		.on('click','.head .back',function(){
			$index.$helpContainer.removeClass('show');
		});
	
	
	
	//我的位置POI
	$index.$locationPOI
		/*关闭*/
		.on('click','.close',function(){
			$index.$locationPOI.hideControl();
		})
		/*分享*/
		.on('click','.share',function(){
            var _poi = $extend.getLocationPOI();
            function_share(_poi);
            console.log('分享我的位置');
		});
	
	
	//poi详情
	$index.$poiInfo
		/*关闭*/
		.on('click','.close',function(){
			$index.$poiInfo.hideControl(function(){
				$marker.selectedIcon.empty();
				
				if($index.$startEndPoint.hasClass('show')){
					$index.$startNav.showControl();
				}
				
			});
		})
		/*返回*/
		.on('click','.btn-back',function(){
			
			if($index.$allPoiList.hasClass('view')){
				$index.$allPoiList.showControl();
			}
			else{
				location.hash = 'search';
			}
			
			$marker.selectedIcon.empty();
			
		})
		/*到这去*/
		.on('click','.goBtn',function(){
			
			var poiInfo = $index.$poiInfo.data('poiInfo');
			
			$extend.fn_setNavStartAndEndPoint(poiInfo,'end');
			
		})
		/*设为起点*/
		.on('click','.btn-start',function(){
			
			var poiInfo = $index.$poiInfo.data('poiInfo');
			
			$extend.fn_setNavStartAndEndPoint(poiInfo,'start');
			
		})
		/*设为终点*/
		.on('click','.btn-end',function(){
			
			var poiInfo = $index.$poiInfo.data('poiInfo');
			
			$extend.fn_setNavStartAndEndPoint(poiInfo,'end');
			
		})
		/*分享位置*/
		.on('click','.btn-share',function(){
			var _poi = $index.$poiInfo.data('poiInfo');
            function_share(_poi);
			console.log('分享poi位置');
		});
	
	
	
	//顶部 选择起点终点模块
	$index.$startEndPoint
		/*返回*/
		.on('click','.btn-back .btn',function(){
			
			$index.$startEndPoint.removeClass('show');
			
			if($variable.$POI_FID_Cache[$map._targetFloorID]){
				$extend.fn_showFloorAllMarker($map._targetFloorID);
			}
			else{
				var poiInfo = $index.$poiInfo.data('poiInfo');
			
				if(poiInfo && (($variable.$startPOI && $variable.$startPOI.POI_ID == poiInfo.POI_ID) || ($variable.$endPOI && $variable.$endPOI.POI_ID == poiInfo.POI_ID))){
					
					if(poiInfo.FLOOR_ID != $map._targetFloorID){
						$extend.fn_setFloor(poiInfo.FLOOR_ID,function(){
							$extend.fn_showPOIInfoControl(poiInfo);
						});
					}else{
						$extend.fn_showPOIInfoControl(poiInfo);
					}
					
				}
				else{
					$marker.selectedIcon.empty();
					
					$index.$poiInfo.hideControl();
					$index.$startNav.hideControl();
				}
			}
			

			$marker.startIcon.empty();
			$marker.endIcon.empty();
			$map.resetRoute();
			
			$variable.$startPOI = null;
			$variable.$endPOI = null;
			
			$index.$startEndPoint.find('.show-box').find('.start-box').find('input').val('');
			$index.$startEndPoint.find('.show-box').find('.end-box').find('input').val('');
			
			$index.$queryStartFloor.hide();
			$index.$queryEndFloor.hide();

			
		})
		/*切换*/
		.on('click','.btn-change .btn',function(){
			$extend.fn_changeStartEndPoint();
		})
		/*选择起点*/
		.on('click','.show-box .start-box',function(){
			$extend.fn_navSelectPoint('start');
		})
		/*选择终点*/
		.on('click','.show-box .end-box',function(){
			$extend.fn_navSelectPoint('end');
		});
	
	
	
	//开始导航
	$index.$startNav
		.on('click','.start-btn',function(){
			
			if(!$variable.$startPOI){
				AlertLayer({
					content:"<p class='alertLayer-tips-box'><img src='/images/start_marker.png' />请选择起点位置</p>",
					button:[
						{
							name:"取消",
							callback:function(){
								
							}
						},
						{
							name:"去选择",
							callback:function(){
								$extend.fn_navSelectPoint('start');
							}
						}
					]
				});
			}
			else if(!$variable.$endPOI){
				AlertLayer({
					content:"<p class='alertLayer-tips-box'><img src='/images/end_marker.png' />请选择终点位置</p>",
					button:[
						{
							name:"取消",
							callback:function(){}
						},
						{
							name:"去选择",
							callback:function(){
								$extend.fn_navSelectPoint('end');
							}
						}
					]
				});
			}
			else{

				//$state.USER_LOCATION = true;

				if(!$state.USER_LOCATION){
                    AlertLayer({
                        content:"<p>您未到达该建筑现场，请先前往该建筑内!</p>",
                        button:[
                            {
                                name:"知道了",
                                callback:function(){}
                            }
                        ]
                    });
                    return;
				}

				console.log('步行导航');
				
				$index.$startEndPoint.removeClass('show');
				$index.$navingTopTips.addClass('show');
				
				$index.$navingBomButton.showControl();
				$index.$navingBomButton.find('.close').show();
				$index.$navingBomButton.find('.btn-box').find('.b-overview').show().siblings().hide();
				
				$index.$floor.hide();
				$index.$search.hide();
				
				$index.$queryStartFloor.hide();
				$index.$queryEndFloor.hide();
				
				$marker.endIcon.empty();
				$marker.navEndIcon.setLnglat([$variable.$endPoint.x, $variable.$endPoint.y], $variable.$endPOI.FLOOR_ID);
				
				
				function _callee(){
					
					var _lnglat = brtmap.CoordProjection.mercatorToLngLat($variable.$startPoint.x, $variable.$startPoint.y);
				
					$map.easeTo({
						center:_lnglat,
						zoom:20,
						pitch:0
					});
					
					window.setTimeout(function(){
						
						//开启导航模式
						$state.USER_NAVING = true;
						//开启自动导航
						$state.AUTO_NAV = true;
						//开启自动切换楼层
						$state.AUTO_CHANGE_FLOOR = true;
						//禁止地图点击
						$state.MAP_CLICK = false;
						
						$extend.fn_SetLocationPoint($variable.$startPoint);
						
					},500);
				}
				
				
				if($variable.$startPoint.floor != $map.currentMapInfo.floorNumber){
					
					$extend.fn_setFloor($variable.$startPOI.FLOOR_ID, function(){
						_callee();
					})
					
				}else{
					_callee();
				}
				
				
			}
			
		});
	
	
	
	//查看起点层
	$index.$queryStartFloor.on('click',function(){
		
		$extend.fn_overviewRoute($variable.$startPOI.FLOOR_ID);
		
		$index.$queryStartFloor.hide();
		$index.$queryEndFloor.show();
		
	});
	//查看终点层
	$index.$queryEndFloor.on('click',function(){
		
		$extend.fn_overviewRoute($variable.$endPOI.FLOOR_ID);
		
		$index.$queryEndFloor.hide();
		$index.$queryStartFloor.show();
		
	});
	
	
	
	//导航中，底部 操作按钮
	$index.$navingBomButton
		/*关闭*/
		.on('click','.close',function(){
			
			$extend.fn_stopNavResetRoute();
			
		})
		/*全览路线*/
		.on('click','.btn-box .b-overview',function(){
			
			if($index.$navingBomButton.hasClass('manyFloor')){
				$(this).toggleClass('many');
			}
			else{
				$extend.fn_overviewRoute();
			}
			
		})
		/*继续导航*/
		.on('click','.btn-box .b-continue',function(){
			
			var that = this;
			
			$index.$navingBomButton.find('.btn-box').find('.b-overview').show().siblings().hide();
			
			
			function _callee(){
					
				var _lnglat = brtmap.CoordProjection.mercatorToLngLat($variable.$locationPoint.x, $variable.$locationPoint.y);
				
				$map.setMaxBounds($map.currentMapInfo.getBounds(0.1));
				
				//暂时关闭导航
				$state.USER_NAVING = false;
				
				$map.easeTo({
					center:_lnglat,
					zoom:18,
					pitch:0
				});
				
				window.setTimeout(function(){
					
					if($(that).is(":hidden")){
						//开启自动导航
						$state.AUTO_NAV = true;
					}
					
					//开启导航模式
					$state.USER_NAVING = true;
					
					$extend.fn_SetLocationPoint($variable.$locationPoint);
					
				},500);
				
			}
			
			if($variable.$locationPoint.floor != $map.currentMapInfo.floorNumber){
				
				var mapInfo = $extend.queryFloorInfo($variable.$locationPoint.floor);
				
				$extend.fn_setFloor(mapInfo.mapID, function(){
					_callee();
				})
				
			}else{
				_callee();
			}
			
		})
		/*返回地图*/
		.on('click','.btn-box .b-backmap',function(){
			
			$index.$navOverTopTips.removeClass('show');
			
			$index.$navingBomButton.hideControl();
			
			$index.$startEndPoint.find('.item-box').find('input').val('');
			
			$extend.fn_resetInitMap();
			
		})
		/*查看起点层*/
		.on('click','.b-overview .start',function(e){
			$extend.fn_overviewRoute($variable.$startPOI.FLOOR_ID);
		})
		/*查看终点层*/
		.on('click','.b-overview .end',function(e){
			$extend.fn_overviewRoute($variable.$endPOI.FLOOR_ID);
		});
	
	
	
	//导航中，顶部方向提示
	$index.$navingTopTips
		/*收缩*/
		.on('click','.bom-box',function(){
			$index.$navingTopTips.toggleClass('hideTop');
		})
		/*方向校准*/
		.on('click','.top-box .btn',function(){
			console.log('方向校准')
		});
	
	
	//多个poi列表点击交互
	$index.$allPoiList
		/*返回*/
		.on('click','.head-box .back',function(){
			location.hash = 'search';
		})
		/*标题头*/
		.on('click','.head-box .title',function(){
			$index.$allPoiList.find('.content-box').toggleClass('hide');
		})
		/*li*/
		.on('click','.content-box li',function(){
			
			var poiID = $(this).attr('poi-id');
			
			var poiInfo = $variable.$POI_Cache[poiID];
			
			$extend.fn_showPOIInfoControl(poiInfo);
			
		})
		/*到这去*/
		.on('click','.content-box li .btn',function(e){
			e.stopPropagation();
			
			var poiID = $(this).parent().attr('poi-id');
			
			var poiInfo = $variable.$POI_Cache[poiID];
			
			$index.$poiInfo.data('poiInfo',poiInfo);
			
			$extend.fn_setNavStartAndEndPoint(poiInfo,'end');
			
		})
	
	
	//地图选点
	$index.$selectPointList
		/*返回*/
		.on('click','.head-box .back',function(){
			
			//开启地图搜索模式
			$state.IS_NAV_SEARCH_SHOW = true;

			$index.$startEndPoint.addClass('show');
			
			$index.$startNav.showControl();
			
			$index.$search.show();

			$('#map-select-point-tips').hide();

			location.hash = 'search';
			
		})
		/*标题头*/
		.on('click','.head-box .title',function(){
			$index.$selectPointList.find('.content-box').toggleClass('hide');
		})
		/*列表 li*/
		.on('click','.content-box li',function(){
			
			var _poiID = $(this).attr('poi-id');
			
			var _poiInfo = $variable.$POI_Cache3[_poiID];
			
			$extend.fn_setNavStartAndEndPoint(_poiInfo,$variable.$navSelectPointType);

			$index.$search.show();
			
			$('#map-select-point-tips').hide();

			//关闭地图选点模式
			$state.MAP_SELECT_POINT = false;
			
		});
	
}



//执行 index function
_init_index_container();



/*
 * extend function
 */

function _index_extend(){
	
	//根据floorID 选中楼层
	$extend.fn_selectedFloor = function(floorID){

		var $box;

		if(floorID){
            $box = $index.$floor.find('.ul').find('li[floor-id="'+floorID+'"]');
		}
		else{
			$box = $index.$floor.find('.ul').find('li').eq(0);
		}

		console.log($box);

        $box.addClass('active').siblings().removeClass('active');
        $index.$floor.find('.box').text($box.text());
	};
	
	
	//切换楼层
	$extend.fn_setFloor = function(floorID, callback){
		
		$map.setFloor(floorID,function(){
			
			callback && callback();
			
		});
		
		$extend.fn_selectedFloor(floorID);
		
	};
	
	
	//初始化楼层切换html列表
	$extend.fn_initFloorHtml = function(floorList){
		
		$index.$floor.find('.ul').empty();
		
		var _html = '';
		
		for(var i = 0; i < floorList.length; i++){

			_html += "<li floor-id='"+floorList[i].mapID+"'>"+floorList[i].floorName+"</li>";
			
		}

		console.log(_html);

		$index.$floor.find('.ul').empty().append(_html);
		
		//搜索页的
		$search.$head.find('.floor-box').find('.ul').append(_html);
		
	};
	
	
	// 展示poi详情
	$extend.fn_showPOIInfoControl = function(poiInfo){

		console.log("选中poi",poiInfo);
		
		if(!poiInfo || Math.ceil(poiInfo.CATEGORY_ID) <= 800 || poiInfo.NAME == '') return;
			
		$index.$poiInfo.data('poiInfo',poiInfo).showControl(function(){

            var _nameHtml = poiInfo.NAME ? poiInfo.NAME : poiInfo.POI_ID;
            $index.$poiInfo.find('.info-box')
                .find('.p1').html(_nameHtml);

			$index.$poiInfo.find('.info-box').find('.p3').hide();

		});
		
		var _lnglat = brtmap.CoordProjection.mercatorToLngLat(poiInfo.LABEL_X, poiInfo.LABEL_Y);
		
		var _pitch = $map.getPitch();
		
		$map.easeTo({
			center:_lnglat,
			zoom:18,
			pitch:_pitch <= 30 ? _pitch : 30
		});
		
		$marker.selectedIcon.zIndex().setLnglat([poiInfo.LABEL_X,poiInfo.LABEL_Y], poiInfo.FLOOR_ID);
		
		//已定位
		if($state.USER_LOCATION){
			
			var _endPoint = {
				x:poiInfo.LABEL_X,
				y:poiInfo.LABEL_Y,
				floor:poiInfo.FLOOR_NUMBER
			};
			
			///
			$symbol.getDistanceOnRoute($variable.$locationPoint, _endPoint, function(distance){
				
				var _distance = Math.floor(distance), str = "";
	
				if($variable.$locationPoint.floor < _endPoint.floor){
					str = "需上行至"+poiInfo.FLOOR_NAME+"层";
				}
				else if($variable.$locationPoint.floor > _endPoint.floor){
					str = "需下行至"+poiInfo.FLOOR_NAME+"层";
				}
			
				$index.$poiInfo.find('.info-box')
					.find('.p2').text("距您"+_distance+"米" + ( str == '' ? '' : ', ' + str ));
				
			},$map);
			
		}else{
			$index.$poiInfo.find('.info-box')
					.find('.p2').text('');
		}
		
	};
	
	
	//展示楼层里多个poi标注
	$extend.fn_showFloorAllMarker = function(floorID){
		
		//删除所有marker
		$extend.fn_removePoiMarker();
		
		var floorInfo = $variable.$POI_FID_Cache[floorID];
		
		if(!floorInfo) return;
		
		var html = '';
		
		for(var i = 0; i < floorInfo.data.length; i++){
			
			var item = floorInfo.data[i];
			
			html += "<li poi-id='"+item.POI_ID+"'>\
						<div class='text disabled'>\
							<p class='p1 disabled'>"+ item.NAME + "</p>\
						</div>\
						<div class='btn'>到这去</div>\
					</li>";
			
			
			//添加marker标记
			$extend.fn_addPoiMarker(item);
			
			
		}
		
		$index.$allPoiList.addClass('view').showControl();
		
		$index.$allPoiList.find('.content-box').find('ul').empty().append(html);
		
		$index.$allPoiList.find('.head-box').find('.title').find('.b1').text(floorInfo.data.length).siblings('.b2').text(floorInfo.floorName);
		
		$index.$poiInfo.find('.close').hide().siblings('.btn-box').find('.btn-back').show();
		
		var _pitch = $map.getPitch();


		if (floorInfo.data.length==1){
            var _lnglat = brtmap.CoordProjection.mercatorToLngLat(floorInfo.data[0].LABEL_X, floorInfo.data[0].LABEL_Y);
            $map.easeTo({
            	center:_lnglat,
                zoom:18,
                pitch:_pitch <= 30 ? _pitch : 30
            });
		}else {
            $map.easeTo({
                zoom:17,
                pitch:_pitch <= 30 ? _pitch : 30
            });
		}

	};
	
	
	//添加marker标记
	$extend.fn_addPoiMarker = function(poiInfo){
		
		var _lnglat = brtmap.CoordProjection.mercatorToLngLat(poiInfo.LABEL_X, poiInfo.LABEL_Y);
		
		var _marker = new $symbol.Marker({
			url:'/images/marker.png',
			size:0.8,
			offset:[0,-25],
			lnglat:[_lnglat.lng, _lnglat.lat]
		},$map);
		
		_marker._poiID = poiInfo.POI_ID;
		
		_marker.click(function(e){
			
			var poiInfo = $variable.$POI_Cache[this._poiID];
			
			$extend.fn_showPOIInfoControl(poiInfo);
			
		});
		
		$marker.poiArrIcon.push(_marker);
		
	};
	
	
	//删除所有marker标记
	$extend.fn_removePoiMarker = function(){
		for(var i = 0; i < $marker.poiArrIcon.length; i++){
			$marker.poiArrIcon[i].remove();
		}
		$marker.poiArrIcon = [];
	};
	
	
	//获取定位点的poi详情
	$extend.getLocationPOI = function(){
		
		var _lnglat = brtmap.CoordProjection.mercatorToLngLat($variable.$locationPoint.x, $variable.$locationPoint.y);
		var _point = $map.project(_lnglat);
		
		var poi = null;
		
		if($variable.$locationPoint.floor == $map.currentMapInfo.floorNumber){
			poi = $extend.POIFormat($extend.queryMapFeatures(_point));
		}

		if(poi && (Math.ceil(poi.CATEGORY_ID) <= 800 || poi.NAME == '')){
			poi = null;
		}

		if(!poi){
			
			var _floorInfo = $extend.queryFloorInfo($variable.$locationPoint.floor);
			
			poi = {
				NAME:'',
				POI_ID:'location',
				FLOOR_ID:_floorInfo.mapID,
				FLOOR_NAME:_floorInfo.floorName,
				FLOOR_NUMBER:_floorInfo.floorNumber
			};
			
		}
		
		poi.NAME = poi.NAME == '' ? '无名地址' : poi.NAME;
		poi.LABEL_X = $variable.$locationPoint.x;
		poi.LABEL_Y = $variable.$locationPoint.y;
		poi.CATEGORY_ID = '999999';
		
		return poi;
		
	};
	
	
	
	// 根据楼层索引查询楼层信息
	$extend.queryFloorInfo = function(index){
		
		for(var i = 0; i < $map.mapInfoArray.length; i++){
			
			if($map.mapInfoArray[i].floorNumber == index){
				return $map.mapInfoArray[i];
			}
			
		}
		
		return null;
		
	};
	
	
	// 格式化 poi信息 
	$extend.POIFormat = function(feature){
		
		if(!feature) return null;
		
		var _floorInfo = $extend.queryFloorInfo(feature.floor);
		
		if(_floorInfo){
			
			return  {
				NAME:feature.NAME,
				POI_ID:feature.POI_ID,
				CATEGORY_ID:feature.CATEGORY_ID,
				LABEL_X:feature.LABEL_X,
				LABEL_Y:feature.LABEL_Y,
				FLOOR_NAME:_floorInfo.floorName,
				FLOOR_NUMBER:_floorInfo.floorNumber,
				FLOOR_ID:_floorInfo.mapID
			}
			
		}
		
		return null;
		
	};
	
	
	//point 查询地图数据
	$extend.queryMapFeatures = function(point,layers){
		
		var features = $map.queryRenderedFeatures(point);

		//console.log("features",features);

		for(var i = 0; i < features.length; i++){
			
			var _layer = features[i].layer;
			
			if(_layer.id.indexOf('facility') > -1 || _layer.id.indexOf('asset') > -1 || _layer.id.indexOf('room') > -1){
				
				return features[i].properties;
				
			}
			
		}
		
		return null;
		
	};
	
	
	//判断起点与终点是否相同
	$extend.fn_isStartEndEqual = function(startPOI, endPOI){
		
		if(startPOI && startPOI.POI_ID== endPOI.POI_ID && startPOI.LABEL_X == endPOI.LABEL_X){
			return true;
        }
		
		return false;
		
	};
	
	
	// 设置起点终点
	$extend.fn_setNavStartAndEndPoint = function(poiInfo, type){
		
		$extend.fn_removePoiMarker();
		
		var _$start = $index.$startEndPoint.find('.show-box').find('.start-box'),
			_$end = $index.$startEndPoint.find('.show-box').find('.end-box');
		
		function _setStartCallee(poi){
			
			_$start.find('input').val(poi.NAME + " " + poi.FLOOR_NAME);
			
			$variable.$startPOI = poi;
			
			$variable.$startPoint = {
				x:poi.LABEL_X,
				y:poi.LABEL_Y,
				floor:poi.FLOOR_NUMBER
			};
			
			$marker.startIcon.setLnglat([poi.LABEL_X, poi.LABEL_Y], poi.FLOOR_ID);
			
			
			if($extend.fn_isStartEndEqual($variable.$endPOI, poi)){
				_$end.find('input').val('');
				$variable.$endPOI = null;
				
				$marker.endIcon.empty();
			}
		}
		
		
		function _setEndCallee(poi){
			
			_$end.find('input').val(poi.NAME + " " + poi.FLOOR_NAME);
			
			$variable.$endPOI = poi;
			
			$variable.$endPoint = {
				x:poi.LABEL_X,
				y:poi.LABEL_Y,
				floor:poi.FLOOR_NUMBER
			};
			
			$marker.endIcon.setLnglat([poi.LABEL_X, poi.LABEL_Y], poi.FLOOR_ID);
			
			
			if($extend.fn_isStartEndEqual($variable.$startPOI, poi)){
				_$start.find('input').val('');
				$variable.$startPOI = null;
				
				$marker.startIcon.empty();
			}
		}
		
		
		//设置起点
		if(type == 'start'){
			_setStartCallee(poiInfo);
		}
		//设置终点
		else if(type == 'end'){
			
			if($state.USER_LOCATION && !$variable.$startPOI){
				
				var _poiInfo = $extend.getLocationPOI();
					_poiInfo.NAME = '我的位置';
				
				_setStartCallee(_poiInfo);
				
			}
			
			_setEndCallee(poiInfo);
			
		}
		
		var _lnglat = brtmap.CoordProjection.mercatorToLngLat(poiInfo.LABEL_X, poiInfo.LABEL_Y);
		
		var _pitch = $map.getPitch();
		
		$map.easeTo({
			center:_lnglat,
			zoom:18,
			pitch:_pitch <= 30 ? _pitch : 30
		});
		
		
		//隐藏选中标记
		$marker.selectedIcon.empty();
		
		//显示开始导航按钮
		$index.$startNav.showControl();
		
		//显示
		$index.$startEndPoint.addClass('show');
		
		//选择起点终点的时候 关闭导航中自动切换楼层
		$state.AUTO_CHANGE_FLOOR = false;
		
		//规划路径
		$extend.fn_requestRoute();
		
	};
	
	
	// 切换起点终点
	$extend.fn_changeStartEndPoint = function(){
		
		var _startPOI = $variable.$startPOI,
			_endPOI = $variable.$endPOI,
			
			_startPoint = $variable.$startPoint,
			_endPoint = $variable.$endPoint;
			
		var _$start = $index.$startEndPoint.find('.show-box').find('.start-box'),
			_$end = $index.$startEndPoint.find('.show-box').find('.end-box');
		
		
		$variable.$startPOI = _endPOI;
		$variable.$endPOI = _startPOI;
		
		$variable.$startPoint = _endPoint;
		$variable.$endPoint = _startPoint;
		
		if($variable.$startPOI){
			_$start.find('input').val($variable.$startPOI.NAME + " " + $variable.$startPOI.FLOOR_NAME);
			$marker.startIcon.setLnglat([$variable.$startPoint.x, $variable.$startPoint.y], $variable.$startPOI.FLOOR_ID);
		}else{
			_$start.find('input').val('');
			$marker.startIcon.empty();
		}
		
		if($variable.$endPOI){
			_$end.find('input').val($variable.$endPOI.NAME + " " + $variable.$endPOI.FLOOR_NAME);
			$marker.endIcon.setLnglat([$variable.$endPoint.x, $variable.$endPoint.y], $variable.$endPOI.FLOOR_ID);
		}else{
			_$end.find('input').val('');
			$marker.endIcon.empty();
		}
		
		
		//规划路径
		$extend.fn_requestRoute();
		
	};
	
	
	// 规划路径
	$extend.fn_requestRoute = function(){
		
		//已设置起点终点
		if($variable.$startPOI && $variable.$endPOI){
			
			//起点终点不在同楼层
			if($variable.$startPOI.FLOOR_ID != $variable.$endPOI.FLOOR_ID){
				
				if($variable.$startPOI.FLOOR_ID == $map._targetFloorID){
					$index.$queryEndFloor.show();
					$index.$queryStartFloor.hide();
				}
				else{
					$index.$queryEndFloor.hide();
					$index.$queryStartFloor.show();
				}
				
				$index.$navingBomButton.addClass('manyFloor');
				
			}
			else{
				$index.$navingBomButton.removeClass('manyFloor');
			}
			
			
			//切换开始导航按钮ui
			$index.$startNav.removeClass('off').find('.info-box')
				.find('.p1').text($variable.$endPOI.NAME + " " + $variable.$endPOI.FLOOR_NAME + '层');
			
			
			//经纬度转换坐标
			var _startPoint = brtmap.CoordProjection.mercatorToLngLat($variable.$startPoint.x, $variable.$startPoint.y),
				_endPoint = brtmap.CoordProjection.mercatorToLngLat($variable.$endPoint.x, $variable.$endPoint.y);
			
				_startPoint.floor = $variable.$startPoint.floor;
				_endPoint.floor = $variable.$endPoint.floor;
			
			
			//规划路径
			$symbol.Route(_startPoint, _endPoint, function(result){
				
				var _CountDistance = 0, _routeResult = result.completeResult._allRoutePartArray;
			
				for(var i = 0; i < _routeResult.length; i++){
					
					var _route = _routeResult[i].route;
					
					for(var k = 0, len = _route.length; k < len - 1; k++){
						
						var _point1 = brtmap.CoordProjection.lngLatToMercator(_route[k][0], _route[k][1]),
							_point2 = brtmap.CoordProjection.lngLatToMercator(_route[k+1][0], _route[k+1][1]);
						
						var _d = Math.sqrt((_point1.x - _point2.x) * (_point1.x - _point2.x) + (_point1.y - _point2.y) * (_point1.y - _point2.y));
						
						_CountDistance += _d;
					}
					
				}
				
				var _distance = Math.floor(_CountDistance), str = "";

				if(_startPoint.floor < _endPoint.floor){
					str = "需上行至"+$variable.$endPOI.FLOOR_NAME+"层";
				}
				else if(_startPoint.floor > _endPoint.floor){
					str = "需下行至"+$variable.$endPOI.FLOOR_NAME+"层";
				}
				
				//已定位
				if($state.USER_LOCATION){
					
					var text = "距您"+_distance+"米" + ( str == '' ? '' : ', ' + str );
					
					if(_distance < 5){
						text = '您在终点附近！';
					}
					
					$index.$startNav.find('.info-box').find('.p2').text(text);
					
				}else{
					$index.$startNav.find('.info-box').find('.p2').text("全长"+_distance+"米" + ( str == '' ? '' : ', ' + str ));
				}
				
			}, $map);
			
			
		}else{
			//切换开始导航按钮ui
			$index.$startNav.addClass('off');
			//清除路线
			$map.resetRoute();
		}
		
	};
	
	
	//导航选点
	$extend.fn_navSelectPoint = function(type){
		
		if(type == 'start'){
			$variable.$navSelectPointType = 'start';
			$variable.$navSelectPointText = '选为起点';
		}
		else{
			$variable.$navSelectPointType = 'end';
			$variable.$navSelectPointText = '选为终点';
		}
		
		//开启导航搜索模式
		$state.IS_NAV_SEARCH_SHOW = true;
		
		location.hash = 'search';
		
	};
	
	
	//地图选点搜索
	$extend.fn_clickQueryNearbyPOI = function(lnglat,radius){
		
		radius = radius || 20;
		
		var _point = brtmap.CoordProjection.lngLatToMercator(lnglat.lng, lnglat.lat);
		
		var _lnglat1 = brtmap.CoordProjection.mercatorToLngLat(_point.x - radius, _point.y - radius),
			_lnglat2 = brtmap.CoordProjection.mercatorToLngLat(_point.x + radius, _point.y + radius);
		
		var _point1 = $map.project(_lnglat1),
			_point2 = $map.project(_lnglat2);
		
		var _bbox = [[_point1.x, _point1.y], [_point2.x, _point2.y]];


		var features = $map.queryRenderedFeatures(_bbox), _arrayPOI = [];
		
		for(var i = 0; i < features.length; i++){
			
			var _layer = features[i].layer;
			
			if(_layer.id.indexOf('asset') > -1 || _layer.id.indexOf('room') > -1){
				
				if(Math.ceil(features[i].properties.CATEGORY_ID) > 800 && features[i].properties.NAME != ''){
					_arrayPOI[features[i].properties.POI_ID] = features[i].properties;
				}
				
			}
			
		}
		
		
		$variable.$POI_Cache3 = [];
		
		var html = '', _poiLength = 0, _floorInfo = $map.currentMapInfo;

		var _thisPOI = $extend.queryMapFeatures($map.project(lnglat));
		
		if(!_thisPOI){
			_thisPOI = {
				NAME:'',
				CATEGORY_ID:'0',
				POI_ID:'nullpoi'
			};
		}
		
		function _getHTML(_poiInfo){
			
			_poiInfo.FLOOR_ID = _floorInfo.mapID;
			_poiInfo.FLOOR_NAME = _floorInfo.floorName;
			_poiInfo.FLOOR_NUMBER = _floorInfo.floorNumber;
			
			$variable.$POI_Cache3[_poiInfo.POI_ID] = _poiInfo;
			_poiLength++;
			
			return "<li poi-id='"+_poiInfo.POI_ID+"'>\
						<div class='text disabled'>\
							<p class='p1 disabled'>"+(_poiInfo.NAME == '' ? '无名地址' : _poiInfo.NAME)+" "+_poiInfo.FLOOR_NAME+"<b>("+(_poiInfo._One ? '当前位置' : '附近')+")</b></p>\
						</div>\
						<div class='btn disabled "+$variable.$navSelectPointType+"'>"+$variable.$navSelectPointText+"</div>\
					</li>";
		}
		
		
		if($variable.$navSelectPointType == 'start'){
			$marker.startIcon.setLnglat([lnglat.lng, lnglat.lat]);
		}else{
			$marker.endIcon.setLnglat([lnglat.lng, lnglat.lat]);
		}
		
		
		_thisPOI._One = true;
		
		_thisPOI.LABEL_X = _point.x;
		_thisPOI.LABEL_Y = _point.y;
		
		html = _getHTML(_thisPOI);
		
		
		for(var poiID in _arrayPOI){
			
			var _poi = _arrayPOI[poiID];
			
			if($variable.$POI_Cache3[_poi.POI_ID]){
				continue;
			}
			
			html += _getHTML(_poi);
			
		}
		
		$index.$selectPointList.find('.head-box').find('.title').find('b').text(_poiLength);
		
		$index.$selectPointList.find('.content-box').find('ul').empty().append(html);
		
		
	};
	
	
	//全览路线
	$extend.fn_overviewRoute = function(queryFloorID){
		
		function _getCoords(floorID){
			
			for(var i = 0; i < $variable.$routeResult.completeResult._allRoutePartArray.length; i++){
				
				var _routePart = $variable.$routeResult.completeResult._allRoutePartArray[i];
				
				if(_routePart.mapInfo.mapID == floorID){
					return _routePart.route;
				}
				
			}

			return null;

		}
		
		var _floorID = queryFloorID ? queryFloorID : $variable.$endPOI.FLOOR_ID;
		
		var coordinates = _getCoords(_floorID);
		
		if(!coordinates) return;
		
		
		function _callee(){
			
			var bounds = coordinates.reduce(function(bounds, coord) {
	            return bounds.extend(coord);
	        }, new brtmap.LngLatBounds(coordinates[0], coordinates[0]));
			
			$map.setMaxBounds(null);
			
			$map.fitBounds(bounds, {
	            padding: {
	            	top:160,
	            	left:80,
	            	right:80,
	            	bottom:100
	            },
	            pitch:0
	        });
			
			//关闭自动导航
			$state.AUTO_NAV = false;
			
		}
		
		if(_floorID != $map._targetFloorID){
			$extend.fn_setFloor(_floorID,function(){
				_callee();
			});
		}else{
			_callee();
		}
		
        $index.$navingBomButton.find('.btn-box').find('.b-continue').show().siblings().hide();
        
	};
	
	
	//中途终止导航 恢复状态
	$extend.fn_stopNavResetRoute = function(){
		
		$index.$navingTopTips.removeClass('show');
		$index.$startEndPoint.addClass('show');
		
		$index.$startNav.showControl();
		
		$index.$floor.show();
		$index.$search.show();
		
		if($variable.$startPoint.floor != $variable.$endPoint.floor){
			
			if($map.currentMapInfo.floorNumber == $variable.$startPoint.floor){
				$index.$queryEndFloor.show();
			}else{
				$index.$queryStartFloor.show();
			}
		}
		
		$marker.navEndIcon.empty();
		$marker.endIcon.setLnglat([$variable.$endPoint.x, $variable.$endPoint.y], $variable.$endPOI.FLOOR_ID);
		
		$map.hideRoute();
		$map.showRoute();
		
		//关闭导航模式
		$state.USER_NAVING = false;
		//关闭自动导航
		$state.AUTO_NAV = false;
		//允许地图点击
		$state.MAP_CLICK = true;
        //关闭自动切换楼层
        $state.AUTO_CHANGE_FLOOR = false;

	};
	
	
	//导航完成之后 恢复初始状态
	$extend.fn_navOverResetMap = function(){
		
		$variable.$startPOI = null;
		$variable.$endPOI = null;
		$variable.$startPoint = {};
		$variable.$endPoint = {};
		$variable.$routeResult = null;
		
		//隐藏标记
		$marker.startIcon.empty();
		$marker.endIcon.empty();
		$marker.navEndIcon.empty();
		//清除路径
		$map.resetRoute();
		
		$index.$floor.show();
		$index.$search.show();

        //允许地图点击
        $state.MAP_CLICK = true;
        //恢复地图自动切换
		$state.AUTO_CHANGE_FLOOR = true;

        $state.IS_SEARCH_ING = false;
	}
	
	
	//恢复初始地图状态
	$extend.fn_resetInitMap = function(){
		
		$extend.fn_navOverResetMap();
		
		//隐藏首页 底部模板
		$index.$change.removeClass('show').find('.change-control').hide();
		
		$index.$floor.find('.box').removeClass('marker').siblings('.ul').find('li').removeClass('marker');
		
		$index.$search.find('input').val('').siblings('.close').hide();
		
		$extend.fn_removePoiMarker();
		
		$marker.selectedIcon.empty();
		
		$variable.$POI_Cache = [];
		$variable.$POI_Cache2 = [];
		$variable.$POI_Cache3 = [];
		$variable.$POI_FID_Cache = [];
		
		
		//搜索页恢复
		$extend.fn_resetDefaultSearch();
		
	};
	
	
	
	/************************************
	 * jquery 扩展
	 ***********************************/
	
	var _showOut = null,
		_hideOut = null;
	
	$.fn.showControl = function(callback){
		
		var that = this;
		
		window.clearTimeout(_hideOut);
		function _callee(){
			$(that).show().siblings().hide();
			$index.$change.addClass('show');
			
			callback && callback.apply(that);
		}
		
		if($index.$change.hasClass('show')){
			$index.$change.removeClass('show');
			_showOut = window.setTimeout(function(){
				_callee();
			},200);
		}
		else{
			_callee();
		}
		
		return $(that);
		
	};
	
	
	$.fn.hideControl = function(callback){
		
		var that = this;
		
		if(!$(that).is(':hidden')){
			
			window.clearTimeout(_showOut);
			$index.$change.removeClass('show');
		
			_hideOut = window.setTimeout(function(){
				$(that).hide();
				callback && callback.apply(that);
			},200);
			
		}
		
		return $(that);
	}
	
}

// 执行extend
_index_extend();


function function_share(poi){

    // 修改分享信息
    var shareInfo = {};
    shareInfo.title = $shareInfo.title;
    shareInfo.imgUrl = $shareInfo.imgUrl;
    shareInfo.desc = '【'+$shareInfo.title+'位置分享】' + (poi.NAME || '无名地址') + ' ' + poi.FLOOR_NAME + '，您的好友为您分享了一个位置点，点击即可查看>';
    shareInfo.link = $shareInfo.link+'?poiId='+poi.POI_ID+'&LABEL_X='+poi.LABEL_X+'&LABEL_Y='+poi.LABEL_Y+'&FLOOR_NUMBER='+poi.FLOOR_NUMBER+'&FLOOR_ID='+poi.FLOOR_ID+'&FLOOR_NAME='+poi.FLOOR_NAME;


    if ($APP) {
        JsApi({}).forbid().share(shareInfo);
    } else {
        asyncJSON('/api/v1/jsapi?appId'+$appId+'&url=' + encodeURIComponent(location.href.split('#')[0])).done(function (resp) {
            $('#weixin-share-tips').show();
            var r = resp.data;
            JsApi({
                debug: false,
                appId: r.appId,        //必填
                timestamp: r.timestamp,    //必填
                nonceStr: r.nonceStr,     //必填
                signature: r.signature    //必填
            }).forbid().share(shareInfo);
        });
    }
}

$('div.head-container').on('click',function () {
    $('#bulidingSelect-module').addClass('show');
});



$('#bulidingSelect-module').on('click','.head-model .back',function () {
    $('#bulidingSelect-module').removeClass('show');
});


