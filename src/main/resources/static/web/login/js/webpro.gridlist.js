/**
 * 
 * @param {Object} parentWindow
 * @param {Object} gridInitJson　初始注入的JSON对象
 */
var WebPro_gridlistPage=(function(parentWindow,gridInitJson){

	console.groupEnd();
	console.group("WebPro_gridlistPage");

	var webPro=parentWindow.webpro;
	var msg=webPro.mainMsg;
	var dataGrid=$('#dg').datagrid();
	var dataKeyID = $("#dg").attr("keyId");
	var dataUrl =  webPro.setting.basePath+ gridInitJson.dataUrl;
	var fontColor=webPro.setting.fontColor||new Object();

	//渲染功能按钮
	var funBtns = webPro.frameContent.getFrameData();
	var funBtnsTmpl=doT.template($("#funBtnsTmpl").text());
	$(".grid-bodyCenter .funBar").append(funBtnsTmpl(funBtns));

	console.group(dataUrl);

	/**
	 * 渲染列表内容数据 
	 * @param {Object} data
	 */
	var renderData=function(data){
		
		$(".gridPanle #dg th[forDic]").each(function(){
			var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
			var forCode = $(this).attr("forDic");
			
			$.each(data.rows,function(i,item){
				item[fieldName+"_Code"]=item[fieldName];
				item[fieldName]=webPro.mainDic.valueForCodeAndKey(forCode,item[fieldName]);
			});
		});

		//渲染多级分类
		$(".gridPanle #dg th[forParent]").each(function(){
			var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
			var forParent = $(this).attr("forParent")+"_Code";

			$.each(data.rows,function(i,item){
				item[fieldName]=+webPro.mainDic.valueForCodeAndKey(item[forParent],item[fieldName]);
			});
		});

		//渲染文字颜色
		$(".gridPanle #dg th").each(function(){
			var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;

			$.each(data.rows,function(i,item){
				if(typeof(fontColor[item[fieldName]]) == "undefined"||typeof(item[fieldName])=="undefined"){
					return true;
				}
				item[fieldName]="<font style='color: "+fontColor[item[fieldName]]+"'>"+item[fieldName]+"</font>";
			});
		});

		//渲染列表内容的按钮
		var reHtml = "";
		$(".grid-bodyCenter .funBar button[atTblTr='1']").each(function(){
			reHtml+=$(this).prop("outerHTML");
		});
		$(".grid-bodyCenter .funBar button[atTblTr='2']").each(function(){
			reHtml+=$(this).prop("outerHTML");
		});

		for (var i=0,size=data.rows.length;i<size;i++) {
			data.rows[i].gridList_btns= reHtml;
		}
	};

	console.log("表格的功能级权限对象:",funBtns);

	var gridUtils={
		/**
		 *
		 * @returns
         */
		getSelectRows:function(){
			var selRow = dataGrid.datagrid("getChecked");
			if(selRow.length==0){
				var onSel = dataGrid.datagrid("getSelections");
				if(onSel.length==0){
					msg.hideAll();
					msg.alertErr("请先选择一行数据，才能进行操作!");
					return;
				}
				selRow=onSel;
			}

			if(selRow.length==0){
				return null;
			}
			else{
				return selRow;
			}
		},
		msg:msg,
		mainDialog:webPro.mainDialog,
		refreshGridData:function(){
			new $$().refreshGridData();
		},
		eventHandler:{
			eventList:new Array(),
			/**
			 * 增加监听事件源
			 * @param actionName
			 * @param func
			 */
			addEventListener:function(eventName,func){
				var evetnObj = new Object();
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
	}

	var $$=function(){}

	$$.refreshGrid=function(){

		new $$().refreshGridData();
	}

	$$.prototype = {
		/**
		 * 刷新表格数据
		 */
		refreshGridData:function(){
			console.group("刷新表格函数模块");

			//封装查询条件及翻页数据
			var queryObj = $(".grid-searchBar form").serializeJson();
			queryObj.pageNumber= $('.gridPanle .pagination-num').val();
			queryObj.pageSize=$('.gridPanle .pagination-page-list').val();
			queryObj.userID= webPro.setting.userID;

			//console.info("刷新表格:"+dataUrl,queryObj);
			$.post(dataUrl,queryObj,function(data){
				console.info("刷新表格:"+dataUrl,queryObj,data);
				renderData(data);
				dataGrid.datagrid('loadData',data);
			},"json");
			console.groupEnd();

			return this;
		},
		/**
		 * 绑定自定义事件
		 * @param backFun
         * @returns {$$}
         */
		bindBtnFun:function(btnTxt,backFun){
			/**
			 * 绑定按钮事件
			 */
			$(document).on("click",".button:contains('"+btnTxt+"')",function(){
				var goUrl = webPro.setting.basePath+funBtns.arrForAttrVal("name",btnTxt)[0].actionUrl;
				goUrl=goUrl.addUrlParam("keyId",gridUtils.getSelectRows()[0][dataKeyID]);

				backFun(goUrl,gridUtils);
			});

			return this;
		},
		/**
		 * 绑定自定义事件
		 * @param backFun
		 * @returns {$$}
		 */
		bindTrBtnFun:function(btnClass,backFun){
			/**
			 * 按钮审核事件
			 */
			$(document).on("click",".tr-btn"+btnClass,function(){
				backFun(gridUtils);
			});

			return this;
		},

		addGridRowClick:function(backFun){
			gridUtils.eventHandler.addEventListener("selectRowClick",function(){
				backFun(gridUtils.getSelectRows()[0]);
			});

			return this;
		}
	};


	var init=function(){
		//构造字典选择器
		$("select[forDic]").each(function(){
			webPro.mainDic.builderSelect($(this));
		})
		
		$("select[forParent]").each(function(){
			var pSel = $($(this).attr("forParent"));
			if(pSel.length==0){
				console.warn("联动关联select 没有绑定到父级对象:",$(this).attr("forParent"));
			}
			webPro.mainDic.builderChildSelect(pSel,$(this));
		});

		//绑定页面查询按钮
		$(".grid-searchBar .button:contains('查询')").click(function(){
			new $$().refreshGridData();
		});

		/**
		 * 绑定弹出窗口事件
		 * @param {Object} modeType
		 * @param {Object} funRule
		 * @param {Object} 主键名 
		 */
		var bindDialogMode=function(modeType,funRule,keyName){
			var urlParam=new Object();
			
			switch (modeType){
				case "add":
					urlParam.modeType=modeType;
					break;
				case "edit":
				case "view":
					var selRow = gridUtils.getSelectRows();
					if(selRow==null)return ;

					urlParam.modeType=modeType;
					urlParam.keyId=selRow[0][keyName];
					break;
				default:
					break;
			}
			
			var goUrl =webPro.setting.basePath+funRule.actionUrl+"?"+$.param(urlParam);
			
			console.info("弹窗URL:",goUrl);
			
			//TODO 需要指定页面标题
			webPro.mainDialog.showDialogDiv(goUrl,funRule.name);
		}
		
		/**
		 * 按钮增加事件 
		 */
		$(document).on("click",".button:contains('增加')",function(){
			console.info("增加");
			
			bindDialogMode("add",funBtns.arrForAttrVal("name","增加")[0],dataKeyID);
		});
		
		/**
		 * 按钮增加事件 
		 */
		$(document).on("click",".button:contains('修改')",function(){
			console.info("修改");
			
			bindDialogMode("edit",funBtns.arrForAttrVal("name","修改")[0],dataKeyID);
		});

		/**
		 * 按钮查看事件 
		 */
		$(document).on("click",".button:contains('查看')",function(){
			console.info("查看");
			
			bindDialogMode("view",funBtns.arrForAttrVal("name","查看")[0],dataKeyID);
		});
		
		/**
		 * 按钮增加事件 
		 */
		$(document).on("click",".button:contains('删除')",function(){
//			console.info("删除");
			var selRow = dataGrid.datagrid("getChecked");
			if(selRow.length==0){
				var onSel = dataGrid.datagrid("getSelections");
				if(onSel.length==0){
					msg.hideAll();
					msg.alertErr("请先选择一行数据，才能进行操作!");
					return;
				}
				selRow=onSel;
			}
			
			msg.confirmInfo("确定删除选中的记录？",function(){
				var goUrl = webPro.setting.basePath+funBtns.arrForAttrVal("name","删除")[0].actionUrl;
				
				var requestObj=new Object();
				requestObj["in"+dataKeyID]=selRow.byPropArr(dataKeyID).join(",");
				
				console.dir(goUrl,requestObj);
				
				$.post(goUrl,requestObj,function(data){
					if(data.status==200){
						msg.hideAll();
						msg.alertInfo(data.msg);
						
						new $$().refreshGridData();
					}
				},"json");
				
			});

		});
		
		dataGrid.datagrid({
			checkOnSelect: false,
			selectOnCheck: false,
			singleSelect:true,
			pagination:true,
			rownumbers:true,
			fitColumns:true,
			onClickRow: function () {
				gridUtils.eventHandler.onEvent("selectRowClick");
			},
			onLoadSuccess:function(){
				/**
				 * 渲染按钮的颜色 
				 */
				$(".grid-bodyCenter .funBar button").each(function(){
					$(".datagrid-btable td[field='gridList_btns'] button:contains('"+$(this).text()+"')").css({"backgroundColor":$(this).css("backgroundColor")});
				});
			}
		});
		
		/**
		 * 分页控件事件
		 */
		dataGrid.datagrid("getPager").pagination({
			onSelectPage:function(){
				console.info("dataGrid onSelectPage");

				new $$().refreshGridData();
			},
			onChangePageSize:function(){
				console.info("dataGrid onBeforeRefresh");

				new $$().refreshGridData();
			}
		});
		
		//初始化表格数据
//		console.dir(gridInitJson.gridData);

		renderData(gridInitJson.gridData);
		
		
		dataGrid.datagrid('loadData',gridInitJson.gridData); 
		$(".panle-body").animate({opacity:1},300);
	}
	
	var reHeight=function(){
		var gridPanle=$(".panle-body .gridPanle");
		var bodyHeight=$(".panle-body").height()-$(".grid-searchBar").height()-30;
		
		$(".grid-bodyCenter").height(bodyHeight);
		gridPanle.height(bodyHeight-$(".funBar").height()-20);
		
//		console.info("bodyHeight",bodyHeight);
//		
//		console.info("top",gridPanle.position().top);
//		console.info("gridPanleHeight",bodyHeight-gridPanle.position().top-20);
	};
	
	$(window).resize(function(){
		reHeight();
	});
	
	reHeight();
	init();

	webPro.mainGridList = $$;

	console.groupEnd();
	return new $$();
});