/**
 * Created by zhouyang on 2017/5/17.
 * 地图+表格的视图
 */
define(["webpro.grid","MapControls","observer","doT","logger"],function(webproGrid,mapControls,observer,doT){
    function WebPro_dialogPage(parentWindow,jsonData){
        var webPro=parentWindow.webpro;			//用户
        var msg=webPro.mainMsg;					//消息模块
        var modeType =$.getUrlParam("modeType");			//试图  模态状态[可编辑|非编辑]

        var funBtns = webPro.frameContent.getFrameData();

        //表格视图=>表格控件
        var gridControls=webproGrid(parentWindow,jsonData);
        var dataGrid=gridControls.dataGrid;

        gridControls.ready(function () {
            $(".flow-card").fadeTo(300,1);
        });

        //加载地图控件
        var mapUtils=mapControls(jsonData.data||{},modeType);

        return {
            ///**
            // * 刷新表格数据
            // */
            //refreshGridData:function(){
            //    console.group("刷新表格函数模块");
            //
            //    //封装查询条件及翻页数据
            //    var queryObj = $(".grid-searchBar form").serializeJson();
            //    queryObj.pageNumber= $('.gridPanle .pagination-num').val();
            //    queryObj.pageSize=$('.gridPanle .pagination-page-list').val();
            //    queryObj.userID= webPro.setting.userID;
            //
            //    console.info("刷新表格:"+dataUrl,queryObj);
            //    $.post(dataUrl,queryObj,function(data){
            //
            //        renderData(data);
            //        dataGrid.datagrid('loadData',data);
            //    },"json");
            //    console.groupEnd();
            //
            //    return that;
            //},
            /**
             * 绑定自定义事件
             * @param backFun
             * @returns {$$}
             */
            bindBtnFun:function(btnTxt,backFun){
                var that=this;

                /**
                 * 按钮审核事件
                 */
                $(document).on("click",".button:contains('"+btnTxt+"')",function(){
                    var goUrl = webPro.setting.basePath+funBtns.arrForAttrVal("name",btnTxt)[0].actionUrl;

                    backFun(goUrl,that);
                });

                return this;
            },
            /**
             *
             * @param backFun
             */
            bindGridSelRow:function(backFun){
                observer.addEventListener("selectRowClick",function(){
                    backFun(dataGrid.datagrid("getSelections")[0],that);
                });
                return this;
            },
            ready:function(backFun){
                backFun(this);
                return this;
            },
            /**
             * 得到表格的选择行对象
             * @returns
             */
            getSelectRows:function(){
                return this.gridControls.getSelectRows();
            },
            msgContols:msg,
            mapControls:mapUtils,
            gridControls:gridControls
        };
    }
    return WebPro_dialogPage;
});
