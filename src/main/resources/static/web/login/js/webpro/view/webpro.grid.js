/**
 * Created by zhouyang on 2017/4/25.
 */
/**
 * 表格视图
 */
define(["webpro.view","GridControls","doT","jqueryEasyui","logger"],function(webproView,gridControls,doT){
    function WebPro_dialogPage(parentWindow,jsonData){
        var webPro=parentWindow.webpro;			//用户
        var msg=webPro.mainMsg;					//消息模块

        logger.group("列表视图");
        logger.info("注入地址数据:",window.location.href,jsonData);

        //视图初始化
        webproView(parentWindow,jsonData);

        //表格控件  TODO:单表格架构,看情况改多表格
        var gridUtils = gridControls(webPro,msg,jsonData);

        //初始化页面
        (function () {
            var funBtns = webPro.frameContent.getFrameData();
            $(".grid-bodyCenter .funBar").append(doT.template($("#funBtnsTmpl").text())(funBtns));

            $(window).resize(function(){
                var gridPanle=$(".panle-body .gridPanle");
                var bodyHeight=$(".panle-body").height()-$(".grid-searchBar").height()-30;

                $(".grid-bodyCenter").height(bodyHeight);
                gridPanle.height(bodyHeight-$(".funBar").height()-20);

                //浮动样式
                (function(){
                    if($(".flow-grid").size()!=0){
                        var gridPanle=$(".grid-bodyCenter .gridPanle");
                        var bodyHeight=$(".flow-grid").height()-$(".grid-searchBar").height()-30;

                        $(".grid-bodyCenter").height(bodyHeight);
                        gridPanle.height(bodyHeight-$(".funBar").height()-20);
                    }

                })();
            });
            $(window).resize();

            //加载表格视图事件  [增.删.改.查]
            gridUtils.ready(function () {
                //logger.dir(gridUtils);

                //按钮及事件
                (function () {
                    var funBtns = webPro.frameContent.getFrameData();
                    var dataGrid=gridUtils.dataGrid;
                    var dataKeyID = gridUtils.dataGrid.attr("keyId");
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
                                var selRow = gridUtils.getSelectRows();
                                if(selRow==null)return ;

                                urlParam.modeType=modeType;
                                urlParam.keyId=selRow[0][keyName];
                                break;
                            default:
                                break;
                        }

                        var goUrl =webPro.setting.basePath+funRule.actionUrl+"?"+$.param(urlParam);

                        //TODO 需要指定页面标题
                        webPro.mainDialog.showDialogDiv(goUrl,funRule.name);
                    };

                    /**
                     * 按钮增加事件
                     */
                    $(document).on("click",".button:contains('增加')",function() {
                        //console.info("增加");

                        bindDialogMode("add",funBtns.arrForAttrVal("name","增加")[0],dataKeyID);
                    });

                    /**
                     * 按钮增加事件
                     */
                    $(document).on("click",".button:contains('修改')",function(){
                        //console.info("修改");

                        bindDialogMode("edit",funBtns.arrForAttrVal("name","修改")[0],dataKeyID);
                    });

                    /**
                     * 按钮查看事件
                     */
                    $(document).on("click",".button:contains('查看')",function(){
                        //console.info("查看");

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

                                    gridUtils.refreshGrid();
                                }
                            },"json");

                        });

                    });

                })();
            });

            $(".panle-body").animate({opacity:1},300);
        })();

        webPro.mainGridList = gridUtils;
        return gridUtils;
    }
    return WebPro_dialogPage;
});
