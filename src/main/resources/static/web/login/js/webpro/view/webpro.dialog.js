/**
 * 弹窗口视图
 */
define(["webpro.view","DateControls","MapControls","logger"],function(webproView,dateControls,mapControls){
	function WebPro_dialogPage(parentWindow,jsonData){
		var webPro=parentWindow.webpro;						//用户
		var msg=webPro.mainMsg;								//消息模块
		var modeType =$.getUrlParam("modeType");			//试图  模态状态[可编辑|非编辑]

		logger.group("弹窗口视图");
		logger.info("注入地址数据:",window.location.href,jsonData);

		//视图初始化
		webproView(parentWindow,jsonData);

		mapControls(jsonData.data||{},modeType);			//地图控件		构造
		dateControls(parentWindow);

		//窗口大小及动画效果
		webPro.mainDialog.changeDialogSize((function(){
			var sizeObj={};
			sizeObj.heigth=0;

			var fileUploadSize = $(".upload-single-control").size();
			var fileUploadHeight=$(".upload-single-control").height();

			var mapControlSize=$(".mapControl").size();
			var mapControlHieght=$(".mapControl").height();

			//判断是否动态改成单栏与双栏样式
			if($("form>ul li").size()<=6 && $("form>ul .textareaDiv").size()==0&&mapControlSize==0){
				$("form>ul").attr("class","single-td");
			}
			else{
				$("form>ul").attr("class","double-td");
			}

			//双栏样式
			if($(".double-td").size()!=0){
				//控制li成对出现  防止空白样式
				if($(".double-td li:not(.colspan)").size()%2==1){
					$(".double-td li:not(.colspan):last").after("<li>&nbsp;</li>");
				}

				var areaConSize=$(".double-td .textareaDiv").size();
				sizeObj.heigth+=($(".double-td li").size()-areaConSize)/2*41.5;

				$(".double-td .textareaDiv").each(function(){
					sizeObj.heigth+=$(this).height()+12;
				});

				sizeObj.width=832;
			}
			//单栏样式
			else if($(".single-td").size()!=0){
				sizeObj.heigth+=$(".single-td li").size()*41.5;
				sizeObj.width=416;

				$("ul li").width(sizeObj.width-10);
			}

			sizeObj.heigth+=(mapControlHieght+5)*mapControlSize;
			sizeObj.heigth+=(fileUploadHeight - 30.5)*fileUploadSize;
			sizeObj.heigth+=$(".textareaDiv textarea").size()*20;
			sizeObj.heigth+=65;

			return sizeObj;
		})());

		//弹窗默认按钮事件
		(function() {
			/**
			 * 绑定验证机制
			 * jquery1.11.3.min.js
			 * jquery.validate.js
			 */
			$("#okBtn").click(function(){
				var obj={
					rules:{}
				};

				//绑定验证函数
				$(".dialog-body-center input[validClass^='{']").each(function(){
					obj.rules[$(this).attr("name")]=eval("("+$(this).attr("validClass")+")");
				});

				//验证表单
				var valBool=$(".dialog-body-center form").validate(obj).form();

				//select
				//$(".dialog-body-center form select").each(function () {
				//	alert("!");
				//})

				if(valBool){
					jsonData.queryObj=$(".dialog-body-center form").serializeJson();
					//ajax提交
					if(jsonData.queryObj.requestUrl==""){
						webPro.mainDialog.closeDialogDiv();
						return;
					}

					jsonData.queryObj.keyId = $.getUrlParam("keyId");
					jsonData.queryObj.userID = webPro.setting.userID;

					logger.info("请求:"+jsonData.requestUrl,jsonData.queryObj);

					$.post(jsonData.requestUrl,jsonData.queryObj,function(data){
						msg.hideAll();
						logger.info("请求提交回调事件,返回对象:",data);

						if(data.status=="200"){
							msg.alertInfo("请求成功！");

							webPro.mainGridList.refreshGrid();
							webPro.mainDialog.closeDialogDiv();

						}
						else{
							msg.alertErr(data.msg+",错误代码："+data.status);
						}
					},"json");

				}else{
					msg.hideAll();
					msg.alertErr("提交失败，数据填写！");
				}
			});

			/**
			 * 关闭弹出窗口
			 */
			$("#closeBtn").click(function(){
				webPro.mainDialog.closeDialogDiv();
			});

			if($.getUrlParam("modeType")=="view"){
				$("#okBtn").remove();
			}
		})();

		//TODO 需要重构
		return {
            ready:function(backFun){
                backFun(webPro.mainDialog,webPro.mainGridList);
			}
		};
	}
	return WebPro_dialogPage;
});
