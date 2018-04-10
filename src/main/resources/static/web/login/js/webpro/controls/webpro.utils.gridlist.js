///**
// * 表格对象
// */
//var gridUtils={
//    /**
//     * 初始化表格
//     */
//    initGrid:function(dataJson){
//        //构造表格控件
//        $('#dg').each(function(index){
//            //初始化表格控件及属性
//            var dataGrid=$(this).datagrid();
//            dataGrid.addClass("dg_"+index);
//            dataGrid.attr("dataUrl",webPro.setting.basePath+dataJson[index].dataUrl);
//            dataGrid.attr("keyFiled",dataJson[index].keyFiled);
//            dataGrid.datagrid({
//                checkOnSelect: false,
//                selectOnCheck: false,
//                singleSelect:true,
//                pagination:true,
//                rownumbers:true,
//                fitColumns:true,
//                onClickRow: function () {
//                    gridUtils.eventHandler.onEvent("selectRowClick");
//                },
//                onLoadSuccess:function(){
//                    /**
//                     * 渲染按钮的颜色
//                     */
//                    $(".grid-bodyCenter .funBar button").each(function(){
//                        $(".datagrid-btable td[field='gridList_btns'] button:contains('"+$(this).text()+"')").css({"backgroundColor":$(this).css("backgroundColor")});
//                    });
//                }
//            });
//
//            //绑定页面查询按钮
//            $(".grid-searchBar .button:contains('查询')").click(function(){
//                gridUtils.refreshGrid(dataGrid);
//            });
//
//            //分页控件事件
//            dataGrid.datagrid("getPager").pagination({
//                onSelectPage:function(){
//                    console.info("dataGrid onSelectPage");
//                    gridUtils.refreshGrid(dataGrid);
//                },
//                onChangePageSize:function(){
//                    console.info("dataGrid onBeforeRefresh");
//                    gridUtils.refreshGrid(dataGrid);
//                }
//            });
//
//            //初始默认数据
//            gridUtils.renderGridData(dataGrid,dataJson[index].gridData);
//            dataGrid.datagrid('loadData',dataJson[index].gridData);
//        })
//    },
//    /**
//     * 数据渲染
//     * @param dataGrid
//     * @param data
//     */
//    renderGridData:function(dataGrid,data){
//        //console.dir(dataGrid);
//        //渲染一级分类
//        dataGrid.find("th[forDic]").each(function(){
//            var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
//            var forCode = $(this).attr("forDic");
//
//            $.each(data.rows,function(i,item){
//                item[fieldName+"_Code"]=item[fieldName];
//                item[fieldName]=webPro.mainDic.valueForCodeAndKey(forCode,item[fieldName]);
//            });
//        });
//
//        //渲染多级分类
//        dataGrid.find("th[forParent]").each(function(){
//            var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
//            var forParent = $(this).attr("forParent")+"_Code";
//
//            $.each(data.rows,function(i,item){
//                item[fieldName]=+webPro.mainDic.valueForCodeAndKey(item[forParent],item[fieldName]);
//            });
//        });
//
//        //渲染文字颜色
//        dataGrid.find("th").each(function(){
//            var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
//
//            $.each(data.rows,function(i,item){
//                if(typeof(fontColor[item[fieldName]]) == "undefined"||typeof(item[fieldName])=="undefined"){
//                    return true;
//                }
//                item[fieldName]="<font style='color: "+fontColor[item[fieldName]]+"'>"+item[fieldName]+"</font>";
//            });
//        });
//
//        //渲染列表内容的按钮
//        var reHtml = "";
//        $(".grid-bodyCenter .funBar button[atTblTr='1']").each(function(){
//            reHtml+=$(this).prop("outerHTML");
//        });
//
//        for (var i=0,size=data.rows.length;i<size;i++) {
//            data.rows[i].gridList_btns= reHtml;
//        }
//    },
//    /**
//     * 属性表格数据
//     * @param dataGrid
//     */
//    refreshGrid:function(dataGrid){
//        console.group("刷新表格函数模块");
//
//        //封装查询条件及翻页数据
//        var queryObj = $(".grid-searchBar form").serializeJson();
//        queryObj.pageNumber= dataGrid.find(".pagination-num").val();
//        queryObj.pageSize=dataGrid.find(".pagination-page-list").val();
//        queryObj.userID= webPro.setting.userID;
//
//        //数据请求地址
//        console.info("刷新表格:",queryObj);
//        $.post(dataGrid.attr("dataUrl"),queryObj,function(data){
//            gridUtils.renderGridData(dataGrid,data);
//            dataGrid.datagrid('loadData',data);
//        },"json");
//
//        console.groupEnd();
//    },
//
//};

