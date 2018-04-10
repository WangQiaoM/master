/**
 * Created by zhouyang on 2017/4/25.
 * 表格控件
 */
define(["observer","webpro.config","doT","logger"],function(observer,webproConfig,doT){

    /**
     * 表格控件
     * @param webPro
     * @param msg
     * @param dataJson
     * @returns {*}
     * @constructor
     */
    function GridControls(webPro,msg,dataJson){
        var webDic = webPro.mainDic;            //用户字典对象
        var userId=webPro.setting.userID;       //用户ID

        if (!(dataJson instanceof Array)){
            dataJson=[dataJson];
        }

        /**
         * 数据渲染
         * @param dataGrid
         * @param data
         */
        var renderData=function (dataGrid,data){
            //渲染一级分类
            dataGrid.find("th[forDic]").each(function(){
                var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
                var forCode = $(this).attr("forDic");

                $.each(data.rows,function(i,item){
                    item[fieldName+"_Code"]=item[fieldName];
                    item[fieldName]=webDic.valueForCodeAndKey(forCode,item[fieldName]);
                });
            });

            //渲染多级分类
            dataGrid.find("th[forParent]").each(function(){
                var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;
                var forParent = $(this).attr("forParent")+"_Code";

                $.each(data.rows,function(i,item){
                    item[fieldName]=+webDic.valueForCodeAndKey(item[forParent],item[fieldName]);
                });
            });

            //渲染文字颜色
            dataGrid.find("th").each(function(){
                var fieldName =dataGrid.datagrid("options").columns[0][$(this).index()].field;

                $.each(data.rows,function(i,item){
                    if(typeof(webproConfig.fontColor[item[fieldName]]) == "undefined"||typeof(item[fieldName])=="undefined"){
                        return true;
                    }
                    item[fieldName]="<font style='color: "+webproConfig.fontColor[item[fieldName]]+"'>"+item[fieldName]+"</font>";
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

        /**
         * 表格操作对象
         * @type {{refreshGrid: gridUtils.refreshGrid, getSelectRows: gridUtils.getSelectRows}}
         */
        var gridUtils={
            dataGrid:null,
            /**
             * 属性表格数据
             * @param dataGrid
             */
            refreshGrid:function(){
                //封装查询条件及翻页数据
                var queryObj = $(".grid-searchBar form").serializeJson();
                queryObj.pageNumber= this.dataGrid.parent().parent().find(".pagination-num").val();
                queryObj.pageSize=this.dataGrid.parent().parent().find(".pagination-page-list").val();
                queryObj.userID= userId;

                //数据请求地址
                console.info("刷新表格:",queryObj);

                var thatGrid=this.dataGrid;
                $.post(this.dataGrid.attr("dataUrl"),queryObj,function(data){
                    renderData(thatGrid,data);

                    thatGrid.datagrid('loadData',data);
                },"json");

                return this;
            },

            /**
             * 得到选择选择
             * @returns
             */
            getSelectRows:function(){

                this.dataGrid=this.dataGrid||$('#dg').datagrid();

                var selRow = this.dataGrid.datagrid("getChecked");

                if(selRow.length==0){
                    var onSel = this.dataGrid.datagrid("getSelections");
                    if(onSel.length==0){
                        msg.hideAll();
                        msg.alertErr("请先选择一行数据，才能进行操作!");
                        return null;
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

            /**
             * 根据按钮文本  绑定自定义事件
             * @param backFun
             * @returns {$$}
             */
            addEventBtnForTxt:function(btnTxt,func){
                /**
                 * 绑定按钮事件
                 */
                $(document).on("click",".button:contains('"+btnTxt+"')",function(){
                    var goUrl = webPro.setting.basePath+funBtns.arrForAttrVal("name",btnTxt)[0].actionUrl;
                    goUrl=goUrl.addUrlParam("keyId",gridUtils.getSelectRows()[0][dataKeyID]);

                    func(goUrl,this);
                });

                return this;
            },

            /**
             * 表格行点击事件  监听
             * @param func
             * @returns {gridUtils}
             */
            addEventRowClick: function (func) {

                observer.addEventListener("selectRowClick",function(){
                    func(this.getSelectRows()[0]);
                });

                return this;
            },

            /**
             * 表格行内 按钮事件
             * @param func
             */
            addEventRowBtnClick: function (func) {


                return this;
            },

            /**
             * 方法执行
             * @param backFun   回调函数
             */
            ready:function(backFun){
                backFun(this);
                return this;
            }
        };

        //构造表格控件
        gridUtils.ready(function () {
            $('#dg').each(function(index){
                //初始化表格控件及属性
                var dataGrid=$(this).datagrid();
                dataGrid.datagrid({
                    checkOnSelect: false,
                    selectOnCheck: false,
                    singleSelect:true,
                    pagination:true,
                    rownumbers:true,
                    fitColumns:true,
                    onClickRow: function () {
                        observer.onEvent("selectRowClick");
                    },
                    onLoadSuccess:function(){
                        /**
                         * 渲染按钮的颜色
                         */
                        $(".grid-bodyCenter .funBar button").each(function(){
                            $(".datagrid-btable td[field='gridList_btns'] button:contains('"+$(this).text()+"')").css({"backgroundColor":$(this).css("backgroundColor")});
                        });
                    }
                }).datagrid("getPager").pagination({    //分页控件事件
                    onSelectPage:function(){
                        gridUtils.refreshGrid();
                    },
                    onChangePageSize:function(){
                        gridUtils.refreshGrid();
                    }
                });
                gridUtils.dataGrid=dataGrid;
                dataGrid.addClass("dg_"+index);
                dataGrid.attr("dataUrl",webproConfig.basePath+dataJson[index].dataUrl);
                dataGrid.attr("keyFiled",dataJson[index].keyFiled);


                //绑定页面查询按钮
                $(".grid-searchBar .button:contains('查询')").click(function(){
                    gridUtils.refreshGrid();
                });

                //初始默认数据
                renderData(dataGrid,dataJson[index].gridData);
                dataGrid.datagrid('loadData',dataJson[index].gridData);
            });
        });

        return gridUtils;
    }

    return GridControls;
});


