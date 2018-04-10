/**
 * Created by zhouyang on 2017/3/20.
 */

/**
 * 地图视图
 * @param {Object} parentWindow
 * @param {Object} gridInitJson　初始注入的JSON对象
 */
var WebPro_dialogGridPage=(function(parentWindow,dataJson) {
    var webPro=parentWindow.webpro;
    var msg=webPro.mainMsg;                                     //消息模块
    var fontColor=webPro.setting.fontColor||new Object();

    //表格对象
    var gridUtils={
        /**
         * 初始化表格
         */
        initGrid:function(dataJson){
            //构造表格控件
            $('#dg').each(function(index){
                //初始化表格控件及属性
                var dataGrid=$(this).datagrid();
                dataGrid.addClass("dg_"+index);
                dataGrid.attr("dataUrl",webPro.setting.basePath+dataJson[index].dataUrl);
                dataGrid.attr("keyFiled",dataJson[index].keyFiled);
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

                //绑定页面查询按钮
                $(".grid-searchBar .button:contains('查询')").click(function(){
                    gridUtils.refreshGrid(dataGrid);
                });

                //分页控件事件
                dataGrid.datagrid("getPager").pagination({
                    onSelectPage:function(){
                        console.info("dataGrid onSelectPage");
                        gridUtils.refreshGrid(dataGrid);
                    },
                    onChangePageSize:function(){
                        console.info("dataGrid onBeforeRefresh");
                        gridUtils.refreshGrid(dataGrid);
                    }
                });

                //初始默认数据
                gridUtils.renderGridData(dataGrid,dataJson[index].gridData);
                dataGrid.datagrid('loadData',dataJson[index].gridData);
            })
        },
        /**
         * 数据渲染
         * @param dataGrid
         * @param data
         */
        renderGridData:function(dataGrid,data){
            //console.dir(dataGrid);
            //渲染一级分类
            dataGrid.find("th[forDic]").each(function(){
                var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
                var forCode = $(this).attr("forDic");

                $.each(data.rows,function(i,item){
                    item[fieldName+"_Code"]=item[fieldName];
                    item[fieldName]=webPro.mainDic.valueForCodeAndKey(forCode,item[fieldName]);
                });
            });

            //渲染多级分类
            dataGrid.find("th[forParent]").each(function(){
                var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
                var forParent = $(this).attr("forParent")+"_Code";

                $.each(data.rows,function(i,item){
                    item[fieldName]=+webPro.mainDic.valueForCodeAndKey(item[forParent],item[fieldName]);
                });
            });

            //渲染文字颜色
            dataGrid.find("th").each(function(){
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
        },
        /**
         * 属性表格数据
         * @param dataGrid
         */
        refreshGrid:function(dataGrid){
            console.group("刷新表格函数模块");

            var control=dataGrid.parent().parent();

            //封装查询条件及翻页数据
            var queryObj = $(".grid-searchBar form").serializeJson();
            queryObj.pageNumber= control.find(".pagination-num").val();
            queryObj.pageSize=control.find(".pagination-page-list").val();
            queryObj.userID= webPro.setting.userID;


            //数据请求地址
            console.info("刷新表格:",queryObj);
            $.post(dataGrid.attr("dataUrl"),queryObj,function(data){
                gridUtils.renderGridData(dataGrid,data);
                dataGrid.datagrid('loadData',data);
            },"json");

            console.groupEnd();
        },
        /**
         * 事件处理器
         */
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
    };

    //初始化控件样式及事件
    (function(){
        //选项卡控件
        (function(){
            $(".tab-controls .menu-items .menu-item").click(function(){
                var thisObj=$(this);
                if(thisObj.hasClass("menu-sel-item")){
                    return;
                }
                else{
                    $(".tab-controls .menu-items .menu-item").removeClass("menu-sel-item");
                    thisObj.addClass("menu-sel-item");

                    $(".tab-controls .tab-pages .tab-page").hide();
                    $(".tab-controls .tab-pages .tab-page:eq("+thisObj.index()+")").show();
                }
            });
        })();

        //构造字典选择器
        (function(){
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
        })();

        //表格控件
        gridUtils.initGrid(dataJson);

        //窗口打开窗口大小动画
        webPro.mainDialog.eventHandler.targetOneEvent(function(){
            webPro.mainDialog.changeDialogSize({
                heigth:$(".dialog-grid").height()+20+$(".bottom-bar").height()-60,
                width:$("#dg").width()+20
            });
        });

        //关闭弹出窗口
        $("#closeBtn").click(function(){
            webPro.mainDialog.closeDialogDiv();
        });
    })();

    //暴露方法
    return (function(){
        function $$(){}

        $$.prototype={
            gridUtils:gridUtils,
            msg:msg,
            /**
             * 加载方法
             * @param backFun
             * @returns {$$}
             */
            ready:function(backFun){
                backFun(this);
                return this;
            },
            /**
             * 绑定按钮点击事件
             * @param btnTxt        按钮中文内容
             * @param backFun       点击事件
             * @returns {$$}
             */
            bindBtnFun:function(btnTxt,backFun){

                $(document).on("click",".button:contains('"+btnTxt+"')",function(){
                    //var goUrl = webPro.setting.basePath+funBtns.arrForAttrVal("name",btnTxt)[0].actionUrl;

                    backFun(this);
                });

                return this;
            }
        }

        return new $$();
    })();
});