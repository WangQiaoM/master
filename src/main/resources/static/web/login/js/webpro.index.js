/**
 * 主页框架对象
 * @param initData
 * @param routeUrl
 * @returns {{setting: {basePath: 返回系统跟目录[], userID: *, uploadUrl: string}}}
 */
var webpro=function(initData,routeUrl){
	console.group("webpro");

	/**
	 * @return {[返回系统跟目录]}
	 */
	var getRootPath =function(){
		var curWwwPath=window.document.location.href;
		var pathName=window.document.location.pathname;
		var pos=curWwwPath.indexOf(pathName);
		var localhostPaht=curWwwPath.substring(0,pos);
		var curPath = curWwwPath.substr(localhostPaht.length, curWwwPath.length);
		var projectName=curPath.substring(0,pathName.substr(1).indexOf('/')+2);

//	    console.info("地址:",localhostPaht+projectName+routeUrl);

		return routeUrl||(localhostPaht+projectName);
	};

	console.warn("seesion对象:",initData.data.userInfo);
    if(initData.data.userInfo == "" || initData.data.userInfo===undefined){
        console.error("用户数据获取异常,请检查userInfo数据的获取.");
        alert(initData.msg);
        window.location.href ="../../";
    }

	var $$={
		setting:{
			basePath:getRootPath(),
			userID:initData.data.userInfo.dataId,
			uploadUrl:initData.uploadFileUrl,
			fontColor:null
		},
		/**
		 * 设置字体颜色属性
		 * @param fontColor
		 */
		settingFontColor:function(fontColor){
			this.setting.fontColor=fontColor;
		}
	};

	/**
	 * 初始化事件
	 */
	var _init=function(){


        /**
		 * 设置登录用户名
         * @type {string}
         */
		var userName = initData.data.userInfo.userName;
        $(".loginName span").text(userName);

        /**
		 * 注销登录事件
         */
        $(".login-gourp .dropdown-menu .logout").click(function (){
            $.get(initData.loginOutUrl,"",function (data){
                if(data.status=="200")
                {
                    window.location.href ="../../";
                }else{
                    Messenger().alertErr(data.msg);
                }
            },"json")
        });


		/**
		 *
		 */
		$(".dropdown-menu .updatePwd").click(function(){
			$$.mainDialog.showDialogDiv($$.setting.basePath+$(this).attr("url")+"?modeType=edit&userID="+$$.setting.userID, "修改密码");
		});

		/**
		 *
		 */
		$(".dropdown-menu .updateUserInfo").click(function(){

			$$.mainDialog.showDialogDiv($$.setting.basePath+$(this).attr("url")+"?modeType=edit&userID="+$$.setting.userID, "修改用户信息");
		});
		
		//遍历1级菜单
		var lv1MenuTmpl=doT.template($("#lv1MenuTmpl").text());
		var lv1Arr=initData.data.menuRules.arrForAttrVal("pcode","");
		$(".menu-control-lv1").html(lv1MenuTmpl(lv1Arr));
		
		//遍历2级菜单
		var lv2MenuTmpl=doT.template($("#lv2MenuTmpl").text());
		$(".view-body-menu-control").append(lv2MenuTmpl(initData.data.menuRules));
		
		console.log("l2menu",initData.data.menuRules);
		
		/**
		 * 关闭日历控件 
		 */
		$(document).mousedown(function(a) {
			$(".calendar").hide();
		});
		
		/**
		 * 菜单栏切换
		 */
		$(".view-body-menu-split .split-btn").click(function(){
			if($(this).find("i").hasClass("fa-caret-left")){
				$(this).find("i").attr("class","fa fa-caret-right");

				$(".view-body-menu").animate({width:10});
				$(".view-body-content").animate({left:10});
			}
			else{
				$(this).find("i").attr("class","fa fa-caret-left");
				
				$(".view-body-menu").animate({width:240});
				$(".view-body-content").animate({left:240});
			}
		});
		
		/***
		 * 根据index 显示二级菜单 
		 * @param {Object} index
		 */
		var _showMenuGroup=function(index){
			$(".menu-control-group").hide();
			$(".menu-control-group:eq("+index+")").fadeIn(300,function(){
				$(".menu-control-group .L3CC").hide();
				$(this).find(".L2Header:first").next().slideDown(300);
			});
		};
		
		/***
		 * 一级菜单点击事件
		 */
		$(".menu-control-lv1-item").click(function(){
			$(".menu-control-lv1-item").removeClass("menu-control-lv1-sel");
			$(this).addClass("menu-control-lv1-sel");
			
			_showMenuGroup($(this).index());
		});
		
		$(".menu-control-lv1-item:first-child").addClass("menu-control-lv1-sel");
		_showMenuGroup(0);
			
		/***
		 * 二级菜单点击事件
		 */
		$(".menuLV2-lv2Item .L2Header").click(function(){
			if(!$(this).next().is(":hidden")){return;}
			$(".menu-control-group .L3CC").slideUp(300);
			$(this).next().slideDown(300);
		});
		
		/**
		 * 菜单项单击事件
		 * 
		 * 路径banner、触发事件
		 */
		$(".menu-control-group .L3Item").click(function(){

			console.groupEnd();

			$(".menu-control-group .L3Item").removeClass("L3ItemSel");
			$(this).addClass("L3ItemSel");
			
			var iconClass=$(".menu-control-lv1-sel i").attr("class");
			var lv1Txt = $(".menu-control-lv1-sel").text();
			var lv2Txt = $(this).parent(".L3CC:first").prev().text();
			var lv3html = $(this).html();

			changeBanner(iconClass,lv1Txt,lv2Txt,lv3html);

			$(".view-body-content .iframe-mask").show();
			$(".view-body-content iframe").attr("src",$$.setting.basePath+$(this).attr("actionUrl"));
			
			if(initData.data.funRules == undefined){
				return ;
			}
			
			$(".view-body-content iframe").data("data",initData.data.funRules.arrForAttrVal("menuCode",$(this).attr("code")));
		});
		
		/**
		 * 关闭蒙板事件
		 */
		$(".view-body-content iframe").load(function(){
			$(".view-body-content .iframe-mask").hide();
		});
		
		//绑定窗口拖拽事件
		$(".mDialog").draggable({ 
			start: function() {
				$(".mDialog .dragDiv").css({width:$(".mDialog iframe").width(),height:$(".mDialog iframe").height()}).show();
			},
			stop: function() {
				$(".mDialog .dragDiv").hide();
			},
			containment: "#MaskDiv"
		});
		
		$(".mDialog .fa-remove").click(function () {
		    $$.mainDialog.closeDialogDiv();
		});
		
		//消息窗口样式
		Messenger.options = {
		    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
		    theme: 'future'
		};
	};
	
	/***
	 * banner设置
	 * @param {Object} iconClass
	 * @param {Object} lv1Txt
	 * @param {Object} lv2Txt
	 * @param {Object} lv3Txt
	 */
	var changeBanner=function(iconClass,lv1Txt,lv2Txt,lv3Txt){
		$(".breadcrumb li").remove();
		
		$(".breadcrumb").append("<li><i class='"+iconClass+"'></i><span>首页</span></li><li>"+lv2Txt+"</li><li class='l3Txt'>"+lv3Txt+"</li>");
		$(".breadcrumb li:first span").text(lv1Txt);
	};

	/**
	 * 内容窗体的对象
	 */
	$$.frameContent={
		hideMask:function(){
			$(".view-body-content .iframe-mask").hide();
		},
		getFrameData:function(){
			return $(".view-body-content iframe").data("data");
		},
		getFrameTitle: function () {
			return $(".view-body-content .l3Txt").text();
		},
		bindControls:function(func){
			func();
		}
	};
	
	/**
	 * 主页面dialog对象
	 * @type {Object}
	 */
	$$.mainDialog= {
		/***
		 * 显示弹出窗口
		 * @param {url} src
		 * @param {string} title
		 * @param {int} width
		 * @param {int} height
		 */
		showDialogDiv:function(src, title, width, height) {
		    var iframeHeight = $(window).height();
		    var maskObj = $("#MaskDiv");
		    
			$(".mDialog .mDialog-title span").text(title);
			$(".mDialog iframe").attr("src", src);
			
			if(width===undefined){
				var width = width||250;
				var height = height||80;
				$(".mDialog").attr("autoSize",1);
				
				$(".mDialog .mDialog-mask").show();
				maskObj.fadeTo("fast", 0.3,function(){
					$(".mDialog").css({left:($(window).width()-width)/2,top:($(window).height()-height)/2,width:width,height:height});
					$(".mDialog").show();	
				});
				
			}else{
				maskObj.fadeTo("fast", 0.3, function () {
			        var left = ($("body").width() - width) / 2-10;
			        var top = (iframeHeight - height) / 4;
			
			        $(".mDialog").css("left", left).css("top", top);
					$(".mDialog").height(height).width(width);
			
			        $(".mDialog").fadeIn("fast");
			        $(".mDialog iframe").show();
			   });
			}
		},
		
		/***
		 * 关闭弹出窗口 
		 */
		closeDialogDiv:function() {
		    $(".mDialog iframe").attr("src", "");
		    $(".mDialog").fadeOut("fast", function () { $("#MaskDiv").fadeOut("fast"); });



			console.groupEnd();
		},
		
		/***
		 * 改变弹出窗口的宽度 
		 * @param {Object} size
		 * @param {Object} funCall
		 */
		changeDialogSize:function(sizeObj, funCall) {
		    $(".mDialog").delay(100).animate({
		    		width: sizeObj.width, left: ($(window).width()-sizeObj.width)/2
		    },200);
		    $(".mDialog .mDialog-mask").delay(300).fadeOut();
		    $(".mDialog").delay(200).animate({height:sizeObj.heigth,top:($(window).height()-sizeObj.heigth)/2}, 300,function(){
				 if(typeof funCall==="function"){
					funCall();
			    }
		    });
		},
		
		/**
		 * 得到弹出窗口位置 
		 */
		getDialogPosition:function(){
			return $(".mDialog").offset();
		},
		/**
		 * 事件处理器
		 */
		eventHandler:{
			eventList:[],
			/**
			 * 增加监听事件源
			 * @param actionName
			 * @param func
			 */
			addEventListener:function(eventName,func){
				var evetnObj = {};
				evetnObj.eventName=eventName;
				evetnObj.func=func;

				this.eventList.push(evetnObj);
			},
			/**
			 * 响应监听事件
			 * @param actionName
			 */
			onEvent:function(actionName){
				for (var i = 0; i < this.eventList.length; i++) {
					var item = this.eventList[i];
					if(actionName==item.eventName){
						item.func();
					}
				}
			}
		}
	};

	/**
	 * 弹窗的内容窗口加载完成事件 
	 */
	$(".mDialog iframe").load(function(){
		if($(".mDialog iframe").attr("src")==""){
			return false;
		}
	});
	
	/**
	 * 主页面选表对象 
	 */
	$$.mainSelFrom ={
		/**
		 * 显示
		 * @param {Object} title
		 * @param {Object} src
		 * @param {Object} width
		 * @param {Object} height
		 */
		showSelFrom:function(title,src, width, height){
			
		}
	};
	
	/**
	 * 用户字典对象
	 */
	$$.mainDic={
			/**
			 * 键值对象
			 */
			map:{},
			
			queryInfo:function(key){
				if(this.map[key]==undefined){
					this.map[key] = [];
					this.map[key]=initData.data.dicJson.arrForAttrVal("pcode",key);
				}
				return this.map[key];
			},
			
			/**
			 * 根据节点键值与属性键值,显示名称
			 * @param {Object} code
			 * @param {Object} key
			 */
			valueForCodeAndKey:function(code,key){
				var dicObj=this.queryInfo(code);
				
				for(var i=0,size=dicObj.length;i<size;i++){
					if(dicObj[i].code==key){
						return dicObj[i].name;
					}
				}
			},
			
			/**
			 * 通过字典构造选择控件 
			 * @param {Object} selObj
			 */
			builderSelect:function(selObj){
			    	var key = selObj.attr("forDic");
			    	var listItem = this.queryInfo(key);
			    	
			    	selObj.html("");
			    	selObj.append("<option value=''>--请选择--</option>");
			    	
			    	for(var i=0,size=listItem.length;i<size;i++){
			    		selObj.append("<option value='"+listItem[i].code+"'>"+listItem[i].name+"</option>");
			    	}
			},
			
			/**
			 * 通过字典构造关联的下拉组件
			 * @param {Object} pSelPbj
			 * @param {Object} selObj
			 */
			builderChildSelect:function(pSelPbj,selObj){
				selObj.html("");
				selObj.append("<option value=''>--请先选:"+pSelPbj.prev().text()+"--</option>");
		    	
				pSelPbj.change(function(){
					var selDicArr = $$.mainDic.queryInfo($(this).val());
					selObj.html("");
					selObj.append("<option value=''>--请选择--</option>");
					
					for(var i=0,size=selDicArr.length;i<size;i++){
			    		selObj.append("<option value='"+selDicArr[i].code+"'>"+selDicArr[i].name+"</option>");
			    	}
					
					console.log("返回对象:"+$(this).val() +"    by:",selDicArr);
				});
				
			},

			/**
			 *
			 * @param pSelPbj
			 * @param selObj
			 */
			initChildSelect:function(pSelPbj,selObj){

				var selDicArr = $$.mainDic.queryInfo(pSelPbj.val());

				//alert(pSelPbj.val());

				selObj.html("");
				selObj.append("<option value=''>--请选择--</option>");

				for(var i=0,size=selDicArr.length;i<size;i++){
					selObj.append("<option value='"+selDicArr[i].code+"'>"+selDicArr[i].name+"</option>");
				}

			}
	};
	
	/***
	 * 主页面消息对象
	 */
	$$.mainMsg= {
		
		/**
		 * 弹出提示消息
		 * @param {Object} msgTxt
		 */
		alertInfo:function(msgTxt){
			Messenger.options = {
			    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right'
			};
			
			Messenger().alertInfo(msgTxt);
		},
		
		/**
		 * 弹出错误消息 
		 * @param {Object} msgTxt
		 */
		alertErr:function(msgTxt){
			Messenger.options = {
			    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right'
			};
			
			Messenger().alertErr(msgTxt);
		},
		
		/**
		 * 弹出确认消息
		 * @param {Object} msgTxt
		 * @param {Object} funCall
		 */
		confirmInfo:function(msgTxt,funCall){
			this.hideAll();
			Messenger.options = {
			    extraClasses: 'messenger-fixed messenger-on-top'
			};
			
			Messenger().confirmInfo(msgTxt,funCall);
		},
		
		/**
		 * 隐藏所有消息 
		 */
		hideAll:function(){
			Messenger().hideAll();
		}
	};

	///**
	// * 得到用户权限
	// * @return 用户权限 jsonobj
	// */
	//var getUenuRules=function(){
	//	return initData.data;
	//};
	
	_init();
	console.groupEnd();
	return $$;
};