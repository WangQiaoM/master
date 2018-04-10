
var BRT_FILE_HTTP = 'http://files.brtbeacon.net';
var BRT_PROJECT_NAME = "map/custom/sdk";
var BRT_MAPBOX_VERSION = "2.1.1";
// var BRT_MAPBOX_VERSION = "v0.38.0";
var BRT_MAP_VERSION = "v2.1.1";

var jsPath = BRT_FILE_HTTP + '/' + BRT_PROJECT_NAME + '/'+BRT_MAPBOX_VERSION +'/brtmap-' + BRT_MAP_VERSION +'.js',
    csPath = BRT_FILE_HTTP + '/' + BRT_PROJECT_NAME + '/' +BRT_MAPBOX_VERSION +'/brtmap-gl-2.0.0.css';

//document.write("<script type='text/javascript' src='"+jsPath+"' ></script>");
//document.write("<link rel='stylesheet' type='text/css' href='"+csPath+"' />");



var $floorID = null;

var _BRT = {};

_BRT.version = 'HR-3D';

_BRT.deviceId = localStorage.getItem('deviceId');
if(!_BRT.deviceId || _BRT.deviceId == 'undefined'){
    var _id = new Date().getTime();
    localStorage.setItem('deviceId',_id);
    _BRT.deviceId = _id;
}


_BRT.peopleId = sessionStorage.getItem('peopleId');
if(!_BRT.peopleId || _BRT.peopleId == 'undefined'){
    var _id = new Date().getTime();
    sessionStorage.setItem('peopleId',_id);
    _BRT.peopleId = _id;
}

_BRT.getAgent = function() {
    if(/(Android)/i.test(navigator.userAgent)){
        return 1; // android
    }
    else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        return 2; // ios
    }
    else{
        return 3; // pc
    }
};

_BRT.post = function(url, data, callback){

    callback = callback || function(){};

    var httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

    var str = '';
    for(var d in data){
        str += d + '=' + data[d] + '&';
    }

    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === 4 && httpRequest.status !== 404) {
            callback(JSON.parse(httpRequest.responseText));
        }
    };

    httpRequest.send(str);
};


_BRT.URLConfig = {
    statistics:"http://a.brtbeacon.net" //统计
};

_BRT._RouteResult = [];

_BRT.Extend = function(){};
	
// set options
_BRT.Extend.options = function(opt1,opt2){
	for(var i in opt2) opt1[i] = opt2[i];
	return opt1;
};


_BRT._idValue = 0;
_BRT._getIDValue = function(){
	_BRT._idValue += 1;
	return _BRT._idValue < 100?"0"+(_BRT._idValue<10?"0"+_BRT._idValue:_BRT._idValue):_BRT._idValue;
};

/*
 * Layer
 */

window.BRTLayer = function(){
	
	this._id = "brtmap_layer_" + _BRT._getIDValue();
	
	this.type = 'layer';
	
	
};

BRTLayer.prototype = {
	addTo:function(brtmap){
		
		this._brtmap = brtmap;
		
		return this;
	},
	clear:function(){
		BRTSymbol.SymbolControl.remove(this);
	}
};



/*
 * Symbol
 */

window.BRTSymbol = {};

BRTSymbol.SymbolControl = {
	symbols:[],
	add:function(symbol, layer, floorID){
		
		if(!symbol._isAdd){
		
			symbol._isAdd = true;
			
			var container = layer;
			
			symbol._container = container;
			
			if(layer.type && layer.type == 'layer'){
				container = layer._brtmap;
			}
			
			symbol.floorID = floorID ? floorID : $floorID;
			
			symbol._symbol = new brtmap.Marker(symbol.domNode).setLngLat(symbol._lnglat).addTo(container);
			
			if(symbol.floorID != $floorID){
				symbol._symbol.setLngLat([0,0]);
			}
			
			BRTSymbol.SymbolControl.symbols.push(symbol);
		}
		
		
	},
	show:function(floorID){
		
		var symbols = BRTSymbol.SymbolControl.symbols;
		
		for(var i = 0; i < symbols.length; i++){
			
			var symbol = symbols[i];
			
			if(!symbol.floorID){
				symbol.floorID = floorID;	
			}
			
			if(symbol.floorID == floorID){
				symbol._show();
			}else{
				symbol._hide();
			}
			
		}
		
	},
	remove:function(container){
		
		var symbols = BRTSymbol.SymbolControl.symbols;
		
		for(var i = 0; i < symbols.length; i++){
			if(symbols[i]._container && symbols[i]._container._id == container._id){
				symbols[i].remove();
			}
			
		}
	}
};

BRTSymbol.LocationMarker = function(options){

	this.options = _BRT.Extend.options({
		url:"",
		size:1,
		offset:[0,0],
		angle:0
	},options);


	this._SourceDATA = {
		"type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            },
            "properties":{
            	offset:this.options.offset,
            	angle:this.options.angle
            }
        }]
	};

	this._id = 'brtmap_location_' + _BRT._getIDValue();
	this._image = 'image_name_' + _BRT._getIDValue();
	this.type = 'location';

	this._isAdd = false;

	this._lnglat = [0,0];

};

BRTSymbol.LocationMarker.prototype = {

	setPoint:function(lnglat){

		if(lnglat.constructor != Array){
			lnglat = [lnglat.x,lnglat.y];
		}

		if(lnglat[0] > 1000 && lnglat[1] > 1000){
			var _lnglat = brtmap.CoordProjection.mercatorToLngLat(lnglat[0], lnglat[1]);
			lnglat = [_lnglat.lng, _lnglat.lat];
		}

		var point1 = this._lnglat;
		var point2 = lnglat;

		var timeOut = 0, that = this;

		window.clearTimeout(that._animateOut);

		function _animate(){

			if(timeOut > 500){
				return;
			}

			var scale = (timeOut / 500);

			var tempX = point1[0] * (1 - scale) + point2[0] * scale;
			var tempY = point1[1] * (1 - scale) + point2[1] * scale;

			that._SourceDATA.features[0].geometry.coordinates = [tempX, tempY];

			that._update();

			that._lnglat = [tempX, tempY];

			timeOut += 10;

			that._animateOut = window.setTimeout(arguments.callee,10);
		}

		if(this.floorID == $floorID){
			if(this._lnglat[0] != 0 && this._lnglat[1] != 0){
				// _animate();
                that._SourceDATA.features[0].geometry.coordinates = lnglat;
                that._update();
			}
			else{

				that._SourceDATA.features[0].geometry.coordinates = lnglat;
				that._update();

				that._lnglat = lnglat;
			}
		}
		else{
			that._lnglat = lnglat;
		}

		return this;

	},
	setOffset:function(x,y){

		this._SourceDATA.features[0].properties.offset = [x, y];

		this._update();

		return this;
	},
	setRotate:function(angle){

		this._SourceDATA.features[0].properties.angle = angle;

		this._update();

		return this;
	},

	_update:function(){
		this._map.getSource(this._id).setData(this._SourceDATA);
	},

	_show:function(){
		this._SourceDATA.features[0].geometry.coordinates = [this._lnglat[0], this._lnglat[1]];
		this._update();
	},
	_hide:function(){
		this._SourceDATA.features[0].geometry.coordinates = [0,0];
		this._update();
	},

	addTo:function(map,floorID){

		var that = this;

		if(map.type == 'layer'){
			map = map._brtmap;
		}

		that._map = map;

		that.floorID = floorID ? floorID : map._targetFloorID;

		if(!that._isAdd){

			that._isAdd = true;

			map.addSource(that._id, {
				"type": "geojson",
		        "data": that._SourceDATA
			});

			map.loadImage(that.options.url, function(error, image) {

		        if (error) throw error;

		        map.addImage(that._image, image);

		        map.addLayer({
		            "id": "layer-" + that._id,
		            "type": "symbol",
		            "source": that._id,
		            "layout": {
		                "icon-image": that._image,
		                "icon-offset": {
	                        type: "identity",
	                        property: "offset"
	                    },
		                "icon-size": that.options.size,
	                    "icon-rotate": {
	                        type: "identity",
	                        property: "angle"
	                    },
	                    "icon-rotation-alignment": "map"
		            }
		        });

		    });
			
            // function _animate() {
            //     that._update();
				// window.setTimeout(arguments.callee,10);
            // }
            // _animate();
			
			BRTSymbol.SymbolControl.symbols.push(this);
		}

		return this;

	},
	remove:function(){
		this._hide();
	}

};



BRTSymbol.Icon = function(options){
	
	this.options = _BRT.Extend.options({
		url:"",
		width:32,
		height:32,
		offsetX:0,
		offsetY:0,
		angle:0,
		autoCenter:true
	},options);
	
	this._id = 'brtmap_symbol_' + _BRT._getIDValue();
	
	this.type = 'Icon';
	
	this._isAdd = false;
	
	this.domNode = document.createElement('img');
	this.domNode.className = 'brtmap-symbol-icon';
	this.domNode.src = this.options.url;
	this.domNode.style.width = this.options.width + 'px';
	this.domNode.style.height = this.options.height + 'px';
	
	this._offset = [0,0];
	
	// if(this.options.autoCenter){
	// 	this._offset = [this.options.width / 2, this.options.height / 2];
	// }
	
	this.domNode.style.marginTop = this._offset[1] + 'px';
	this.domNode.style.marginLeft = this._offset[0] + 'px';
	
	this._lnglat = [0,0];
		
	this._symbol = {
		setLngLat:function(){}
	}
	
};
BRTSymbol.Icon.prototype = {
	setOffset:function(left,top){

		this.domNode.style.marginTop = top + 'px';
		this.domNode.style.marginLeft = left + 'px';
		
		return this;
	},
	setPoint:function(lnglat){
		
		if(lnglat.constructor != Array){
			lnglat = [lnglat.x,lnglat.y];
		}
		
		if(lnglat[0] > 1000 && lnglat[1] > 1000){
			var _lnglat = brtmap.CoordProjection.mercatorToLngLat(lnglat[0], lnglat[1]);
			lnglat = [_lnglat.lng, _lnglat.lat];
		}
		
		this._lnglat = lnglat;

        if(this.floorID == $floorID){
            this._symbol.setLngLat(lnglat);
        }
		
		return this;
	},
	_show:function(){
		this._symbol.setLngLat(this._lnglat);
	},
	_hide:function(){
		this._symbol.setLngLat([0,0]);
	},

	addTo:function(layer,floorID){
		
		BRTSymbol.SymbolControl.add(this, layer, floorID);
		
//		if(!this._isAdd){
//		
//			this._isAdd = true;
//			
//			var container = layer;
//			
//			this._container = container;
//			
//			if(layer.type && layer.type == 'layer'){
//				container = layer._brtmap;
//			}
//			
//			this.floorID = floorID ? floorID : container._targetFloorID;
//			
//			this._symbol = new brtmap.Marker(this.domNode).setLngLat([0,0]).addTo(container);
//			
////			this._symbol.addTo(container);
//			
//			BRTSymbol.SymbolControl.add(this);
//			BRTSymbol.SymbolControl.show(floorID);
//		}
		
		return this;
	},
	remove:function(){
		this._symbol.remove();
		this._isAdd = false;
	}
};


BRTSymbol.divIcon = function(options){
	
	this.options = _BRT.Extend.options({
		html:"",
		className:"",
		width:null,
		height:null,
		offsetX:0,
		offsetY:0,
		angle:0,
		autoCenter:true
	},options);
	
	this._id = 'brtmap_symbol_' + _BRT._getIDValue();
	
	this.type = 'divIcon';
	
	this._isAdd = false;
	
	
	this.domNode = document.createElement('div');
	this.domNode.className = 'brtmap-symbol-icon ' + this.options.className;
	this.domNode.innerHTML = this.options.html;
	this.domNode.style.width = this.options.width + 'px';
	this.domNode.style.height = this.options.height + 'px';
	
	this._offset = [0,0];
	
	// if(this.options.autoCenter){
	// 	this._offset = [this.options.width / 2, this.options.height / 2];
	// }
	
	this.domNode.style.marginTop = this._offset[1] + 'px';
	this.domNode.style.marginLeft = this._offset[0] + 'px';
	
	this._lnglat = [0,0];

	this._symbol = {
		setLngLat:function(){}
	}
	
};
BRTSymbol.divIcon.prototype = {
	setOffset:function(left,top){
		
		// left = -(left + this._offset[0]);
		// top = -( top + this._offset[1]);
		
		this.domNode.style.marginTop = top + 'px';
		this.domNode.style.marginLeft = left + 'px';
		
		return this;
	},
	setRotate:function(angle){
		
		this.domNode.children[0].style.webkitTransform = "rotate("+angle+"deg)";
		
	},
	setPoint:function(lnglat,animate){

		var that = this;

		if(lnglat.constructor != Array){
			lnglat = [lnglat.x,lnglat.y];
		}
		
		if(lnglat[0] > 1000 && lnglat[1] > 1000){
			var _lnglat = brtmap.CoordProjection.mercatorToLngLat(lnglat[0], lnglat[1]);
			lnglat = [_lnglat.lng, _lnglat.lat];
		}
		
		this._lnglat = lnglat;
		
		if(this.floorID == $floorID){
			this._symbol.setLngLat(lnglat);
		}

		// if(animate){
         //    window.clearTimeout(that._animateTimeOut);
         //    var _className = that.domNode.className.replace(/animate/g,'');
         //    that.domNode.className = _className + ' animate';
         //    that._animateTimeOut = window.setTimeout(function(){
         //        that.domNode.className = that.domNode.className.replace(/animate/g,'');
         //    },500);
		// }

		return this;
	},
	_show:function(){
		this._symbol.setLngLat(this._lnglat);
	},
	_hide:function(){
		this._symbol.setLngLat([0,0]);
	},

	addTo:function(layer,floorID){
		
//		if(!this._isAdd){
//		
//			this._isAdd = true;
//			
//			var container = layer;
//			
//			this._container = container;
//			
//			if(layer.type && layer.type == 'layer'){
//				container = layer._brtmap;
//			}
//			
//			this.floorID = floorID ? floorID : container._targetFloorID;
//			
//			this._symbol = new brtmap.Marker(this.domNode).setLngLat([0,0]).addTo(container);
//			
////			this._symbol.addTo(container);
//			
//			BRTSymbol.SymbolControl.add(this);
//			BRTSymbol.SymbolControl.show(floorID);
//		}

		BRTSymbol.SymbolControl.add(this, layer, floorID);
		
		return this;
	},
	remove:function(){
		this._symbol.remove();
		this._isAdd = false;
	}
};

BRTSymbol.Polyline = function(options){
	
	this.options = _BRT.Extend.options({
		color:"#333333",
		weight:2,
		opacity:0.8
	},options);
	
	this._id = 'brtmap_symbol_' + _BRT._getIDValue();
	
	this.type = 'Polyline';
	
	this._isAdd = false;
	
	this._lineData = {
		"type": "FeatureCollection",
	    "features": [{
	        "type": "Feature",
	        "geometry": {
	            "type": "LineString",
	            "coordinates": [
	                [0, 0]
	            ]
	        }
	    }]
	};
	
};
BRTSymbol.Polyline.prototype = {
	setPoints:function(points){
		
		var _coords = [];
		
		for(var i = 0; i < points.length; i++){
			
			var point = brtmap.CoordProjection.mercatorToLngLat(points[i][0], points[i][1]);
			_coords.push([point.lng,point.lat]);
		}
		
		if(_coords < 1){
			_coords = [0,0];
		}
		
		this._lineData.features[0].geometry.coordinates = _coords;
		
		hrmap.getSource(this._id).setData(this._lineData);
		
		return this;
	},
	addTo:function(layer,floorID){
		
		var that = this;
		
		if(!this._isAdd){
			
			this._isAdd = true;
			
			hrmap.on('load',function(){
			
				hrmap.addLayer({
			        "id": that._id,
			        "type": "line",
			        "source": {
			        	"type": "geojson",
				        "data": that._lineData
			        },
			        "layout": {
			            "line-join": "round",
			            "line-cap": "round"
			        },
			        "paint": {
			            "line-color": that.options.color,
			            "line-width": that.options.weight,
			            'line-opacity': that.options.opacity
			        }
			    });
			    
			});
			
			this.floorID = floorID ? floorID : $floorID;
			
		}
		
		return this;
	},
	remove:function(){
		
		this._lineData.features[0].geometry.coordinates = [0,0];
		hrmap.getSource(this._id).setData(this._lineData);
		
	}
};




window.MapRouteParser = [];

/*
 * Route
 */

window.BRTRoute = function(options){
	
	this.options = _BRT.Extend.options({
		color:"#0099FF",
		weight:6,
		opacity:0.8
	},options);
	
	this._id = 'brtmap_route_' + _BRT._getIDValue();
	
	this.type = 'Route';
	
	this._isAdd = false;
	
	this._pathResult = null;
	
};
BRTRoute.prototype = {
	naviAnalyze:function(startPoint,stopPoint,callback){
		
		var that = this;
		
		var start = brtmap.CoordProjection.mercatorToLngLat(startPoint.x, startPoint.y),
			stop = brtmap.CoordProjection.mercatorToLngLat(stopPoint.x, stopPoint.y);
		
		var startLngLat = {
				lng:start.lng,
				lat:start.lat,
				floor:startPoint.floor
			},
			stopLngLat = {
				lng:stop.lng,
				lat:stop.lat,
				floor:stopPoint.floor
			};
		
		hrmap.requestRoute(startLngLat, stopLngLat, function () {
			
            hrmap.showRoute();
            
            that._pathResult = [];
            _BRT._RouteResult = [];
            
            var pathResult = hrmap._routeResult._allRoutePartArray;

            for(var i = 0; i < pathResult.length; i++){
            	
            	var _index = pathResult[i].partIndex,
            		_floor = pathResult[i].mapInfo.floorNumber,
            		_route = pathResult[i].route,
            		_paths = [];
            	
            	for(var k = 0; k < _route.length; k++){
            		
            		var _point = brtmap.CoordProjection.lngLatToMercator(_route[k][0], _route[k][1]);
            		
            		_paths.push([_point.x,_point.y]);
            		
            	}
            	
            	that._pathResult.push({
            		paths:_paths,
            		floorIndex:_floor,
            		floorID:hrmap.getFloorID(_floor)
            	});
            	
            	_BRT._RouteResult[hrmap.getFloorID(_floor)] = _route;
            	
            	callback && callback.apply(null,[that._pathResult]);
            	
            }
            
        }, function (error) {
            console.log("route error callback");
            console.log(error);
        });

        var floorID = hrmap.getFloorID(stopPoint.floor);
        var _poi = hrmap.getPOIByRadius({x:stopLngLat.lng, y:stopLngLat.lat, floor:stopLngLat.floor},1,floorID), _poiID;

        if(_poi.length == 0) _poiID = null;
        else _poiID = _poi[0].poiID;

        //统计路线规划
        _BRT.post(_BRT.URLConfig.statistics + '/acquisition/jsI',{
            ot:2, //路线规划
            di:_BRT.deviceId,
            pi:_BRT.peopleId,
            dt:_BRT.getAgent(),
            bi:hrmap.___buildingID,
            poi:_poiID,
            _t:new Date().getTime()
        });

	},
	
	_getPath:function(start,stop,callback,id){
			
		callback = callback || function(){};
		id = id ? id : this._id;
		
		//start get route data
		var that = this,
			buildingID = hrmap.___buildingID,
			token = hrmap.___token;
		
		MapRouteParser[id] = function(result){
			var _paths = that._pathResult;
			
			if(result.success){
				_paths = [];
				for(var i = 0; i < result.routeResult.length; i++){
					var _r = {
						paths:result.routeResult[i].coordinates,
						floorIndex:result.routeResult[i].floor,
						floorID:hrmap.getFloorID(result.routeResult[i].floor)
					};
					_paths.push(_r);
				}
				
			}else{
				console.error("BRTRoute : start or end error !.");
			}
			
			callback.apply(that,[_paths]);
			
		};
		
		var _script = document.createElement("script");
			_script.src = "http://platalk.cn/TYRouteService/route/RouteService?callback=MapRouteParser['"+id+"']&buildingID="+buildingID+"&token="+encodeURIComponent(token)+"&startX="+start.x+"&startY="+start.y+"&startF="+start.floor+"&endX="+stop.x+"&endY="+stop.y+"&endF="+stop.floor;
			document.getElementsByTagName("head")[0].appendChild(_script);
		_script.onload = function(){
			_script.onload = null;
			_script.parentNode.removeChild(_script);
		}
	},
	
	setPastRoute:function(myPoint, callback){
		callback = callback || function(){};
			
		if(myPoint){
			
			var _alreadyPaths = [],   //已经过的路线关键点集合
				_remanentPaths = [];  //剩余关键点集合
			
			for(var i = 0; i < this._pathResult.length; i++){
				
				var _result = this._pathResult[i];
				
				if(myPoint.floor == _result.floorIndex){
					
					for(var k = 0; k <= myPoint.index; k++){
						_alreadyPaths.push(_result.paths[k]);
					}
					
					var _paths = [[myPoint.x, myPoint.y]];
					
					for(var k = myPoint.index + 1; k < _result.paths.length; k++){
						_paths.push(_result.paths[k]);
					}
					
					_remanentPaths.push({
						paths:_paths,
						floorIndex:_result.floorIndex,
						floorID:_result.floorID
					});
					
				}
				
			}
			
			_alreadyPaths.push([myPoint.x, myPoint.y]);
			
			var _lnglat = brtmap.CoordProjection.mercatorToLngLat(myPoint.x, myPoint.y);
		
			hrmap.showRoute({x:_lnglat.lng, y:_lnglat.lat, floor:myPoint.floor});
			
			callback.apply(null,[_alreadyPaths, _remanentPaths, this._pathResult]);
			
		}else{
			
			var _showFloor = hrmap.getFloorInfo(), _paths = [];
		
			for(var i=0;i<this._pathResult.length;i++){
				var _R = this._pathResult[i];
				
				if(_showFloor.floorIndex == _R.floorIndex){
					_paths.push(_R.paths);
				}
			}
		
//			this._container._symbolGroup.addLayer(this._pastPolyLine.setLatLngs(_paths));
			
			callback.apply(null,[_paths, [], this._pathResult]);
		}
	},
	clearPastRoute:function(){
		var _lnglat = brtmap.CoordProjection.mercatorToLngLat($startPoint.x, $startPoint.y);
		hrmap.showRoute({x:_lnglat.lng, y:_lnglat.lat, floor:$startPoint.floor});
	},
	getNearPoint:function(pointObt){
		
		var _minDes = 10000,
			pointThreeArr = [], //离最近定位点的3个路线关键点 
			_isShow = false,    //定位点是否在路线楼层
			_endIndex = 0;      //已经过的路线关键点索引
		
		
		for(var i = 0; i < this._pathResult.length; i++){
			
			var _R = this._pathResult[i];
			
			if(pointObt.floor == _R.floorIndex){
				
				_isShow = true;
				
				for(var k = 0, len = _R.paths.length; k < len; k++){
					
					var _p = _R.paths[k];
					
					var _d = Math.sqrt((pointObt.x - _p[0]) * (pointObt.x - _p[0]) + (pointObt.y - _p[1]) * (pointObt.y - _p[1]));
					
					if(_d < _minDes){
						_minDes = _d;
						
						var _p1 = k == 0 ? _R.paths[0] : _R.paths[k-1],
							_p2 = _R.paths[k],
							_p3 = k == (len - 1) ? _R.paths[len-1] : _R.paths[k+1];
						
						pointThreeArr = [_p1,_p2,_p3];
						
						_endIndex = k;
						
					}
					
				}
			}
		}
		
		if(!_isShow) return null;
		
		var _point1 = this._getClosePoint(pointObt, [pointThreeArr[0],pointThreeArr[1]]),
			_point2 = this._getClosePoint(pointObt, [pointThreeArr[1],pointThreeArr[2]]);
		
		var _point = _point1.des < _point2.des ? _point1 : _point2;
		
		_endIndex = _point1.des < _point2.des ? _endIndex - 1 : _endIndex;
		
		_point.point.index = _endIndex;
		
		return _point.point;
		
		
//		var lnglat = brtmap.CoordProjection.mercatorToLngLat(mapPoint.x, mapPoint.y);
//		
//		lnglat = {x:lnglat.lng, y:lnglat.lat, floor:mapPoint.floor};
//		
//		return hrmap._routeResult.getNearestPoint(lnglat);
		
	},
	//获取 distance 距离的坐标
	_getDistancePoint:function(x1,y1,angle,distance){
	
		var hudu = (2 * Math.PI / 360) * angle;
		
		var x = x1 + Math.cos(hudu) * distance;
		var y = y1 - Math.sin(hudu) * distance;
		
		return {x:x,y:y};
	},
	//获取最近的点
	_getClosePoint:function(point, points){
		
		var _CPoints = [] ,_minDes = 10000, _point = point;
		
		for(var i = 1; i < points.length; i++){
			
			var _start = points[i-1],
				_end = points[i];
			
			var _dCount = hrmap.getDistance(_start,_end);
			
			var _angle = hrmap.getAngle(_start, _end);
			
			if(isNaN(_angle)){
				_angle = 0;
			}
			
			for(var _dIndex = 0; _dIndex <= _dCount; _dIndex += 0.5){
				
				var _p = this._getDistancePoint(_start[0], _start[1], _angle, _dIndex);
				
				_CPoints.push(_p);
				
			}
		}
		
		for(var i = 0; i < _CPoints.length; i++){
			
			var _p = _CPoints[i];
				
			var _d = hrmap.getDistance(point, _p);
			
			if(_d < _minDes){
				_point = _p;
				_point.floor = point.floor;
				_minDes = _d;
			}
			
		}
		
		return {point:_point, des:_minDes};
		
	},
	addTo:function(layer){
		
		if(layer.type == 'layer'){
			this._container = layer._brtmap;
		}else{
			this._container = layer;
		}
		
		return this;
	},
	remove:function(){
        hrmap.resetRoute();
        hrmap.hideRoute();
	}
};




/*
 * brtmap extend
 */

function brtmap_extend_function(buildingID){

    //统计打开地图
    _BRT.post(_BRT.URLConfig.statistics + '/acquisition/jsI',{
        ot:1, //初始化地图
        di:_BRT.deviceId,
        pi:_BRT.peopleId,
        dt:_BRT.getAgent(),
        bi:hrmap.___buildingID,
        vm:_BRT.version,
        _t:new Date().getTime()
    });

    //统计在线时长
    var _duration = 5, that = this;
    !function(){

        //如果定位sdk 在上报数据，则这里不上报
        if(sessionStorage.getItem('isBrtLocation') == 'true') return;

        _BRT.post(_BRT.URLConfig.statistics + '/acquisition/jsI',{
            ot:5, //初始化地图
            di:_BRT.deviceId,
            pi:_BRT.peopleId,
            dt:_BRT.getAgent(),
            bi:hrmap.___buildingID,
            d:_duration,
            _t:new Date().getTime()
        });

        _duration = 30;

        window.setTimeout(arguments.callee, _duration * 1000);

    }();


	hrmap.setFont('simhei-'+ buildingID);
    hrmap.setLabelPaint("text-color", "#666666");
    hrmap.setLabelPaint("text-halo-color", "#ffffff");
    hrmap.setLabelPaint("text-halo-width", 1);

	hrmap._viewBounds = true;
	
	hrmap.setViewBounds = function(){
		
		if(!hrmap._viewBounds){
			hrmap.setMaxBounds(null);
		}else{
			hrmap.setMaxBounds(hrmap.currentMapInfo.getBounds(0.5));
		}
	}
	
	
	hrmap.BrtFlyTo = function(options){
		
		var flyJson = {
			speed:0.3
		};
		
		if(options.center){
			
			var point = options.center;
			
			if(point.constructor != Array){
				point = [point.x, point.y];
			}
			
			var _lnglat = brtmap.CoordProjection.mercatorToLngLat(point[0],point[1]);
			
			flyJson.center = [_lnglat.lng,_lnglat.lat];
			
		}
		
		if(options.zoom){
			flyJson.zoom = options.zoom;
		}
		
		
		if(options.bearing){
			flyJson.bearing = options.bearing;
		}

		if(options.pitch || options.pitch == 0){
            flyJson.pitch = options.pitch;
		}

		hrmap.easeTo(flyJson);
		
	};
	
	
	hrmap.getSize = function(){
		return {x:hrmap._canvas.clientWidth, y:hrmap._canvas.clientHeight};
	};
	
	hrmap.getBuildingInfo = function(){
		var json = hrmap.building;
		var floorInfo = [];
		
		for(var i = 0; i < hrmap.mapInfoArray.length; i++){
			
			var info = hrmap.mapInfoArray[i];
			
			floorInfo.push({
				floorIndex:info.floorNumber,
				floorName:info.floorName,
				floorID:info.mapID,
				extent:info.mapExtent
			});
			
		}
		
		json.floorInfo = floorInfo;
		
		return json;
		
	};
	
	hrmap.getFloorID = function(floor){
		for(var i=0;i<hrmap.mapInfoArray.length;i++){
			var _info = hrmap.mapInfoArray[i];
			if(_info.floorNumber == floor){
				return _info.mapID;
			}
		}
	}
	
	hrmap.getFloorInfo = function(floorID){
		
		floorID = floorID ? floorID : $floorID;
		
		var floorInfo = {};
		
		for(var i = 0; i < hrmap.mapInfoArray.length; i++){
			var info = hrmap.mapInfoArray[i];
			if(floorID == info.mapID){
				floorInfo = {
					floorIndex:info.floorNumber,
					floorName:info.floorName,
					floorID:info.mapID,
					extent:info.mapExtent
				};
			}
			
		}
		
		return floorInfo;
	};
	
	hrmap.getShop = function(mapPoint){

		if(mapPoint.x < 1000 & mapPoint.y < 1000){
            mapPoint = brtmap.CoordProjection.lngLatToMercator(mapPoint.x, mapPoint.y);
		}

		if(!(mapPoint.constructor == Array)){
			mapPoint = [mapPoint.x, mapPoint.y];
		}

        console.log('$floorID',$floorID);

		var asset = hrmap._dataPool[$floorID].mapData.asset;



		var _poi = null;
		if(asset.features){
			_poi = _BRT.__queryBuild._contains(mapPoint, asset.features);
		}
		
		if(!_poi){
			var room = hrmap._dataPool[$floorID].mapData.room;
			_poi = _BRT.__queryBuild._contains(mapPoint, room.features);
		}
		
		if(_poi){
			
			return {
				categoryID:_poi.properties["CATEGORY_ID"],
				poiID:_poi.properties["POI_ID"],
				name:_poi.properties["NAME"],
				x:_poi.properties["LABEL_X"],
				y:_poi.properties["LABEL_Y"],
				rings:_poi.geometry.coordinates
			}
			
		}else{
			return hrmap.getFloorInfo();
		}
		
	};
	
	
	hrmap.getNearbyPOI = function(mapPoint,radius){
		
		mapPoint = brtmap.CoordProjection.lngLatToMercator(mapPoint.x, mapPoint.y);
		
		if(!(mapPoint.constructor == Array)){
			mapPoint = [mapPoint.x, mapPoint.y];
		}
		
		var _radius = radius || 20,
			_angle = 30,
			_points = [],
			_poiArr = [];
		
		for(var i = 0; i <= 12; i++){
			var hudu = (2 * Math.PI / 360) * _angle * i;
			var _x = mapPoint[0] - Math.sin(hudu) * _radius,
				_y = mapPoint[1] + Math.cos(hudu) * _radius;
			_points.push([_x, _y]);
		}
		
		var room = hrmap._dataPool[$floorID].mapData.room;
		var asset = hrmap._dataPool[$floorID].mapData.asset;
		var facility = hrmap._dataPool[$floorID].mapData.facility;
		
		for(var i = 0; i < room.features.length; i++){
			
			var poi = room.features[i].properties;
			if(_BRT.__queryBuild._IsPtInPoly2({lat:poi.LABEL_X, lng:poi.LABEL_Y},_points)){
				_poiArr.push(poi);
			}
			
		}
		
		for(var i = 0; i < asset.features.length; i++){
			
			var poi = asset.features[i].properties;
			if(_BRT.__queryBuild._IsPtInPoly2({lat:poi.LABEL_X, lng:poi.LABEL_Y},_points)){
				_poiArr.push(poi);
			}
			
		}
		
		for(var i = 0; i < facility.features.length; i++){
			
			var poi = facility.features[i].properties;
			if(_BRT.__queryBuild._IsPtInPoly2({lat:poi.LABEL_X, lng:poi.LABEL_Y},_points)){
				_poiArr.push(poi);
			}
			
		}
		
		return _poiArr;
	};
	
	
	hrmap.getPOIByRadius = function(mapPoint, radius, floorID){
		
		mapPoint = brtmap.CoordProjection.lngLatToMercator(mapPoint.x, mapPoint.y);
		
		if(!(mapPoint.constructor == Array)){
			mapPoint = [mapPoint.x, mapPoint.y];
		}
		
		radius = radius || 1.5;
		
		floorID = floorID ? floorID : $floorID;
		
		var mapData = hrmap._dataPool[floorID].mapData;
		
		if(!mapData) return null;
		
		console.log(mapData);
		
		var _arrayBase = [];
		
		var _facility = mapData.facility.features;
		
		for(var i = 0; i < _facility.length; i++){
			
			var coord = _facility[i].geometry.coordinates,
				point = brtmap.CoordProjection.lngLatToMercator(coord[0], coord[1]);
			
			var x = Math.abs(mapPoint[0] - point.x),
				y = Math.abs(mapPoint[1] - point.y);
			
			var d = Math.sqrt(x * x + y * y);
			
			if(d > radius) continue;
			
			_arrayBase.push({
				categoryID:_facility[i].properties["CATEGORY_ID"],
				poiID:_facility[i].properties["POI_ID"],
				name:_facility[i].properties["NAME"],
				x:_facility[i].properties["LABEL_X"],
				y:_facility[i].properties["LABEL_Y"],
//					rings:_facility[i].geometry.rings,
				_d:d
			});
		}
		//排序
		_arrayBase.sort(function(a,b){
			return a._d - b._d;
		});
		
		
		if(mapData.asset.features){
			var _asset = _BRT.__queryBuild._containsByDataBase(mapPoint, mapData.asset.features);
			if(_asset)
				_arrayBase.push({
					categoryID:_asset.properties["CATEGORY_ID"],
					poiID:_asset.properties["POI_ID"],
					name:_asset.properties["NAME"],
					x:_asset.properties["LABEL_X"],
					y:_asset.properties["LABEL_Y"],
					rings:_asset.geometry.coordinates
				});
		}
		
		if(mapData.room.features){
			var _room = _BRT.__queryBuild._containsByDataBase(mapPoint, mapData.room.features);
			if(_room)
				_arrayBase.push({
					categoryID:_room.properties["CATEGORY_ID"],
					poiID:_room.properties["POI_ID"],
					name:_room.properties["NAME"],
					x:_room.properties["LABEL_X"],
					y:_room.properties["LABEL_Y"],
					rings:_room.geometry.coordinates
				});
		}
		
		return _arrayBase;
			
	};
	
	
	hrmap.distinct = function(poiArray){
		
		var distinctArray = new Array();
		
		for(var i = 0; i < poiArray.length; i++){
			
			var isExist = false;
			
			for(var k = 0; k < distinctArray.length; k++){
				
				var poi1 = poiArray[i],
					poi2 = poiArray[k];
				
				var d = hrmap.getDistance(poi1,poi2);
				
				if(poi1.name == poi2.name && poi1.categoryID == poi2.categoryID && d < 2){
					isExist = true;
					break;
				}
				
			}
			
			if(!isExist){
				distinctArray.push(poiArray[i]);
			}
			
		}
		
		return distinctArray;
		
	};
	
	
	hrmap.getDistance = function(point1, point2){
			
		if(point1.constructor != Array){
			point1 = [point1.x,point1.y];
		}
		if(point2.constructor != Array){
			point2 = [point2.x,point2.y];
		}
		
		var x = Math.abs(point1[0] - point2[0]);
		var y = Math.abs(point1[1] - point2[1]);
		
		return Math.sqrt(x*x + y*y);
		
	};
	
	
	hrmap.getDistanceAngleCount = function(pointArr){
		
		var that =this,
				_DCount = 0,
			_lineList = [],
			_floorCount = 0;
		
		pointArr.forEach(function(obj){
			
			var _points = obj.paths;
			
			for(var i = 1; i < _points.length; i++){
			
				var _p1 = _points[i-1],
					_p2 = _points[i];
				
				var _d = that.getDistance(_p1,_p2);
				
				_lineList.push({
					distance:_d,
					angle:that.getAngle(_p1,_p2)
				});
				
				_DCount += _d;
				
			}
			
		});
		
		return {distance:_DCount, lineList:_lineList};
		
	};
	
	//获取两点之间的角度
	hrmap.getAngle = function(point1, point2) {
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
		
	};
	
	hrmap.moveTo = function(mapPoint){
		
		if(!(mapPoint.constructor == Array)){
			mapPoint = [mapPoint.x, mapPoint.y];
		}
		
		var lonlat = brtmap.CoordProjection.mercatorToLngLat(mapPoint[0], mapPoint[1]);
		
		hrmap.panTo([lonlat.lng,lonlat.lat]);
		
	};
	
	
	hrmap.toMapPoint = function(screenPoint){
		
		if(!(screenPoint.constructor == Array)){
			screenPoint = [screenPoint.x, screenPoint.y];
		}
		
		var latlng = hrmap.unproject({x:screenPoint[0],y:screenPoint[1]});
		
		return {x:latlng.lng, y:latlng.lat};
	};
	
	
	hrmap.viewBounds = function(coords,options){
		
        var bounds = coords.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new brtmap.LngLatBounds(coords[0], coords[0]));

        hrmap.fitBounds(bounds, {
            padding: options
        });
        
	}
	
}



_BRT.__queryBuild = {
		
	_contains:function(latlng,layersArray){
		
		var _layers = new Array();
		
		for(var i=0;i<layersArray.length;i++){
			var rings = layersArray[i].geometry.coordinates;
			
			var _rings = [];
			for(var k in rings){
				_rings = _rings.concat(rings[k]);
			}
			
			if(_BRT.__queryBuild._IsPtInPoly({lat:latlng[0], lng:latlng[1]}, _rings)){
				_layers.push(layersArray[i]);
			}
			
		}
		
		if(_layers.length==0){
			return null;
		}
		
		return _layers[_layers.length - 1];
		
	},
	_containsByDataBase:function(latlng,dataArray){
		
		var _layers = new Array();
		
		for(var i=0;i<dataArray.length;i++){
			
			var categoryID = Math.ceil(dataArray[i].properties['CATEGORY_ID']);
			if(categoryID <= 800) continue;
			
			var rings = dataArray[i].geometry.coordinates;
			
			var _rings = [];
			for(var k in rings){
				_rings = _rings.concat(rings[k]);
			}
			
			if(_BRT.__queryBuild._IsPtInPoly({lat:latlng[0],lng:latlng[1]}, _rings)){
				_layers.push(dataArray[i]);
			}
			
		}
		
		if(_layers.length==0){
			return null;
		}
		
		return _layers[_layers.length - 1];
		
	},
	_IsPtInPoly:function (latlng, latlngs) {
		
		var xSum = 0,	lat1, lng1, lat2, lng2, _crossoverLat;
		
		if(latlngs.length <3) return false;
		
		for(var i = 0; i < latlngs.length; i++){
			if(i == latlngs.length - 1){
				var _lonlat1 = brtmap.CoordProjection.lngLatToMercator(latlngs[i][0], latlngs[i][1]),
					_lonlat2 = brtmap.CoordProjection.lngLatToMercator(latlngs[0][0], latlngs[0][1]),
				
				lat1 = _lonlat1.x;
				lng1 = _lonlat1.y;
				lat2 = _lonlat2.x;
				lng2 = _lonlat2.y;
			}else{
				var _lonlat1 = brtmap.CoordProjection.lngLatToMercator(latlngs[i][0], latlngs[i][1]),
					_lonlat2 = brtmap.CoordProjection.lngLatToMercator(latlngs[i+1][0], latlngs[i+1][1]),
					
				lat1 = _lonlat1.x;
				lng1 = _lonlat1.y;
				lat2 = _lonlat2.x;
				lng2 = _lonlat2.y;
				
			}
			//判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上  
			if((latlng.lat >= lat1 && latlng.lat < lat2) || (latlng.lat >= lat2 && latlng.lat < lat1)){
				if(Math.abs(lat1 - lat2) > 0){
					//得到 A点向左射线与边的交点的x坐标
					_crossoverLat = lng1 - ((lng1 - lng2) * (lat1 - latlng.lat)) / (lat1 - lat2);
					
					if(_crossoverLat < latlng.lng){
						xSum++;
					}
				}
			}
		}
		
		return (xSum % 2 != 0);
		
	},
	_IsPtInPoly2:function(latlng, latlngs){
		
		var xSum = 0,	lat1, lng1, lat2, lng2, _crossoverLat;
		
		if(latlngs.length < 3) return false;
		
		for(var i = 0; i < latlngs.length; i++){
			if(i == latlngs.length - 1){
				lat1 = latlngs[i][0];
				lng1 = latlngs[i][1];
				lat2 = latlngs[0][0];
				lng2 = latlngs[i][1];
			}else{
				lat1 = latlngs[i][0];
				lng1 = latlngs[i][1];
				lat2 = latlngs[i+1][0];
				lng2 = latlngs[i+1][1];
			}
			//判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上  
			if((latlng.lat >= lat1 && latlng.lat < lat2) || (latlng.lat >= lat2 && latlng.lat < lat1)){
				if(Math.abs(lat1 - lat2) > 0){
					//得到 A点向左射线与边的交点的x坐标
					_crossoverLat = lng1 - ((lng1 - lng2) * (lat1 - latlng.lat)) / (lat1 - lat2);
					
					if(_crossoverLat < latlng.lng){
						xSum++;
					}
				}
			}
		}
		
		return (xSum % 2 != 0);
	}
};
