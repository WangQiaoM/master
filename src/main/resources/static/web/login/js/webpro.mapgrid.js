/**
 * 地图视图
 * @param {Object} parentWindow
 * @param {Object} gridInitJson　初始注入的JSON对象
 */
var WebPro_mapgridPage=(function(parentWindow,gridInitJson){
    console.group("WebPro_mapgridPage");
    var webPro=parentWindow.webpro;
    var msg=webPro.mainMsg;
    var dataGrid=$('#dg').datagrid();               //easyUI 表格对象
    var mapControl=new BMap.Map("panle-body");      //百度地图对象
    var dataKeyID = $("#dg").attr("keyId");
    var dataUrl =  webPro.setting.basePath+ gridInitJson.dataUrl;
    var fontColor=webPro.setting.fontColor||{};

    var EventHandler={
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
    };

    console.group(dataUrl);
    /**
     * 渲染列表内容数据
     * @param {Object} data
     */
    var renderData=function(data){
        console.dir(data);
        //渲染一级分类
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

        for (var i=0,size=data.rows.length;i<size;i++) {
            data.rows[i].gridList_btns= reHtml;
        }
    };

    var that;
    var $$=function(){};
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

            console.info("刷新表格:"+dataUrl,queryObj);
            $.post(dataUrl,queryObj,function(data){

                renderData(data);
                dataGrid.datagrid('loadData',data);
            },"json");
            console.groupEnd();

            return that;
        },
        /**
         * 绑定自定义事件
         * @param backFun
         * @returns {$$}
         */
        bindBtnFun:function(btnTxt,backFun){
            /**
             * 按钮审核事件
             */
            $(document).on("click",".button:contains('"+btnTxt+"')",function(){
                var goUrl = webPro.setting.basePath+funBtns.arrForAttrVal("name",btnTxt)[0].actionUrl;

                backFun(goUrl,that);
            });

            return that;
        },
        /**
         *
         * @param backFun
         */
        bindGridSelRow:function(backFun){
            EventHandler.addEventListener("selectRowClick",function(){
                backFun(dataGrid.datagrid("getSelections")[0],that);
            });
            return that;
        },
        ready:function(backFun){
            backFun(that);
            return that;
        },
        /**
         * 得到表格的选择行对象
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
        /**
         * 地图控件
         */
        mapContorller:{

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
        }

    };
    that=new $$();

    //渲染功能按钮
    var funBtns = webPro.frameContent.getFrameData();

    var reHeight=function(){
        var gridPanle=$(".grid-bodyCenter .gridPanle");
        var bodyHeight=$(".flow-grid").height()-$(".grid-searchBar").height()-30;

        $(".grid-bodyCenter").height(bodyHeight);
        gridPanle.height(bodyHeight-$(".funBar").height()-20);
    };

    var init=function(){

        $(".flow-card:first .flow-title span").text( webPro.frameContent.getFrameTitle()+"列表");

        //加载按钮菜单
        $(".grid-bodyCenter .funBar").append(doT.template($("#funBtnsTmpl").text())(funBtns));

        //地图加载事件
        (function(){
            mapControl.centerAndZoom(new BMap.Point(106.534, 29.535), 13);  	// 初始化地图,设置中心点坐标和地图级别
            mapControl.addControl(new BMap.MapTypeControl());   				// 添加地图类型控件
            mapControl.setCurrentCity("重庆");          						// 设置地图显示的城市 此项是必须设置的
            mapControl.enableScrollWheelZoom(true);     						// 开启鼠标滚轮缩放
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

        //表格事件.数据加载
        (function(){
            dataGrid.datagrid({
                checkOnSelect: false,
                selectOnCheck: false,
                singleSelect:true,
                pagination:true,
                rownumbers:true,
                fitColumns:true,
                onClickRow: function () {
                    EventHandler.onEvent("selectRowClick");
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
             * 绑定弹出窗口事件
             * @param {Object} modeType
             * @param {Object} funRule
             * @param {Object} 主键名
             */
            var bindDialogMode=function(modeType,funRule,keyName){
                var urlParam={};

                switch (modeType){
                    case "add":
                        urlParam.modeType=modeType;
                        break;
                    case "edit":
                    case "view":
                        var selRow = that.getSelectRows();
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
            };

            /**
             * 按钮增加事件
             */
            $(document).on("click",".button:contains('增加')",function(){
//			console.info("增加");

                bindDialogMode("add",funBtns.arrForAttrVal("name","增加")[0],dataKeyID);
            });

            /**
             * 按钮增加事件
             */
            $(document).on("click",".button:contains('修改')",function(){
//			console.info("修改");

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

                    var requestObj={};
                    requestObj["in"+dataKeyID]=selRow.byPropArr(dataKeyID).join(",");

                    console.dir(goUrl,requestObj);

                    $.post(goUrl,requestObj,function(data){
                        if(data.status==200){
                            msg.hideAll();
                            msg.alertInfo(data.msg);

                            that.refreshGridData();
                        }
                    },"json");
                });
            });


            //构造字典选择器
            $("select[forDic]").each(function(){
                webPro.mainDic.builderSelect($(this));
            });

            $("select[forParent]").each(function(){
                var pSel = $($(this).attr("forParent"));
                if(pSel.length==0){
                    console.warn("联动关联select 没有绑定到父级对象:",$(this).attr("forParent"));
                }
                webPro.mainDic.builderChildSelect(pSel,$(this));
            });

            //绑定页面查询按钮
            $(".grid-searchBar .button:contains('查询')").click(function(){
                that.refreshGridData();
            });

            /**
             * 分页控件事件
             */
            dataGrid.datagrid("getPager").pagination({
                onSelectPage:function(){
                    console.info("dataGrid onSelectPage");

                    that.refreshGridData();
                },
                onChangePageSize:function(){
                    console.info("dataGrid onBeforeRefresh");

                    that.refreshGridData();
                }
            });

            //初始默认数据
            renderData(gridInitJson.gridData);
            dataGrid.datagrid('loadData',gridInitJson.gridData);
        })();

        $(window).resize(function(){
            reHeight();
        });
        $(".panle-body").animate({opacity:1},300);
    };

    reHeight();

    init();
    console.groupEnd();

    return that;
});